import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    caption: 'No fake humility. No "save it all."\nWhats your real answer? 👇🔥',
    tags: '#CatsOfParaiso #Crypto #USDT #Web3 #TradingCommunity',
    url: 'https://www.facebook.com/photo/?fbid=122099348264581400&set=a.122098764320581400&__cft__[0]=AZb9OXQWll-G4nQHDdvr6j4vKNZag9SvV7p2pJCNznJCMO0our4TcsMAvnpLneOSbLZOz78GVzT-AOGsAij4cXRdpjSo7VQtgOaiGXrk76PMhw8J5PwNUy69k6yV47RnEUwKhuQadrb-GyWh4v77sAx4tUHtKfjIIU0n0pX3Itr1tcEDfh4VVztyoxVe0N69A_nYS_d74QdjnMIdfR15kJZp&__tn__=EH-R',
  },
  {
    id: 2,
    caption: 'Same as Respect begets Respect.\nSay whut?',
    tags: '',
    url: 'https://www.facebook.com/photo/?fbid=122099338898581400&set=a.122098764320581400&__cft__[0]=AZahRT2CdR9SZ1LSuof_hlbYnTkwjYLto8JSJP_zaQmmnEA9BZmjHzfDGZUdS5bimFj-Dvdc5AZEmO7P875ckoqnF41Ek4DiUqHWHnw6BOYBKVQ43fZaMrxHxDVSwO6xadD2K0LFuBCU9yjHrI9WxQ41rLPkdK0wu64e0J6woom_gJaGp4KmjgHVg73KlmbyTZZuXaRLHhA0An-WyJTlUnTz&__tn__=EH-R',
  },
  {
    id: 3,
    caption: '📈 LAST 10 YEARS PERFORMANCE CHECK.\nWhile most people were doubting Bitcoin…\nit quietly outperformed almost every major asset on the planet. 👀\n\n₿ Bitcoin: +17,420%\n🚗 Tesla: +3,122%\n🍎 Apple: +1,355%\n🔍 Google: +1,015%\n📦 Amazon: +654%\n📊 S&P500: +323%\n🪙 Gold: +255%\n\nThe lesson?\nSometimes the future looks ridiculous before it becomes inevitable.\nThis is why learning matters.\nThis is why conviction matters.\nThis is why early believers always look crazy first.\n\n🐾 Cats of Paraiso\nBuilding a purr-fect future powered by community.\n#Bitcoin #Crypto #Web3 #BTC #Investing #CatsOfParaiso #Blockchain #DigitalAssets\n⚠️ For educational purposes only. ⚠️\nNot financial advice. DYOR.\nCrypto is risky — invest responsibly.\n🐾 In Code We Trust. See less',
    tags: '',
    url: 'https://www.facebook.com/photo/?fbid=122099303498581400&set=a.122098877462581400&__cft__[0]=AZbsfcoMo38IxYvgcpqCZ-Z8_FH5dm19AOnBoVCv-jzNobSZb5ZEr1o2uFgYn3XevmwgUH6kVjPNG4rq6kIzdtAA-cJh30nviyfLtQunBbcePd_UTEPpj0Vy_TJkpUCPUxcikbkOefpMnNZsMImmgGM-ZoFInw14k6xsjLJw4rrpr7_Bp7wGCgABFAwJ0SKz6E0hQ5Y0n1mEWmN8QorapqnT&__tn__=EH-R',
  },
];

function PostCard({
  caption,
  tags,
  url,
  index,
}: {
  caption: string;
  tags: string;
  url: string;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

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
            <img
              src="/assets/cats_logo.jpg"
              alt="Cats of Paraiso"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p
              className="text-sm font-semibold text-white truncate"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Cats of Paraiso
            </p>
            <p
              className="text-xs text-white/40 font-light tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Web3 community · 61.5K followers
            </p>
          </div>
        </div>

        {/* Follow — Hero secondary-button style */}
        <button
          className="group/btn flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/18 backdrop-blur-xl border border-white/20 hover:border-white/35 text-white text-xs font-medium tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Follow
        </button>
      </div>

      {/* Caption body — Inter font-light leading-relaxed tracking-wide, like Hero subheading */}
      <div
        className="text-sm md:text-base font-light leading-relaxed tracking-wide text-white/60 whitespace-pre-wrap space-y-3"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p>{caption}</p>
        {tags ? (
          <p className="text-white/35 text-xs tracking-wide">{tags}</p>
        ) : null}
      </div>

      {/* Card footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
        {/* View on Facebook — Hero primary-button style */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="group/link flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          View on Facebook
          <ArrowRight
            size={13}
            className="group-hover/link:translate-x-0.5 transition-transform duration-200"
          />
        </a>

        <span
          className="text-xs text-white/30 font-light"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          1.2K likes · 183 comments
        </span>
      </div>
    </motion.article>
  );
}

export default function SocialFeed() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

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
          {/* Label — matches CommunityCapabilities "// Ecosystem" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white/35 text-xs tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            // Social Feed
          </motion.div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* Heading — matches Hero h1 scale & font */}
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

            {/* CTA — Hero secondary-button style */}
            <motion.a
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              href="https://www.facebook.com/profile.php?id=61567442002845"
              target="_blank"
              rel="noreferrer"
              className="group flex-shrink-0 self-start sm:self-auto flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/18 backdrop-blur-xl border border-white/20 hover:border-white/35 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              See more on Facebook
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </motion.a>
          </div>

          {/* Subheading — mirrors Hero subheading */}
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

        {/* Post cards */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {POSTS.map((post, i) => (
            <PostCard
              key={post.id}
              caption={post.caption}
              tags={post.tags}
              url={post.url}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
