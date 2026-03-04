import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

interface UseProductsOptions {
  categorySlug?: string;
  featuredOnly?: boolean;
  includeUnavailable?: boolean;
}

export function useProducts(options?: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*, category:categories(*), images:product_images(*)')
      .order('sort_order');

    if (!options?.includeUnavailable) {
      query = query.eq('is_available', true);
    }
    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data } = await query;
    let results = data ?? [];

    if (options?.categorySlug) {
      results = results.filter((p) => p.category?.slug === options.categorySlug);
    }

    setProducts(results);
    setLoading(false);
  }, [options?.categorySlug, options?.featuredOnly, options?.includeUnavailable]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, refetch: fetchProducts };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*), images:product_images(*)')
        .eq('slug', slug)
        .single();
      setProduct(data);
      setLoading(false);
    }
    fetch();
  }, [slug]);

  return { product, loading };
}

export function useProductById(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    async function fetch() {
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*), images:product_images(*)')
        .eq('id', id)
        .single();
      setProduct(data);
      setLoading(false);
    }
    fetch();
  }, [id]);

  return { product, loading };
}
