import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Tags, Eye, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import StatsCard from '@/components/admin/StatsCard';
import Button from '@/components/ui/Button';

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, featured: 0, available: 0 });

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
    </div>
  );
}
