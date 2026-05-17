import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Card {
  tags: string[];
  title: string;
  body: string;
  accent: string;
}

const CARDS: Card[] = [
  {
    tags: ['Cat Rescue', 'Community Care', 'Local Impact', 'Awareness'],
    title: 'Cat Rescue',
    body: 'Community-powered initiatives focused on helping stray cats through rescue support, feeding programs, and awareness campaigns across the Philippines.',
    accent: 'from-pink-400/20 to-transparent',
  },
  {
    tags: ['Trading Basics', 'Web3 Learning', 'Market Insights', 'Beginner Friendly'],
    title: 'Crypto Education',
    body: 'Accessible crypto and trading education designed to help Filipinos understand Web3, digital assets, and modern online opportunities.',
    accent: 'from-rose-400/20 to-transparent',
  },
  {
    tags: ['Coming Soon', 'Digital Collectibles', 'Interactive App', 'Web3 Utility'],
    title: 'Web App Launch',
    body: 'Our upcoming platform will introduce interactive cat-inspired digital experiences, community features, and future ecosystem utilities.',
    accent: 'from-fuchsia-400/20 to-transparent',
  },
];

function CapabilityCard({ card, index }: { card: Card; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-3xl overflow-hidden border border-white/12 bg-white/6 backdrop-blur-2xl hover:border-white/25 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Top gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${card.accent} opacity-60 pointer-events-none`} />

      <div className="relative z-10 p-7 flex flex-col h-full gap-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-white/50 border border-white/15 rounded-full px-2.5 py-0.5 tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Title */}
        <h3
          className="text-white text-2xl font-normal leading-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {card.title}
        </h3>

        {/* Body */}
        <p
          className="text-white/50 text-sm font-light leading-relaxed tracking-wide flex-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {card.body}
        </p>

        {/* Bottom arrow indicator */}
        <div className="flex items-center gap-2 mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-px flex-1 bg-white/20" />
          <span className="text-white/40 text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            Explore
          </span>
          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 6.5L6.5 1.5M6.5 1.5H2.5M6.5 1.5V5.5" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CommunityCapabilities() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Top fade in from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px',
        }}
      />

      <div className="relative z-20 flex flex-col justify-center flex-1 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-28">

        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white/35 text-xs tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            // Ecosystem
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] max-w-lg"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Community
            <br />
            <em className="italic">reimagined</em>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CARDS.map((card, i) => (
            <CapabilityCard key={card.title} card={card} index={i} />
          ))}
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
