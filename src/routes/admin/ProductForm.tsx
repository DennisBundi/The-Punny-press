import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';
import { useProductById } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import ImageManager from '@/components/admin/ImageManager';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

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

type FormData = z.infer<typeof schema>;

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { product, loading: productLoading } = useProductById(id);
  const { categories } = useCategories();
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
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
        toast.success('Product updated');
      }
    } else {
      const { data: created, error } = await supabase.from('products').insert(payload).select().single();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Product created');
        navigate(`/admin/products/${created.id}`);
      }
    }
    setSaving(false);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => navigate('/admin/products')}>
                  Cancel
                </Button>
                <Button type="submit" loading={saving}>
                  {isEditing ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {isEditing && product && (
          <div>
            <Card key={refreshKey}>
              <ImageManager
                productId={product.id}
                images={product.images?.sort((a, b) => a.sort_order - b.sort_order) ?? []}
                onUpdate={() => setRefreshKey((k) => k + 1)}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
