import { useState } from 'react';
import type { ProductImage } from '@/types';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/5] bg-warm-gray rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
        No images available
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] bg-warm-gray rounded-2xl overflow-hidden shadow-sm">
        <img
          key={selectedImage.id}
          src={selectedImage.url}
          alt={selectedImage.alt_text ?? productName}
          decoding="async"
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, i) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                i === selectedIndex ? 'border-gold' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt_text ?? `${productName} ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
