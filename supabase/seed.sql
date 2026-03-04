-- Default site settings
INSERT INTO site_settings (key, value) VALUES
  ('business_name', 'The Punny Press'),
  ('business_tagline', 'Handmade with love, one stitch at a time'),
  ('whatsapp_number', ''),
  ('instagram_url', ''),
  ('tiktok_url', ''),
  ('facebook_url', ''),
  ('about_text', 'We create beautiful handmade crochet products, each crafted with care and attention to detail. Every piece tells a story and is made to bring warmth and joy to your life.'),
  ('contact_email', ''),
  ('hero_image_url', ''),
  ('currency_symbol', '₦')
ON CONFLICT (key) DO NOTHING;
