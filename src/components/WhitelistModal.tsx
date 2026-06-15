import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function WhitelistModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      // no-cors means we can't read the response — assume success if no throw
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  function handleClose() {
    if (status === 'loading') return;
    onClose();
    // reset after animation
    setTimeout(() => {
      setName('');
      setEmail('');
      setStatus('idle');
      setErrorMsg('');
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md rounded-2xl bg-[#0c0c0c] border border-[#FF9FF2]/25 p-8 pointer-events-auto shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors duration-200"
              >
                <X size={18} />
              </button>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center gap-4 py-4"
                >
                  <CheckCircle size={48} className="text-[#FF9FF2]" />
                  <h2
                    className="text-white text-lg font-bold"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '14px', lineHeight: '1.8' }}
                  >
                    You're whitelisted!
                  </h2>
                  <p
                    className="text-white/55 text-sm leading-relaxed"
                    style={{ fontFamily: "'Assistant', sans-serif" }}
                  >
                    We'll reach out when we launch. Welcome to Cats of Paraiso 🐾
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-2 px-6 py-2.5 rounded-full border border-[#FF9FF2]/40 text-[#FF9FF2] text-sm font-semibold hover:bg-[#FF9FF2]/10 transition-all duration-200"
                    style={{ fontFamily: "'Assistant', sans-serif" }}
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <img src="/assets/Paw.png" alt="" className="w-5 h-5 object-contain opacity-80" />
                      <span
                        className="text-[#FF9FF2] text-[7px] tracking-widest"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        WHITELIST
                      </span>
                    </div>
                    <h2
                      className="text-white font-bold leading-loose mb-2"
                      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '13px' }}
                    >
                      Join the Community
                    </h2>
                    <p
                      className="text-white/50 text-sm leading-relaxed"
                      style={{ fontFamily: "'Assistant', sans-serif" }}
                    >
                      Get early access when we launch. No spam, just cat-saving updates.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-white/50 text-xs tracking-wide"
                        style={{ fontFamily: "'Assistant', sans-serif" }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-white/5 border border-[#FF9FF2]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#FF9FF2]/60 transition-colors duration-200 disabled:opacity-50"
                        style={{ fontFamily: "'Assistant', sans-serif" }}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-white/50 text-xs tracking-wide"
                        style={{ fontFamily: "'Assistant', sans-serif" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-white/5 border border-[#FF9FF2]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#FF9FF2]/60 transition-colors duration-200 disabled:opacity-50"
                        style={{ fontFamily: "'Assistant', sans-serif" }}
                      />
                    </div>

                    {errorMsg && (
                      <p
                        className="text-red-400 text-xs"
                        style={{ fontFamily: "'Assistant', sans-serif" }}
                      >
                        {errorMsg}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'loading' || !name.trim() || !email.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-center gap-2.5 w-full px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-wide transition-all duration-300 shadow-lg shadow-black/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                      style={{ fontFamily: "'Assistant', sans-serif" }}
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Joining...
                        </span>
                      ) : (
                        <>
                          Join Whitelist
                          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                        </>
                      )}
                    </motion.button>

                    <p
                      className="text-center text-white/30 text-xs"
                      style={{ fontFamily: "'Assistant', sans-serif" }}
                    >
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
