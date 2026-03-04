import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useSettings } from '@/contexts/SettingsContext';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { settings } = useSettings();
  const primaryImage = product.images?.find((i) => i.is_primary) ?? product.images?.[0];

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-gold/20 transition-all duration-500"
    >
      <div className="aspect-[4/5] bg-warm-gray relative overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt_text ?? product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
        {product.is_featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="warning">Featured</Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif font-semibold text-charcoal group-hover:text-gold-dark transition-colors line-clamp-1">
          {product.name}
        </h3>
        {product.category && (
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{product.category.name}</p>
        )}
        <p className="font-sans font-semibold text-gold-dark mt-2">
          {formatPrice(product.price, settings.currency_symbol)}
        </p>
      </div>
    </Link>
  );
}
