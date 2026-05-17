import { Facebook, Twitter, Instagram, Music2, MessageCircle, ArrowRight } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61567442002845',
    icon: Facebook,
  },
  {
    name: 'X',
    url: 'https://x.com/CatsofParaiso',
    icon: Twitter,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@catsofparaiso',
    icon: Music2,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/catsofparaiso',
    icon: Instagram,
  },
  {
    name: 'Threads',
    url: 'https://www.threads.com/@catsofparaiso',
    icon: MessageCircle,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/10">
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-14 md:py-16">

        {/* Top row — brand + tagline */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-12">

          {/* Brand block */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-3xl overflow-hidden border border-white/12 bg-white/8 backdrop-blur-xl flex-shrink-0">
              <img
                src="/assets/cats_logo.jpg"
                alt="Cats of Paraiso"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              {/* Brand name — Instrument Serif like Hero h1 */}
              <p
                className="text-xl sm:text-2xl font-normal text-white leading-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Cats of Paraiso
              </p>
            </div>
          </div>

          
        </div>

        {/* Social links — icon-only circles, always centered */}
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
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/18 backdrop-blur-xl border border-white/20 hover:border-white/35 text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Icon className="h-4 w-4 text-white/60 group-hover:text-white transition-colors duration-200" />
              </a>
            );
          })}
        </div>

        {/* Bottom bar — always centered */}
        <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-2 text-center">
          <span
            className="text-sm text-white/30 font-light tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © {new Date().getFullYear()} Cats of Paraiso. All rights reserved.
          </span>
          <span
            className="text-xs text-white/20 font-light tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            In Code We Trust · 🐾
          </span>
        </div>
      </div>
    </footer>
  );
}
