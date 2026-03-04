import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';
import ProductGrid from './ProductGrid';
import Spinner from '@/components/ui/Spinner';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*), images:product_images(*)')
        .eq('category_id', categoryId)
        .eq('is_available', true)
        .neq('id', currentProductId)
        .order('sort_order')
        .limit(4);
      setProducts(data ?? []);
      setLoading(false);
    }
    fetch();
  }, [categoryId, currentProductId]);

  if (loading) return <Spinner className="py-8" />;
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-8">You Might Also Like</h2>
      <ProductGrid products={products} />
    </div>
  );
}
