import { NavLink } from 'react-router-dom';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; to: string }[];
}

export default function MobileNav({ open, onClose, links }: MobileNavProps) {
  if (!open) return null;

  return (
    <div className="md:hidden border-t border-gray-100 bg-white">
      <nav className="flex flex-col py-6 px-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-gold-light text-gold-dark border-l-2 border-gold' : 'text-charcoal hover:bg-warm-gray'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
