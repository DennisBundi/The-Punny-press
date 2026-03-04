import { Link } from 'react-router-dom';
import SEOHead from '@/components/shared/SEOHead';
import { useSettings } from '@/contexts/SettingsContext';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead />

      {/* Hero */}
      <section className="relative bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
                {settings.business_tagline || 'Handmade with love, one stitch at a time'}
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg">
                Discover unique handmade crochet pieces, each crafted with care and attention to detail. From cozy accessories to beautiful home decor.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">About Us</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              {settings.hero_image_url ? (
                <img
                  src={settings.hero_image_url}
                  alt={settings.business_name || 'The Punny Press'}
                  className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                />
              ) : (
                <div className="rounded-2xl bg-gold-light w-full aspect-square flex items-center justify-center">
                  <span className="font-serif text-4xl text-gold-dark">TPP</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-gray-500 mt-2">Our most loved handmade pieces</p>
            </div>
            <Link to="/products" className="hidden sm:block">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <FeaturedProducts />
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      {settings.about_text && (
        <section className="py-16 bg-warm-gray">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {settings.about_text.length > 300
                ? settings.about_text.slice(0, 300) + '...'
                : settings.about_text}
            </p>
            <Link to="/about" className="inline-block mt-6">
              <Button variant="outline">Read More</Button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
