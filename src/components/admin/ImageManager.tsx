import { useState } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Star, Trash2, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useImageUpload } from '@/hooks/useImageUpload';
import type { ProductImage } from '@/types';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

interface ImageManagerProps {
  productId: string;
  images: ProductImage[];
  onUpdate: () => void;
}

function SortableImage({
  image,
  onSetPrimary,
  onDelete,
}: {
  image: ProductImage;
  onSetPrimary: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-white rounded-lg border p-2">
      <button {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
        <GripVertical className="h-5 w-5" />
      </button>
      <img src={image.url} alt={image.alt_text ?? ''} className="h-16 w-16 rounded object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600 truncate">{image.alt_text || 'No alt text'}</p>
        {image.is_primary && (
          <span className="text-xs text-gold-dark font-medium">Primary</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        {!image.is_primary && (
          <button
            onClick={onSetPrimary}
            className="p-1.5 rounded text-gray-400 hover:text-gold-dark hover:bg-gold-light"
            title="Set as primary"
          >
            <Star className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={onDelete}
          className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function ImageManager({ productId, images, onUpdate }: ImageManagerProps) {
  const { upload, uploading } = useImageUpload();
  const [localImages, setLocalImages] = useState(images);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const url = await upload(file, { folder: `products/${productId}` });
      if (url) {
        await supabase.from('product_images').insert({
          product_id: productId,
          url,
          sort_order: localImages.length,
          is_primary: localImages.length === 0,
        });
      }
    }
    onUpdate();
    toast.success('Images uploaded');
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localImages.findIndex((i) => i.id === active.id);
    const newIndex = localImages.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(localImages, oldIndex, newIndex);
    setLocalImages(reordered);

    for (let i = 0; i < reordered.length; i++) {
      await supabase.from('product_images').update({ sort_order: i }).eq('id', reordered[i].id);
    }
    onUpdate();
  };

  const handleSetPrimary = async (id: string) => {
    await supabase.from('product_images').update({ is_primary: false }).eq('product_id', productId);
    await supabase.from('product_images').update({ is_primary: true }).eq('id', id);
    onUpdate();
    toast.success('Primary image updated');
  };

  const handleDelete = async (image: ProductImage) => {
    await supabase.from('product_images').delete().eq('id', image.id);
    const path = image.url.split('/storage/v1/object/public/images/')[1];
    if (path) {
      await supabase.storage.from('images').remove([path]);
    }
    setLocalImages((prev) => prev.filter((i) => i.id !== image.id));
    onUpdate();
    toast.success('Image deleted');
  };

  // Sync when props change
  if (images !== localImages && images.length !== localImages.length) {
    setLocalImages(images);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400">
          Images
        </h3>
        <label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          <Button type="button" variant="outline" size="sm" loading={uploading} onClick={() => {}}>
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </label>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={localImages.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {localImages.map((image) => (
              <SortableImage
                key={image.id}
                image={image}
                onSetPrimary={() => handleSetPrimary(image.id)}
                onDelete={() => handleDelete(image)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {localImages.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">No images yet. Upload some!</p>
      )}
    </div>
  );
}
