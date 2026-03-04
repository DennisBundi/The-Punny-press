import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Tags, Eye, Star, MessageCircle, Share2, BarChart3 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAnalytics } from '@/hooks/useAnalytics';
import StatsCard from '@/components/admin/StatsCard';
import DataTable from '@/components/admin/DataTable';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';

function EventIcon({ type }: { type: string }) {
  switch (type) {
    case 'whatsapp_inquiry':
      return <MessageCircle className="h-4 w-4 text-green-600" />;
    case 'product_view':
      return <Eye className="h-4 w-4 text-blue-600" />;
    case 'social_click':
      return <Share2 className="h-4 w-4 text-purple-600" />;
    default:
      return <BarChart3 className="h-4 w-4 text-gray-400" />;
  }
}

function formatEventLabel(event: { event_type: string; metadata: Record<string, string> }): string {
  switch (event.event_type) {
    case 'whatsapp_inquiry': {
      const name = event.metadata?.productName;
      const source = event.metadata?.source ?? '';
      if (name) return `WhatsApp inquiry — ${name}`;
      return `WhatsApp inquiry (${source})`;
    }
    case 'product_view':
      return `Viewed ${event.metadata?.productName ?? 'product'}`;
    case 'social_click':
      return `Clicked ${event.metadata?.platform ?? 'social link'}`;
    default:
      return event.event_type;
  }
}

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, featured: 0, available: 0 });
  const { data: analytics, loading: analyticsLoading } = useAnalytics();

  useEffect(() => {
    async function fetchStats() {
      const [products, categories, featured, available] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_available', true),
      ]);
      setStats({
        products: products.count ?? 0,
        categories: categories.count ?? 0,
        featured: featured.count ?? 0,
        available: available.count ?? 0,
      });
    }
    fetchStats();
  }, []);

  const topProductColumns = [
    { key: 'name', header: 'Product', render: (p: { name: string }) => p.name },
    { key: 'count', header: 'Count', render: (p: { count: number }) => p.count, className: 'text-right' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your store</p>
        </div>
        <Link to="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Package} label="Total Products" value={stats.products} />
        <StatsCard icon={Tags} label="Categories" value={stats.categories} />
        <StatsCard icon={Star} label="Featured" value={stats.featured} />
        <StatsCard icon={Eye} label="Available" value={stats.available} />
      </div>

      {/* Analytics Section */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-gold-dark" />
          Analytics
        </h2>

        {analyticsLoading ? (
          <Spinner className="py-10" />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <StatsCard icon={MessageCircle} label="Inquiries Today" value={analytics.inquiriesToday} />
              <StatsCard icon={MessageCircle} label="This Week" value={analytics.inquiriesThisWeek} />
              <StatsCard icon={MessageCircle} label="All Time" value={analytics.inquiriesAllTime} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <h3 className="font-semibold text-charcoal mb-3">Top 5 Inquired Products</h3>
                {analytics.topInquiredProducts.length > 0 ? (
                  <DataTable
                    columns={topProductColumns}
                    data={analytics.topInquiredProducts}
                    keyExtractor={(p) => p.productId}
                  />
                ) : (
                  <p className="text-sm text-gray-400">No inquiry data yet</p>
                )}
              </Card>

              <Card>
                <h3 className="font-semibold text-charcoal mb-3">Top 5 Viewed Products</h3>
                {analytics.topViewedProducts.length > 0 ? (
                  <DataTable
                    columns={topProductColumns}
                    data={analytics.topViewedProducts}
                    keyExtractor={(p) => p.productId}
                  />
                ) : (
                  <p className="text-sm text-gray-400">No view data yet</p>
                )}
              </Card>
            </div>

            <Card>
              <h3 className="font-semibold text-charcoal mb-3">Recent Activity</h3>
              {analytics.recentEvents.length > 0 ? (
                <div className="space-y-3">
                  {analytics.recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 text-sm">
                      <EventIcon type={event.event_type} />
                      <span className="flex-1 text-gray-700">{formatEventLabel(event)}</span>
                      <Badge>{formatRelativeTime(event.created_at)}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No events recorded yet</p>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
