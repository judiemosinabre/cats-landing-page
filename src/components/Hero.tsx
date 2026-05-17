import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, animate as fmAnimate } from 'framer-motion';
import { Globe, Clock, ArrowRight } from 'lucide-react';

const PARTNERS = ['MEXC'];

// Brand ASCII matrix texture
const ASCII_BG: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Ctext x='1' y='10' font-family='monospace' font-size='7' fill='%23ffffff' opacity='0.1'%3E5%3C/text%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};

// Floating paw positions & timings
const FLOAT_PAWS = [
  { id: 0, left: '6%',  delay: 0,   duration: 5.0 },
  { id: 1, left: '20%', delay: 1.8, duration: 6.5 },
  { id: 2, left: '38%', delay: 0.6, duration: 4.5 },
  { id: 3, left: '57%', delay: 2.5, duration: 7.0 },
  { id: 4, left: '74%', delay: 1.1, duration: 5.5 },
  { id: 5, left: '90%', delay: 3.2, duration: 6.0 },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

// ── Animated counter stat card ────────────────────────────────────────────────
function StatCard({
  rawNumber, suffix, label, icon,
}: {
  rawNumber: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count  = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = fmAnimate(count, rawNumber, {
      duration: 2.2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    });
    return controls.stop;
  }, [inView, rawNumber, count]);

  return (
    <div
      ref={ref}
      className="border-pulse shimmer-card relative overflow-hidden flex-1 min-w-[130px] rounded-xl bg-[#0c0c0c] border border-[#FF9FF2]/25 px-5 py-4 flex flex-col gap-2 hover:border-[#FF9FF2]/50 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="text-[#FF9FF2]/80">{icon}</div>
      <div
        className="text-white text-2xl font-bold tracking-tight tabular-nums"
        style={{ fontFamily: "'Assistant', sans-serif" }}
      >
        {display}{suffix}
      </div>
      <div
        className="text-white/45 text-xs font-light tracking-wide"
        style={{ fontFamily: "'Assistant', sans-serif" }}
      >
        {label}
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef   = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* ASCII character matrix */}
      <div className="absolute inset-0 pointer-events-none z-0" style={ASCII_BG} />

      {/* Breathing pink radial glow */}
      <div
        className="glow-breathe absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 900px 600px at 50% 35%, rgba(255,159,242,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Cursor-tracking spotlight */}
      <div
        className="cursor-spotlight"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* CRT scanline sweep */}
      <div className="scanline" />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none z-0" />

      {/* Floating paw particles */}
      {FLOAT_PAWS.map((paw) => (
        <motion.div
          key={paw.id}
          className="absolute bottom-24 pointer-events-none select-none"
          style={{ left: paw.left, zIndex: 1 }}
          animate={{ y: [0, -200], opacity: [0, 0.5, 0.3, 0], rotate: [0, 15] }}
          transition={{
            duration: paw.duration,
            delay: paw.delay,
            repeat: Infinity,
            repeatDelay: paw.duration * 0.6,
            ease: 'easeOut',
          }}
        >
          <img src="/assets/Paw.png" alt="" className="w-7 h-7 object-contain" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pt-32 pb-24">

        {/* Badge */}
        <motion.div {...fadeUp(0.3)} className="mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-[#FF9FF2]/30 bg-[#FF9FF2]/5 w-fit">
            <span
              className="glitch text-[7px] text-[#FF9FF2] tracking-widest"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              NEW
            </span>
            <div className="w-px h-3 bg-[#FF9FF2]/30" />
            <span
              className="text-white/65 text-xs tracking-wide"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              Building a Web3 Community for Cat Rescue
            </span>
          </div>
        </motion.div>

        {/* Headline — Press Start 2P */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-6 max-w-2xl leading-loose"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          Saving Cats<br />
          Through{' '}
          <span className="text-[#FF9FF2]">Web3</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.75)}
          className="text-white/55 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10 tracking-wide"
          style={{ fontFamily: "'Assistant', sans-serif" }}
        >
          Cats of Paraiso combines crypto culture, trading education, and
          community-driven initiatives to support stray cats —{' '}
          <span className="text-white/80">built from SEA, reaching the world.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.9)} className="flex items-center gap-4 mb-16 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-wide transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-[#FF9FF2]/10"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            Join the Community
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[#FF9FF2]/40 text-[#FF9FF2] text-sm font-semibold tracking-wide hover:bg-[#FF9FF2]/10 hover:border-[#FF9FF2] transition-all duration-300"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            Learn More
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.button>
        </motion.div>

        {/* Stats — animated counters */}
        <motion.div {...fadeUp(1.05)} className="flex gap-4 mb-16 flex-wrap">
          <StatCard rawNumber={10}  suffix="K+"  label="Community Supporters"   icon={<Globe size={18} />} />
          <StatCard rawNumber={247} suffix=""     label="Crypto & Web3 Updates"  icon={<Clock size={18} />} />
        </motion.div>

        {/* Partners */}
        <motion.div {...fadeUp(1.2)} className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2">
            <div className="h-px w-8 bg-[#FF9FF2]/40" />
            <span
              className="text-[#FF9FF2]/60 text-[7px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Partners
            </span>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            {PARTNERS.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.07 }}
                className="text-white/30 text-sm font-light tracking-widest hover:text-white/55 transition-colors duration-200 cursor-default"
                style={{ fontFamily: "'Assistant', sans-serif" }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
