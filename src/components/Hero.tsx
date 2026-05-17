import { motion } from 'framer-motion';
import { Globe, Clock, ArrowRight, Play } from 'lucide-react';
import BlurText from './BlurText';
import { DottedSurface } from './DottedSurface';

const HERO_VIDEOS = [
  'https://videos.pexels.com/video-files/6827395/6827395-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/2611820/2611820-uhd_2560_1440_25fps.mp4',
];

const PARTNERS = ['MEXC'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

function StatCard({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-[130px] rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 px-5 py-4 flex flex-col gap-2 hover:bg-white/12 transition-all duration-300 hover:border-white/25 hover:-translate-y-0.5">
      <div className="text-white/50">{icon}</div>
      <div className="text-white text-2xl font-semibold tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>{number}</div>
      <div className="text-white/55 text-xs font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      <DottedSurface />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center flex-1 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pt-32 pb-24">

        {/* Badge */}
        <motion.div {...fadeUp(0.3)} className="mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 w-fit">
            <span className="text-xs font-semibold text-black bg-white px-2.5 py-0.5 rounded-full tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              New
            </span>
            <span className="text-white/80 text-xs tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              Building a Web3 Community for Cat Rescue
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.05] text-white mb-6 max-w-3xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <BlurText text="Saving Cats Through" delay={0.4} />
          <br />
          <span className="italic">
            <BlurText text="Web3 Innovation" delay={0.65} />
          </span>
        </h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.75)}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10 tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Cats of Paraiso combines crypto culture, trading education, and community-driven initiatives to support stray cats while making Web3 more accessible to Filipinos.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.9)} className="flex items-center gap-4 mb-16 flex-wrap">
          <button className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Join the Community
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
          <button className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/18 backdrop-blur-xl border border-white/20 hover:border-white/35 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
              <Play size={11} fill="white" className="translate-x-0.5" />
            </div>
            Watch Vision
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(1.05)} className="flex gap-4 mb-16 flex-wrap">
          <StatCard
            number="10K+"
            label="Community Supporters"
            icon={<Globe size={18} />}
          />
          <StatCard
            number="24/7"
            label="Crypto & Web3 Updates"
            icon={<Clock size={18} />}
          />
        </motion.div>

        {/* Partners */}
        <motion.div {...fadeUp(1.2)} className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2">
            <div className="h-px w-8 bg-white/25" />
            <span className="text-white/40 text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              Powered by community-driven innovation
            </span>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            {PARTNERS.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.07 }}
                className="text-white/35 text-sm font-light tracking-widest hover:text-white/60 transition-colors duration-200 cursor-default"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
  
}
