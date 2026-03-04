import { useProducts } from '@/hooks/useProducts';
import ProductGrid from './ProductGrid';
import Spinner from '@/components/ui/Spinner';

export default function FeaturedProducts() {
  const { products, loading } = useProducts();

  if (loading) return <Spinner className="py-12" />;

  return <ProductGrid products={products.slice(0, 4)} />;
}
