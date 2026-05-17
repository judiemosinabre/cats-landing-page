import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Maps each nav label to a section id (null = Launch App modal)
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
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center px-6"
        onClick={onClose}
      >
        {/* Card — stop propagation so clicking inside doesn't close */}
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-sm rounded-3xl border border-white/12 bg-white/6 backdrop-blur-2xl p-8 flex flex-col items-center text-center gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/15 bg-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all duration-200"
          >
            <X size={14} />
          </button>

          {/* Logo */}
          <div
            className="h-20 w-20 overflow-hidden border border-white/15 flex-shrink-0"
            style={{ borderRadius: '20%' }}
          >
            <img
              src="/assets/cats_logo.jpg"
              alt="Cats of Paraiso"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Label */}
          <div
            className="text-white/35 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            // Coming Soon
          </div>

          {/* Headline */}
          <h2
            className="text-4xl font-normal text-white leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Launching
            <br />
            <em className="italic">Soon!</em>
          </h2>

          {/* Body */}
          <p
            className="text-white/60 text-sm font-light leading-relaxed tracking-wide max-w-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Stay tuned with{' '}
            <span className="text-white font-medium">Cats of Paraiso</span> —
            our Web3 platform is on its way. Cat-powered, community-driven.
          </p>

          {/* Paw divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-white/25 text-xs">🐾</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Dismiss */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
            style={{ fontFamily: "'Inter', sans-serif" }}
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
            ? 'py-3 bg-black/40 backdrop-blur-xl border-b border-white/10'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo — clicks scroll back to hero */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 select-none focus:outline-none"
          >
            <div
              className="h-10 w-10 flex-shrink-0 overflow-hidden border border-white/15"
              style={{ borderRadius: '12%' }}
            >
              <img
                src="/assets/cats_logo.jpg"
                alt="Cats of Paraiso logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center leading-none gap-0.5">
              <p
                className="text-sm font-semibold text-white leading-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cats of Paraiso
              </p>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, target }) => (
              <button
                key={label}
                onClick={() => handleLink(target)}
                className={`px-4 py-2 text-sm font-light tracking-wide transition-colors duration-200 ${
                  target === null
                    ? 'text-white/90 hover:text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleLink(null)}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Join Community
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors"
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
              className="md:hidden mt-2 mx-4 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/15 overflow-hidden"
            >
              <div className="flex flex-col py-3">
                {NAV_LINKS.map(({ label, target }) => (
                  <button
                    key={label}
                    onClick={() => handleLink(target)}
                    className="text-left px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {label}
                  </button>
                ))}
                <div className="px-4 pt-2 pb-3">
                  <button
                    onClick={() => handleLink(null)}
                    className="w-full px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium tracking-wide"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Join Community
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Launch App modal */}
      {showModal && <LaunchModal onClose={() => setShowModal(false)} />}
    </>
  );
}
