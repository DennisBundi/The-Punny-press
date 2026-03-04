import { supabase } from '@/lib/supabase';

type AnalyticsEvent =
  | { type: 'whatsapp_inquiry'; source: 'fab' | 'product_page' | 'contact_page'; productId?: string; productName?: string }
  | { type: 'product_view'; productId: string; productName: string }
  | { type: 'social_click'; platform: string };

export function trackEvent(event: AnalyticsEvent) {
  const { type, ...rest } = event;
  const productId = 'productId' in rest ? rest.productId : undefined;

  // Remove productId from metadata (stored as top-level column)
  const metadata = { ...rest };
  if ('productId' in metadata) delete (metadata as Record<string, unknown>).productId;

  supabase
    .from('analytics_events')
    .insert({
      event_type: type,
      product_id: productId || null,
      metadata,
      page_path: window.location.pathname,
    })
    .then(({ error }) => {
      if (error) console.warn('[analytics]', error.message);
    });
}
