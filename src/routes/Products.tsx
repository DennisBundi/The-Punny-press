import { useSearchParams } from 'react-router-dom';
import SEOHead from '@/components/shared/SEOHead';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import Spinner from '@/components/ui/Spinner';

export default function Products() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category') ?? undefined;

  const { products, loading } = useProducts({ categorySlug });
  const { categories } = useCategories();

  return (
    <>
      <SEOHead title="Products" description="Browse our handmade crochet collection." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Products' }]} />

        <div className="flex flex-col md:flex-row gap-10">
          <aside className="md:w-56 shrink-0">
            <ProductFilter categories={categories} activeSlug={categorySlug} />
          </aside>

          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-10">
              {categorySlug
                ? categories.find((c) => c.slug === categorySlug)?.name ?? 'Products'
                : 'All Products'}
            </h1>

            {loading ? (
              <Spinner className="py-20" />
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
