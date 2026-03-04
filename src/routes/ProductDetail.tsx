import { useParams } from 'react-router-dom';
import SEOHead from '@/components/shared/SEOHead';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ProductGallery from '@/components/products/ProductGallery';
import ProductInfo from '@/components/products/ProductInfo';
import RelatedProducts from '@/components/products/RelatedProducts';
import Spinner from '@/components/ui/Spinner';
import { useProduct } from '@/hooks/useProducts';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProduct(slug!);

  if (loading) {
    return <Spinner className="py-20" />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">This product may have been removed or doesn't exist.</p>
      </div>
    );
  }

  const images = product.images?.sort((a, b) => a.sort_order - b.sort_order) ?? [];

  return (
    <>
      <SEOHead
        title={product.name}
        description={product.description ?? `Check out ${product.name} from The Punny Press`}
        image={images[0]?.url}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            ...(product.category
              ? [{ label: product.category.name, href: `/products?category=${product.category.slug}` }]
              : []),
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ProductGallery images={images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        {product.category_id && (
          <div className="mt-20">
            <RelatedProducts
              categoryId={product.category_id}
              currentProductId={product.id}
            />
          </div>
        )}
      </div>
    </>
  );
}
