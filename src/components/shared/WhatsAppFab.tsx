import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useSettings } from '@/contexts/SettingsContext';
import { trackEvent } from '@/lib/analytics';

export default function WhatsAppFab() {
  const { settings } = useSettings();

  if (!settings.whatsapp_number) return null;

  const url = buildWhatsAppUrl(settings.whatsapp_number);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent({ type: 'whatsapp_inquiry', source: 'fab' })}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl ring-4 ring-green-500/20 hover:bg-green-600 hover:-translate-y-0.5 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring" />
      <MessageCircle className="h-7 w-7 relative z-10" />
    </a>
  );
}
