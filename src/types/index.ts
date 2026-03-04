export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  is_featured: boolean;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface SiteSettings {
  business_name: string;
  business_tagline: string;
  whatsapp_number: string;
  instagram_url: string;
  tiktok_url: string;
  facebook_url: string;
  about_text: string;
  contact_email: string;
  hero_image_url: string;
  currency_symbol: string;
  [key: string]: string;
}
