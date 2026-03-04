import { Link } from 'react-router-dom';
import SEOHead from '@/components/shared/SEOHead';
import { useSettings } from '@/contexts/SettingsContext';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import Button from '@/components/ui/Button';
import { ArrowRight, Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah M.',
    text: 'Absolutely love my crochet blanket! The quality is amazing and you can tell so much love went into making it. Will definitely be ordering again.',
    rating: 5,
  },
  {
    name: 'Jessica T.',
    text: 'The cutest amigurumi I have ever seen! My daughter was over the moon. Fast shipping and beautifully packaged too.',
    rating: 5,
  },
  {
    name: 'Linda K.',
    text: 'Stunning craftsmanship. I ordered a set of coasters and they are even more beautiful in person. Such a thoughtful gift idea!',
    rating: 5,
  },
];

export default function Home() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead />

      {/* Hero — split layout */}
      <section className="bg-charcoal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          {/* Left — text */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
            <div className="w-12 h-1 bg-gold rounded-full mb-8" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {settings.business_tagline || 'Wrap yourself in joy'}
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-lg leading-relaxed">
              Discover unique handmade crochet pieces, each crafted with care and attention to detail. From cozy accessories to beautiful home decor.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg">
                  Explore Collection
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-gold/40 text-gold hover:bg-gold/10">
                  About Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — product image */}
          <div className="relative hidden lg:block">
            {settings.hero_image_url ? (
              <img
                src={settings.hero_image_url}
                alt={settings.business_name || 'Handmade crochet'}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gold-light flex items-center justify-center">
                <span className="font-serif text-5xl text-gold-dark">TPP</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent" />
          </div>

          {/* Mobile — show image below text */}
          <div className="lg:hidden relative h-72">
            {settings.hero_image_url ? (
              <img
                src={settings.hero_image_url}
                alt={settings.business_name || 'Handmade crochet'}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gold-light flex items-center justify-center">
                <span className="font-serif text-4xl text-gold-dark">TPP</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
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

      {/* Reviews */}
      <section className="py-20 md:py-28 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
            <div className="gold-divider mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="bg-cream rounded-2xl p-8 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="italic text-gray-600 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-4 font-semibold text-charcoal">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      {settings.about_text && (
        <section className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Story</h2>
            <div className="gold-divider mb-8" />
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
