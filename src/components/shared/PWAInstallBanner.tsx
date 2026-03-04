import { Download, X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function PWAInstallBanner() {
  const { showPrompt, install, dismiss } = usePWAInstall();

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 animate-slide-up">
      <div className="mx-auto max-w-lg p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-charcoal px-4 py-3 text-cream shadow-2xl ring-1 ring-gold/20">
          <Download className="h-5 w-5 shrink-0 text-gold" />
          <p className="flex-1 text-sm">
            Install <strong>Punny Press</strong> for the best experience
          </p>
          <button
            onClick={install}
            className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            Install
          </button>
          <button
            onClick={dismiss}
            className="rounded-full p-1 text-cream/60 hover:text-cream transition-colors"
            aria-label="Dismiss install prompt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
