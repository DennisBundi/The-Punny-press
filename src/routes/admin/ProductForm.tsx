import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';
import { useProductById } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useImageUpload } from '@/hooks/useImageUpload';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import ImageManager from '@/components/admin/ImageManager';
import { toast } from 'sonner';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be positive'),
  category_id: z.string().optional(),
  is_featured: z.boolean(),
  is_available: z.boolean(),
  sort_order: z.coerce.number().int(),
});

type FormInput = z.input<typeof schema>;
type FormData = z.output<typeof schema>;

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { product, loading: productLoading } = useProductById(id);
  const { categories } = useCategories();
  const { upload, uploading } = useImageUpload();
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormInput, unknown, FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: 0,
      category_id: '',
      is_featured: false,
      is_available: true,
      sort_order: 0,
    },
  });

  const nameValue = watch('name');

  useEffect(() => {
    if (!isEditing) {
      setValue('slug', generateSlug(nameValue));
    }
  }, [nameValue, isEditing, setValue]);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        slug: product.slug,
        description: product.description ?? '',
        price: product.price,
        category_id: product.category_id ?? '',
        is_featured: product.is_featured,
        is_available: product.is_available,
        sort_order: product.sort_order,
      });
    }
  }, [product, reset]);

  const uploadPendingFiles = async (productId: string) => {
    for (let i = 0; i < pendingFiles.length; i++) {
      const url = await upload(pendingFiles[i], { folder: `products/${productId}` });
      if (url) {
        await supabase.from('product_images').insert({
          product_id: productId,
          url,
          sort_order: i,
          is_primary: i === 0,
        });
      }
    }
    setPendingFiles([]);
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    const payload = {
      ...data,
      category_id: data.category_id || null,
    };

    if (isEditing) {
      const { error } = await supabase.from('products').update(payload).eq('id', id);
      if (error) {
        toast.error(error.message);
      } else {
        if (pendingFiles.length > 0) {
          await uploadPendingFiles(id);
          setRefreshKey((k) => k + 1);
        }
        toast.success('Product updated');
      }
    } else {
      const { data: created, error } = await supabase.from('products').insert(payload).select().single();
      if (error) {
        toast.error(error.message);
      } else {
        if (pendingFiles.length > 0) {
          await uploadPendingFiles(created.id);
        }
        toast.success('Product created');
        navigate(`/admin/products/${created.id}`);
      }
    }
    setSaving(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPendingFiles((prev) => [...prev, ...Array.from(files)]);
    }
    e.target.value = '';
  };

  const removePendingFile = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (isEditing && productLoading) return <Spinner className="py-20" />;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/products')} className="p-2 rounded-lg hover:bg-white">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Product' : 'New Product'}</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input id="name" label="Product Name" error={errors.name?.message} {...register('name')} />
            <Input id="slug" label="Slug" error={errors.slug?.message} {...register('slug')} />
            <Textarea id="description" label="Description" {...register('description')} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input id="price" label="Price" type="number" step="0.01" error={errors.price?.message} {...register('price')} />
              <Select
                id="category_id"
                label="Category"
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                placeholder="No category"
                {...register('category_id')}
              />
            </div>

            <Input id="sort_order" label="Sort Order" type="number" {...register('sort_order')} />

            <div className="flex flex-wrap gap-6 pt-2">
              <Switch
                label="Featured"
                checked={watch('is_featured')}
                onChange={(v) => setValue('is_featured', v)}
              />
              <Switch
                label="Available"
                checked={watch('is_available')}
                onChange={(v) => setValue('is_available', v)}
              />
            </div>

            {/* Images section */}
            <div className="border-t pt-4 space-y-4">
              {isEditing && product && (
                <div key={refreshKey}>
                  <ImageManager
                    productId={product.id}
                    images={product.images?.sort((a, b) => a.sort_order - b.sort_order) ?? []}
                    onUpdate={() => setRefreshKey((k) => k + 1)}
                  />
                </div>
              )}

              {!isEditing && (
                <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Images
                </h3>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
              >
                <ImagePlus className="h-5 w-5" />
                {pendingFiles.length > 0 ? 'Add more images' : 'Select images to upload'}
              </button>

              {pendingFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    {pendingFiles.length} image{pendingFiles.length !== 1 ? 's' : ''} ready to upload
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {pendingFiles.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-20 w-full rounded-lg object-cover border"
                        />
                        <button
                          type="button"
                          onClick={() => removePendingFile(index)}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => navigate('/admin/products')}>
                Cancel
              </Button>
              <Button type="submit" loading={saving || uploading}>
                {isEditing ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
