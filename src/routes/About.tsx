import { Link } from 'react-router-dom';
import SEOHead from '@/components/shared/SEOHead';
import Button from '@/components/ui/Button';
import { ArrowRight, Heart, Sparkles, Sun, HandHeart } from 'lucide-react';

const values = [
  {
    icon: HandHeart,
    title: 'Handmade With Heart',
    text: 'Every stitch is placed by hand — no factories, no shortcuts. Just passion woven into yarn.',
  },
  {
    icon: Sun,
    title: 'Proudly Kenyan',
    text: 'Born and stitched in Kenya, our pieces carry the warmth and colour of home in every loop.',
  },
  {
    icon: Sparkles,
    title: 'One of a Kind',
    text: "No two pieces are exactly alike. That little 'imperfection'? That's character, darling.",
  },
  {
    icon: Heart,
    title: 'Made to Last',
    text: 'We use premium yarns that stay soft wash after wash. These aren\'t fast fashion — they\'re forever fashion.',
  },
];

export default function About() {
  return (
    <>
      <SEOHead
        title="About Us"
        description="The Punny Press — a Kenyan crochet startup stitching joy, one pun at a time."
      />

      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center min-h-[50vh] flex items-center"
        style={{ backgroundImage: "url('/logo.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-shadow">
            Our Story
          </h1>
          <p className="mt-4 text-xl text-gold font-serif text-shadow-sm">
            Stitching joy, one pun at a time.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4">
            How It All Unravelled
          </h2>
          <div className="gold-divider mb-10" />

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              It started the way most great things do — with a hook, some yarn, and absolutely
              no idea what we were getting ourselves into.
            </p>
            <p>
              The Punny Press was born in Nairobi, from a simple love of crochet and a slightly
              unhealthy obsession with puns. What began as gifts for friends and family — a
              beanie here, a bag there, the occasional "you're <em>sew</em> amazing" tag attached — quickly
              turned into something bigger. People started asking, <em>"Wait, where did you get that?"</em>
            </p>
            <p>
              So we set up shop. Not in a fancy studio, but at the kitchen table. Between cups
              of chai and way too many YouTube tutorials, we taught ourselves new stitches,
              experimented with colours inspired by Kenyan sunsets and Maasai shukas, and slowly
              built a brand that feels as warm as the pieces we make.
            </p>
            <p>
              Today, The Punny Press is a growing Kenyan crochet startup with one mission: to
              wrap the world in handmade joy — and maybe make you groan at a pun or two along
              the way.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight">What We're Made Of</h2>
            <p className="mt-3 text-gray-500 text-lg">(Besides yarn. Obviously.)</p>
            <div className="gold-divider mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-cream rounded-2xl p-8 text-center shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mb-5">
                  <v.icon className="h-7 w-7 text-gold-dark" />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Why "The Punny Press"?
          </h2>
          <div className="gold-divider mb-10" />
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Because life's too short for boring brand names.
            </p>
            <p>
              We believe every piece should come with a smile. Our product tags have puns.
              Our packaging has puns. Our conversations with customers? You guessed it — puns.
              We can't help it. It's in our <em>DNA</em> (that's Definitely Not Acrylic — we
              only use the good stuff).
            </p>
            <p>
              The "Press" part? That's the mark we want to leave. A lasting impression, pressed
              into every stitch. Plus, it sounds official. Very <em>im-press-ive</em>, if we
              do say so ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Get Hooked?
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            Browse our collection of handmade crochet pieces — each one crafted in Kenya
            with love, laughter, and just the right amount of terrible wordplay.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/products">
              <Button size="lg">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
