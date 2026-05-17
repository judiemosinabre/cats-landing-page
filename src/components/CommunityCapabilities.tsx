import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Card {
  tags: string[];
  title: string;
  body: string;
}

const CARDS: Card[] = [
  {
    tags: ['Cat Rescue', 'Community Care', 'Global Impact', 'Awareness'],
    title: 'Cat Rescue',
    body: 'Community-powered initiatives focused on helping stray cats through rescue support, feeding programs, and awareness campaigns — starting from SEA and growing globally.',
  },
  {
    tags: ['Trading Basics', 'Web3 Learning', 'Market Insights', 'Beginner Friendly'],
    title: 'Crypto Education',
    body: 'Accessible crypto and trading education built for everyone — rooted in SEA, designed for a global audience ready to explore Web3 and digital assets.',
  },
  {
    tags: ['Coming Soon', 'Digital Collectibles', 'Interactive App', 'Web3 Utility'],
    title: 'Web App Launch',
    body: 'Our upcoming platform will introduce interactive cat-inspired digital experiences, community features, and future ecosystem utilities.',
  },
];

const ASCII_BG: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Ctext x='1' y='10' font-family='monospace' font-size='7' fill='%23ffffff' opacity='0.05'%3E5%3C/text%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};

function CapabilityCard({ card, index }: { card: Card; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-xl overflow-hidden border border-white/8 bg-[#0c0c0c] hover:border-[#FF9FF2]/35 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Top accent line — fuchsia on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF9FF2]/0 group-hover:bg-[#FF9FF2]/70 transition-all duration-500" />

      {/* Subtle fuchsia glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#FF9FF2]/0 group-hover:from-[#FF9FF2]/8 to-transparent transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 p-7 flex flex-col h-full gap-5">
        {/* Tags — fuchsia outlined pills */}
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-[#FF9FF2]/70 border border-[#FF9FF2]/25 rounded-sm px-2.5 py-0.5 tracking-widest uppercase"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8" />

        {/* Title — Assistant Bold */}
        <h3
          className="text-white text-xl font-bold leading-tight"
          style={{ fontFamily: "'Assistant', sans-serif" }}
        >
          {card.title}
        </h3>

        {/* Body */}
        <p
          className="text-white/45 text-sm font-light leading-relaxed tracking-wide flex-1"
          style={{ fontFamily: "'Assistant', sans-serif" }}
        >
          {card.body}
        </p>

        {/* Bottom hover arrow */}
        <div className="flex items-center gap-2 mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-px flex-1 bg-[#FF9FF2]/30" />
          <span
            className="text-[#FF9FF2]/60 text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            Explore
          </span>
          <div className="w-5 h-5 rounded-sm border border-[#FF9FF2]/30 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 6.5L6.5 1.5M6.5 1.5H2.5M6.5 1.5V5.5" stroke="#FF9FF2" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CommunityCapabilities() {
  const headingRef    = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* ASCII texture */}
      <div className="absolute inset-0 pointer-events-none z-0" style={ASCII_BG} />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      <div className="relative z-20 flex flex-col justify-center flex-1 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-28">

        {/* Header */}
        <div ref={headingRef} className="mb-16">
          {/* Section label — pixel font, fuchsia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className="text-[#FF9FF2] text-[8px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              // Ecosystem
            </span>
            
          </motion.div>

          {/* Section heading — Assistant ExtraBold */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-6 max-w-2xl leading-loose"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            Community<br />
            <span className="text-[#FF9FF2]">Reimagined</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
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
