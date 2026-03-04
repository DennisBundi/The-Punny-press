import SEOHead from '@/components/shared/SEOHead';
import { useSettings } from '@/contexts/SettingsContext';

export default function Terms() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead title="Terms of Service" />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-charcoal space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">1. About Our Products</h2>
            <p>
              All products sold by {settings.business_name || 'The Punny Press'} are handmade crochet items. Due to the nature of handmade products, slight variations in color, size, and pattern may occur. These are not defects but rather what makes each piece unique.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">2. Ordering</h2>
            <p>
              Orders are placed via WhatsApp. Product availability and pricing shown on the website are subject to change. Final pricing and availability will be confirmed during your WhatsApp conversation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">3. Payment</h2>
            <p>
              Payment methods and terms will be discussed and agreed upon during the ordering process via WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">4. Delivery</h2>
            <p>
              Delivery times and shipping costs vary depending on your location. Details will be provided during the ordering process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">5. Contact</h2>
            <p>
              For any questions about these terms, please reach out via WhatsApp or email at {settings.contact_email || 'our contact page'}.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
