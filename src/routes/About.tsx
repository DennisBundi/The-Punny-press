import SEOHead from '@/components/shared/SEOHead';
import { useSettings } from '@/contexts/SettingsContext';

export default function About() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead title="About Us" description="Learn about The Punny Press and our handmade crochet story." />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Us</h1>

        <div className="bg-cream rounded-2xl p-8 md:p-12">
          {settings.about_text ? (
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
              {settings.about_text}
            </p>
          ) : (
            <p className="text-gray-500 text-center">
              Our story is being written. Check back soon!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
