import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useSettings } from '@/contexts/SettingsContext';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Badge from '@/components/ui/Badge';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { settings } = useSettings();

  return (
    <div className="space-y-6">
      <div>
        {product.category && (
          <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
        )}
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold text-gold-dark mt-3">
          {formatPrice(product.price, settings.currency_symbol)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {product.is_available ? (
          <Badge variant="success">Available</Badge>
        ) : (
          <Badge variant="danger">Sold Out</Badge>
        )}
        {product.is_featured && <Badge variant="warning">Featured</Badge>}
      </div>

      {product.description && (
        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}

      {product.is_available && (
        <WhatsAppButton
          product={{ name: product.name, price: product.price, slug: product.slug }}
        />
      )}
    </div>
  );
}
