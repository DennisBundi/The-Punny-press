import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import MobileNav from './MobileNav';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="The Punny Press" className="h-10 w-auto" />
            <span className="font-serif text-2xl tracking-tight font-bold text-charcoal">
              {settings.business_name || 'The Punny Press'}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wide transition-colors hover:text-gold-dark after:absolute after:bottom-[-4px] after:left-1/2 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-gold-dark after:w-full after:left-0'
                      : 'text-charcoal after:w-0 hover:after:w-full hover:after:left-0'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-warm-gray"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
