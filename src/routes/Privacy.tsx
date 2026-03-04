import SEOHead from '@/components/shared/SEOHead';
import { useSettings } from '@/contexts/SettingsContext';

export default function Privacy() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead title="Privacy Policy" />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-charcoal space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">Information We Collect</h2>
            <p>
              When you contact us via WhatsApp to inquire about or order products, we may collect your name, phone number, and delivery address. We only collect information necessary to fulfill your order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">How We Use Your Information</h2>
            <p>
              Your information is used solely for processing your orders and communicating with you about your purchases. We do not sell, rent, or share your personal information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mt-6 mb-3">Contact</h2>
            <p>
              If you have questions about this privacy policy, contact us at {settings.contact_email || 'our contact page'}.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
