import { Instagram } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { trackEvent } from '@/lib/analytics';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.82a8.22 8.22 0 004.76 1.5V6.87a4.84 4.84 0 01-1-.18z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
}

export default function SocialLinks({ className = '', iconSize = 'h-5 w-5' }: SocialLinksProps) {
  const { settings } = useSettings();

  const links = [
    { url: settings.instagram_url, icon: Instagram, label: 'Instagram' },
    { url: settings.tiktok_url, icon: TikTokIcon, label: 'TikTok' },
    { url: settings.facebook_url, icon: FacebookIcon, label: 'Facebook' },
  ].filter((l) => l.url);

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map(({ url, icon: Icon, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent({ type: 'social_click', platform: label.toLowerCase() })}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/10 text-gray-600 hover:bg-gold hover:text-charcoal transition-colors"
          aria-label={label}
        >
          <Icon className={iconSize} />
        </a>
      ))}
    </div>
  );
}
