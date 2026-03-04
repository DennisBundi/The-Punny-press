import { Link } from 'react-router-dom';
import SEOHead from '@/components/shared/SEOHead';
import { useSettings } from '@/contexts/SettingsContext';
import { SITE_URL } from '@/lib/constants';
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

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Punny Press',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpeg`,
    description: 'Beautiful handmade crochet products crafted with love.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${settings.whatsapp_number}`,
      contactType: 'customer service',
    },
    sameAs: [
      settings.instagram_url,
      settings.tiktok_url,
      settings.facebook_url,
    ].filter(Boolean),
  };

  return (
    <>
      <SEOHead jsonLd={organizationLd} />

      {/* Hero — split layout */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        {/* Gold corner accents */}
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-gold/30 hidden lg:block" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-gold/30 hidden lg:block" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Left — text */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="w-10 h-1 bg-gold mb-8" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Wrap yourself{' '}
              <br className="hidden sm:block" />
              in <em className="font-serif text-gold not-italic">joy</em>
            </h1>
            <p className="mt-6 text-base text-gray-400 max-w-md leading-relaxed">
              Discover unique handmade crochet pieces, each crafted with care and attention to detail. From cozy accessories to beautiful home decor.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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

            {/* Stats row */}
            <div className="mt-12 flex gap-10">
              <div>
                <p className="text-2xl font-bold text-gold">100+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Pieces Crafted</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gold">50+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gold italic font-serif">100%</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Handmade</p>
              </div>
            </div>
          </div>

          {/* Right — yarn image (desktop) */}
          <div className="relative hidden lg:block">
            <img
              src="/hero-yarn.jpg"
              alt="Colourful yarn rolls"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          </div>

          {/* Mobile — yarn image below text */}
          <div className="lg:hidden relative h-64">
            <img
              src="/hero-yarn.jpg"
              alt="Colourful yarn rolls"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
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
