import { Link } from 'react-router-dom';
import type { Category } from '@/types';

interface ProductFilterProps {
  categories: Category[];
  activeSlug?: string;
}

export default function ProductFilter({ categories, activeSlug }: ProductFilterProps) {
  return (
    <div>
      <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
        Categories
      </h3>
      <ul className="space-y-1">
        <li>
          <Link
            to="/products"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              !activeSlug ? 'bg-gold-light text-gold-dark' : 'text-charcoal hover:bg-warm-gray'
            }`}
          >
            All Products
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/products?category=${cat.slug}`}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSlug === cat.slug ? 'bg-gold-light text-gold-dark' : 'text-charcoal hover:bg-warm-gray'
              }`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
