import SEOHead from '@/components/shared/SEOHead';
import { useSettings } from '@/contexts/SettingsContext';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import SocialLinks from '@/components/shared/SocialLinks';
import { Mail } from 'lucide-react';

export default function Contact() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead title="Contact" description="Get in touch with The Punny Press." />
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">Get in Touch</h1>
        <p className="text-gray-500 text-center mb-4 max-w-lg mx-auto">
          Have a question about our products or want to place a custom order? We'd love to hear from you!
        </p>
        <div className="gold-divider mb-12" />

        <div className="bg-cream rounded-2xl p-10 md:p-14 space-y-10">
          <div>
            <h2 className="font-serif text-xl font-semibold mb-4">Chat with us</h2>
            <p className="text-gray-600 mb-4">
              The quickest way to reach us is via WhatsApp. Tap the button below to start a conversation.
            </p>
            <WhatsAppButton />
          </div>

          {settings.contact_email && (
            <div>
              <h2 className="font-serif text-xl font-semibold mb-4">Email</h2>
              <a
                href={`mailto:${settings.contact_email}`}
                className="inline-flex items-center gap-2 text-gold-dark hover:underline"
              >
                <Mail className="h-5 w-5" />
                {settings.contact_email}
              </a>
            </div>
          )}

          <div>
            <h2 className="font-serif text-xl font-semibold mb-4">Follow Us</h2>
            <SocialLinks iconSize="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
}
