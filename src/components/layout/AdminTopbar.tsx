import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, Package, Tags, Settings, ExternalLink, Store } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Categories', path: '/admin/categories', icon: Tags },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminTopbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 lg:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <span className="font-serif text-lg font-bold text-charcoal">Admin</span>
        <div className="flex items-center gap-2">
          <a href="/" className="p-2 text-gray-500 hover:text-gold-dark" title="View Store">
            <Store className="h-5 w-5" />
          </a>
          <button onClick={handleSignOut} className="p-2 text-gray-500 hover:text-red-600">
            <LogOut className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-warm-gray"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t px-4 py-2 space-y-1">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/admin'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-gold-light text-gold-dark' : 'text-charcoal hover:bg-warm-gray'}`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
          <div className="border-t border-gray-200 mt-2 pt-2">
            <a
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-charcoal hover:bg-warm-gray"
            >
              <ExternalLink className="h-5 w-5" />
              View Store
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
