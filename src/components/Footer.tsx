import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Music2, MessageCircle } from 'lucide-react';

const FLOAT_PAWS = [
  { id: 0, left: '6%',  delay: 0,   duration: 5.0 },
  { id: 1, left: '20%', delay: 1.8, duration: 6.5 },
  { id: 2, left: '38%', delay: 0.6, duration: 4.5 },
  { id: 3, left: '57%', delay: 2.5, duration: 7.0 },
  { id: 4, left: '74%', delay: 1.1, duration: 5.5 },
  { id: 5, left: '90%', delay: 3.2, duration: 6.0 },
];

const SOCIAL_LINKS = [
  { name: 'Facebook',  url: 'https://www.facebook.com/profile.php?id=61567442002845', icon: Facebook    },
  { name: 'X',         url: 'https://x.com/CatsofParaiso',                            icon: Twitter     },
  { name: 'TikTok',    url: 'https://www.tiktok.com/@catsofparaiso',                  icon: Music2      },
  { name: 'Instagram', url: 'https://www.instagram.com/catsofparaiso',                icon: Instagram   },
  { name: 'Threads',   url: 'https://www.threads.com/@catsofparaiso',                 icon: MessageCircle },
];

const ASCII_BG: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Ctext x='1' y='10' font-family='monospace' font-size='7' fill='%23ffffff' opacity='0.04'%3E5%3C/text%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black border-t border-[#FF9FF2]/15">
      {/* ASCII texture */}
      <div className="absolute inset-0 pointer-events-none z-0" style={ASCII_BG} />

      {/* Floating paw particles */}
      {FLOAT_PAWS.map((paw) => (
        <motion.div
          key={paw.id}
          className="absolute bottom-16 pointer-events-none select-none"
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

      {/* Fuchsia top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 800px 200px at 50% 0%, rgba(255,159,242,0.08) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-16 md:py-20">

        {/* Brand block — centered */}
        <div className="flex flex-col items-center gap-5 mb-12">
          {/* Logo with fuchsia border */}
          <div
            className="h-16 w-16 overflow-hidden border border-[#FF9FF2]/35"
            style={{ borderRadius: '12%', boxShadow: '0 0 30px rgba(255,159,242,0.18)' }}
          >
            <img src="/assets/cats_logo.png" alt="Cats of Paraiso" className="h-full w-full object-cover" />
          </div>

          {/* Pixel brand name */}
          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-[11px] sm:text-[13px] text-white leading-none tracking-wide"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              CATS OF
            </span>
            <span
              className="text-[11px] sm:text-[13px] text-[#FF9FF2] leading-none tracking-wide"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              PARAISO
            </span>
          </div>

          {/* Tagline */}
          <p
            className="text-white/40 text-sm font-light leading-relaxed tracking-wide text-center max-w-xs"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            Built from SEA, reaching the world.
            <br />Crypto culture · Cat rescue · Community.
          </p>
        </div>

        {/* Fuchsia paw divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-[#FF9FF2]/15" />
          
          <img src="/assets/paws_horizontal.png" alt="Cats of Paraiso"/>
          <div className="h-px flex-1 bg-[#FF9FF2]/15" />
        </div>

        {/* Social links — icon-only fuchsia circles */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {SOCIAL_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="group flex items-center justify-center w-11 h-11 rounded-full border border-[#FF9FF2]/20 bg-[#FF9FF2]/5 text-white/40 hover:border-[#FF9FF2] hover:bg-[#FF9FF2]/15 hover:text-[#FF9FF2] transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ boxShadow: 'none' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,159,242,0.2)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <Icon className="h-4 w-4 transition-colors duration-200" />
              </a>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#FF9FF2]/10 pt-6 flex flex-col items-center gap-2 text-center">
          <span
            className="text-sm text-white/25 font-light tracking-wide"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            © {new Date().getFullYear()} Cats of Paraiso. All rights reserved.
          </span>
          <span
            className="text-[9px] text-[#FF9FF2]/50 tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            In Code We Trust 
          </span>
        </div>
      </div>
    </footer>
  );
}
