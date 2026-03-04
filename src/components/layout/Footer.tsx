import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import SocialLinks from '@/components/shared/SocialLinks';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-gold mb-2">
              {settings.business_name || 'The Punny Press'}
            </h3>
            <p className="text-sm text-gray-400">
              {settings.business_tagline || 'Handmade with love, one stitch at a time'}
            </p>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-gray-300 hover:text-gold transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-gold transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-gold transition-colors">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Follow Us
            </h4>
            <SocialLinks iconSize="h-6 w-6" />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {settings.business_name || 'The Punny Press'}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
