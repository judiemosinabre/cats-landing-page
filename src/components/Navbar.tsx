import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS: { label: string; target: string | null }[] = [
  { label: 'Home',       target: 'hero'      },
  { label: 'Community',  target: 'community' },
  { label: 'Rescue',     target: 'community' },
  { label: 'Web3 News',  target: 'web3-news' },
  { label: 'Launch App', target: null        },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = document.querySelector('nav')?.getBoundingClientRect().height ?? 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ── Launch App Modal ────────────────────────────────────────────────────────
function LaunchModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center px-6"
        onClick={onClose}
      >
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-sm rounded-xl border border-[#FF9FF2]/25 bg-[#080808] p-8 flex flex-col items-center text-center gap-6"
          style={{ boxShadow: '0 0 80px rgba(255,159,242,0.15), inset 0 0 0 1px rgba(255,159,242,0.08)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-[#FF9FF2] hover:border-[#FF9FF2]/40 transition-all duration-200"
          >
            <X size={14} />
          </button>

          {/* Logo with fuchsia glow border */}
          <div
            className="h-20 w-20 overflow-hidden border border-[#FF9FF2]/40 flex-shrink-0"
            style={{ borderRadius: '12%', boxShadow: '0 0 30px rgba(255,159,242,0.25)' }}
          >
            <img src="/assets/cats_logo.png" alt="Cats of Paraiso" className="h-full w-full object-cover" />
          </div>

          {/* Pixel label */}
          <div
            className="text-[#FF9FF2] text-[8px] tracking-[0.35em] uppercase"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            Coming Soon
          </div>

          {/* Pixel headline */}
          <h2
            className="text-lg text-white leading-loose"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            Launching<br />
            <span className="text-[#FF9FF2]">Soon!</span>
          </h2>

          {/* Body */}
          <p
            className="text-white/55 text-sm font-light leading-relaxed tracking-wide max-w-xs"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            Stay tuned with{' '}
            <span className="text-[#FF9FF2] font-semibold">Cats of Paraiso</span>{' '}—
            our Web3 platform is on its way. Cat-powered, community-driven.
          </p>

          {/* Fuchsia paw divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="h-px flex-1 bg-[#FF9FF2]/25" />
            <img src="/assets/paws_horizontal.png" alt="Cats of Paraiso"/>
            <div className="h-px flex-1 bg-[#FF9FF2]/25" />
          </div>

          {/* Dismiss */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:bg-[#FF9FF2]/10 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            Got it, I'll wait!
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleLink(target: string | null) {
    setMenuOpen(false);
    if (target === null) { setShowModal(true); return; }
    scrollTo(target);
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-black/95 border-b border-[#FF9FF2]/15'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo — pixel font brand name */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 select-none focus:outline-none"
          >
            <div
              className="h-9 w-9 flex-shrink-0 overflow-hidden border border-[#FF9FF2]/35"
              style={{ borderRadius: '12%' }}
            >
              <img
                src="/assets/cats_logo.png"
                alt="Cats of Paraiso logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col justify-center leading-none gap-1">
              <span
                className="glitch text-[9px] text-white leading-none"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                CATS OF
              </span>
              <span
                className="glitch-2 text-[9px] text-[#FF9FF2] leading-none"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                PARAISO
              </span>
            </div>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, target }) => (
              <button
                key={label}
                onClick={() => handleLink(target)}
                className={`px-4 py-2 text-sm tracking-wide transition-colors duration-200 ${
                  target === null
                    ? 'text-[#FF9FF2] hover:text-[#FF9FF2] font-semibold'
                    : 'text-white/55 hover:text-white font-normal'
                }`}
                style={{ fontFamily: "'Assistant', sans-serif" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Desktop CTA — fuchsia outline */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleLink(null)}
              className="px-5 py-2.5 rounded-full border border-[#FF9FF2]/40 text-[#FF9FF2] text-sm font-semibold tracking-wide hover:bg-[#FF9FF2]/10 hover:border-[#FF9FF2] transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              Join Community
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/60 hover:text-[#FF9FF2] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 mx-4 rounded-xl bg-[#080808] border border-[#FF9FF2]/20 overflow-hidden"
            >
              <div className="flex flex-col py-3">
                {NAV_LINKS.map(({ label, target }) => (
                  <button
                    key={label}
                    onClick={() => handleLink(target)}
                    className={`text-left px-6 py-3 text-sm transition-all duration-200 hover:bg-[#FF9FF2]/5 ${
                      target === null
                        ? 'text-[#FF9FF2] font-semibold'
                        : 'text-white/55 hover:text-white font-normal'
                    }`}
                    style={{ fontFamily: "'Assistant', sans-serif" }}
                  >
                    {label}
                  </button>
                ))}
                <div className="px-4 pt-2 pb-3 border-t border-[#FF9FF2]/10 mt-1">
                  <button
                    onClick={() => handleLink(null)}
                    className="w-full px-5 py-2.5 rounded-full border border-[#FF9FF2]/40 text-[#FF9FF2] text-sm font-semibold tracking-wide"
                    style={{ fontFamily: "'Assistant', sans-serif" }}
                  >
                    Join Community
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {showModal && <LaunchModal onClose={() => setShowModal(false)} />}
    </>
  );
}
