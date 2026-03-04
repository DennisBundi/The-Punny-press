import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useSettings } from '@/contexts/SettingsContext';
import Button from '@/components/ui/Button';

interface WhatsAppButtonProps {
  product?: { name: string; price: number; slug: string };
  className?: string;
}

export default function WhatsAppButton({ product, className = '' }: WhatsAppButtonProps) {
  const { settings } = useSettings();

  if (!settings.whatsapp_number) return null;

  const url = buildWhatsAppUrl(settings.whatsapp_number, product, settings.currency_symbol);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`block transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}>
      <Button variant="primary" size="lg" className="w-full">
        <MessageCircle className="h-5 w-5" />
        Inquire on WhatsApp
      </Button>
    </a>
  );
}
