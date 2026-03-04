export const DEFAULT_META = {
  title: 'The Punny Press — Handmade Crochet',
  description: 'Beautiful handmade crochet products crafted with love. Browse our collection and order via WhatsApp.',
  ogImage: '/og-default.jpg',
};

export const DEFAULT_SETTINGS = {
  business_name: 'The Punny Press',
  business_tagline: 'Wrap yourself in joy',
  whatsapp_number: '254746544090',
  instagram_url: '',
  tiktok_url: '',
  facebook_url: '',
  about_text: '',
  contact_email: '',
  hero_image_url: '',
  currency_symbol: 'Ksh',
};

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
  { label: 'Products', path: '/admin/products', icon: 'Package' },
  { label: 'Categories', path: '/admin/categories', icon: 'Tags' },
  { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
] as const;
