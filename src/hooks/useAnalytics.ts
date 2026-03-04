import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface AnalyticsEvent {
  id: string;
  event_type: string;
  product_id: string | null;
  metadata: Record<string, string>;
  page_path: string | null;
  created_at: string;
}

interface TopProduct {
  productId: string;
  name: string;
  count: number;
}

interface AnalyticsData {
  inquiriesToday: number;
  inquiriesThisWeek: number;
  inquiriesAllTime: number;
  recentEvents: AnalyticsEvent[];
  topInquiredProducts: TopProduct[];
  topViewedProducts: TopProduct[];
}

const emptyData: AnalyticsData = {
  inquiriesToday: 0,
  inquiriesThisWeek: 0,
  inquiriesAllTime: 0,
  recentEvents: [],
  topInquiredProducts: [],
  topViewedProducts: [],
};

function startOfDay() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function startOfWeek() {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function aggregateTopProducts(events: AnalyticsEvent[], limit: number): TopProduct[] {
  const counts = new Map<string, { name: string; count: number }>();
  for (const e of events) {
    if (!e.product_id) continue;
    const name = e.metadata?.productName || e.metadata?.product_name || 'Unknown';
    const existing = counts.get(e.product_id);
    if (existing) {
      existing.count++;
    } else {
      counts.set(e.product_id, { name, count: 1 });
    }
  }
  return Array.from(counts.entries())
    .map(([productId, { name, count }]) => ({ productId, name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>(emptyData);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const [today, week, allTime, recent, inquiryEvents, viewEvents] = await Promise.all([
        supabase
          .from('analytics_events')
          .select('id', { count: 'exact', head: true })
          .eq('event_type', 'whatsapp_inquiry')
          .gte('created_at', startOfDay()),
        supabase
          .from('analytics_events')
          .select('id', { count: 'exact', head: true })
          .eq('event_type', 'whatsapp_inquiry')
          .gte('created_at', startOfWeek()),
        supabase
          .from('analytics_events')
          .select('id', { count: 'exact', head: true })
          .eq('event_type', 'whatsapp_inquiry'),
        supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('analytics_events')
          .select('*')
          .eq('event_type', 'whatsapp_inquiry')
          .not('product_id', 'is', null),
        supabase
          .from('analytics_events')
          .select('*')
          .eq('event_type', 'product_view')
          .not('product_id', 'is', null),
      ]);

      setData({
        inquiriesToday: today.count ?? 0,
        inquiriesThisWeek: week.count ?? 0,
        inquiriesAllTime: allTime.count ?? 0,
        recentEvents: (recent.data as AnalyticsEvent[]) ?? [],
        topInquiredProducts: aggregateTopProducts((inquiryEvents.data as AnalyticsEvent[]) ?? [], 5),
        topViewedProducts: aggregateTopProducts((viewEvents.data as AnalyticsEvent[]) ?? [], 5),
      });
    } catch {
      // Table may not exist yet — show zeros
      setData(emptyData);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, refetch: fetchAnalytics };
}
