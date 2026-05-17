import type { IncomingMessage, ServerResponse } from 'http';

type VercelRequest  = IncomingMessage & { method?: string };
type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json:   (body: unknown) => VercelResponse;
  setHeader: (name: string, value: string) => VercelResponse;
};

// ---------------------------------------------------------------------------
// GET /api/fb-posts
//
// Proxies Facebook Graph API so the Page Access Token stays server-side.
// Required environment variables (set in Vercel → Project Settings → Env):
//   FB_PAGE_ACCESS_TOKEN  – long-lived Page Access Token
//   FB_PAGE_ID            – numeric Facebook Page ID (e.g. 61567442002845)
// ---------------------------------------------------------------------------

const GRAPH = 'https://graph.facebook.com/v19.0';
const FIELDS = 'message,created_time,permalink_url,reactions.summary(true),comments.summary(true)';
const LIMIT  = '6';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token  = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!token || !pageId) {
    return res.status(500).json({
      error: 'Missing FB_PAGE_ACCESS_TOKEN or FB_PAGE_ID environment variables.',
    });
  }

  const url = `${GRAPH}/${pageId}/posts?fields=${encodeURIComponent(FIELDS)}&limit=${LIMIT}&access_token=${token}`;

  try {
    const fbRes  = await fetch(url);
    const fbData = await fbRes.json() as {
      data?: {
        id: string;
        message?: string;
        created_time: string;
        permalink_url: string;
        reactions?: { summary: { total_count: number } };
        comments?:  { summary: { total_count: number } };
      }[];
      error?: { message: string };
    };

    if (fbData.error) {
      console.error('[fb-posts] Graph API error:', fbData.error.message);
      return res.status(502).json({ error: fbData.error.message });
    }

    // Shape the response for the frontend
    const posts = (fbData.data ?? [])
      .filter((p) => p.message)          // skip posts with no text
      .map((p) => ({
        id:          p.id,
        caption:     p.message ?? '',
        url:         p.permalink_url,
        createdTime: p.created_time,
        likes:       p.reactions?.summary.total_count ?? 0,
        comments:    p.comments?.summary.total_count  ?? 0,
      }));

    // Cache for 5 minutes on CDN edge so we don't hammer the Graph API
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).json({ posts });
  } catch (err) {
    console.error('[fb-posts] fetch failed:', err);
    return res.status(502).json({ error: 'Failed to reach Facebook Graph API.' });
  }
}
