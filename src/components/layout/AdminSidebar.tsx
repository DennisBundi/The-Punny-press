import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, Settings, ExternalLink } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Categories', path: '/admin/categories', icon: Tags },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-charcoal text-white min-h-screen">
      <div className="p-6">
        <h1 className="font-serif text-lg font-bold text-gold">The Punny Press</h1>
        <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-gold text-black' : 'text-gray-300 hover:bg-gray-700'}`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Site
        </a>
      </div>
    </aside>
  );
}
