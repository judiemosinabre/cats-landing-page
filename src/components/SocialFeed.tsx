import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, RefreshCw } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface Post {
  id: string | number;
  caption: string;
  tags?: string;
  url: string;
  likes?: number;
  comments?: number;
}

// ── Fallback static posts (shown while loading or if API not configured) ─────

const FALLBACK_POSTS: Post[] = [
  {
    id: 1,
    caption: 'No fake humility. No "save it all."\nWhats your real answer? 👇🔥',
    tags: '#CatsOfParaiso #Crypto #USDT #Web3 #TradingCommunity',
    url: 'https://www.facebook.com/profile.php?id=61567442002845',
    likes: 1200,
    comments: 183,
  },
  {
    id: 2,
    caption: 'Same as Respect begets Respect.\nSay whut?',
    tags: '',
    url: 'https://www.facebook.com/profile.php?id=61567442002845',
    likes: 980,
    comments: 74,
  },
  {
    id: 3,
    caption: '📈 LAST 10 YEARS PERFORMANCE CHECK.\nWhile most people were doubting Bitcoin…\nit quietly outperformed almost every major asset on the planet. 👀\n\n₿ Bitcoin: +17,420%\n🚗 Tesla: +3,122%\n🍎 Apple: +1,355%\n🔍 Google: +1,015%\n📦 Amazon: +654%\n📊 S&P500: +323%\n🪙 Gold: +255%\n\nThe lesson?\nSometimes the future looks ridiculous before it becomes inevitable.\nThis is why learning matters.\nThis is why conviction matters.\nThis is why early believers always look crazy first.\n\n🐾 Cats of Paraiso — Building a purr-fect future powered by community.\n⚠️ For educational purposes only. Not financial advice. DYOR.',
    tags: '#Bitcoin #Crypto #Web3 #BTC #Investing #CatsOfParaiso #Blockchain',
    url: 'https://www.facebook.com/profile.php?id=61567442002845',
    likes: 2100,
    comments: 312,
  },
];

// ── Skeleton card shown while loading ────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-white/8 bg-white/4 p-5 sm:p-6 w-full animate-pulse">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-11 w-11 rounded-full bg-white/10 flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-3 w-32 bg-white/10 rounded-full" />
          <div className="h-2.5 w-24 bg-white/8 rounded-full" />
        </div>
        <div className="h-7 w-16 bg-white/8 rounded-full" />
      </div>
      <div className="space-y-2.5">
        <div className="h-3 w-full bg-white/8 rounded-full" />
        <div className="h-3 w-5/6 bg-white/8 rounded-full" />
        <div className="h-3 w-4/6 bg-white/8 rounded-full" />
      </div>
      <div className="mt-6 pt-4 border-t border-white/8 flex justify-between">
        <div className="h-8 w-36 bg-white/10 rounded-full" />
        <div className="h-3 w-24 bg-white/8 rounded-full self-center" />
      </div>
    </div>
  );
}

// ── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: Post; index: number }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const likesLabel    = post.likes    != null ? `${post.likes.toLocaleString()} likes` : null;
  const commentsLabel = post.comments != null ? `${post.comments.toLocaleString()} comments` : null;
  const meta          = [likesLabel, commentsLabel].filter(Boolean).join(' · ');

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group rounded-3xl border border-white/12 bg-white/6 backdrop-blur-2xl p-5 sm:p-6 w-full hover:border-white/25 hover:bg-white/10 transition-all duration-500 hover:-translate-y-0.5"
    >
      {/* Card header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden border border-white/15 flex-shrink-0">
            <img src="/assets/cats_logo.jpg" alt="Cats of Paraiso" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
              Cats of Paraiso
            </p>
            <p className="text-xs text-white/40 font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              Web3 community · 61.5K followers
            </p>
          </div>
        </div>

        <button
          className="group/btn flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/18 backdrop-blur-xl border border-white/20 hover:border-white/35 text-white text-xs font-medium tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Follow
        </button>
      </div>

      {/* Caption */}
      <div
        className="text-sm md:text-base font-light leading-relaxed tracking-wide text-white/60 whitespace-pre-wrap space-y-3"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p>{post.caption}</p>
        {post.tags ? <p className="text-white/35 text-xs tracking-wide">{post.tags}</p> : null}
      </div>

      {/* Card footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="group/link flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          View on Facebook
          <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
        </a>

        {meta && (
          <span className="text-xs text-white/30 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
            {meta}
          </span>
        )}
      </div>
    </motion.article>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function SocialFeed() {
  const headingRef    = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  const [posts,   setPosts]   = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [isLive,  setIsLive]  = useState(false);

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch('/api/fb-posts');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as { posts?: Post[]; error?: string };
      if (data.error) throw new Error(data.error);
      if (data.posts && data.posts.length > 0) {
        setPosts(data.posts);
        setIsLive(true);
      } else {
        // API returned empty — fall back
        setPosts(FALLBACK_POSTS);
      }
    } catch {
      // API not configured yet or failed — silently fall back to static posts
      setPosts(FALLBACK_POSTS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPosts(); }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px',
        }}
      />

      <div className="relative z-20 flex flex-col justify-center flex-1 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-28">

        {/* Section header */}
        <div ref={headingRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 mb-5"
          >
            <span
              className="text-white/35 text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              // Social Feed
            </span>
            {/* Live indicator */}
            {isLive && (
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400/70 tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            )}
          </motion.div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.05] text-white max-w-md"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Web3
              <em className="italic"> News</em>
            </motion.h2>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              {/* Refresh button — only shows when live */}
              {isLive && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={loadPosts}
                  disabled={loading}
                  title="Refresh posts"
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-white/8 text-white/50 hover:text-white hover:bg-white/15 transition-all duration-200 disabled:opacity-40"
                >
                  <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                </motion.button>
              )}

              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                href="https://www.facebook.com/profile.php?id=61567442002845"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/18 backdrop-blur-xl border border-white/20 hover:border-white/35 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                See more on Facebook
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.a>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Latest from our community — crypto insights, market updates, and Web3
            education straight from the Cats of Paraiso Facebook page.
          </motion.p>
        </div>

        {/* Post cards / skeletons */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {loading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
            : posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)
          }
        </div>

        {/* Error notice (only if completely no posts) */}
        {error && posts.length === 0 && (
          <p className="mt-8 text-center text-white/30 text-sm font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
            {error}
          </p>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
