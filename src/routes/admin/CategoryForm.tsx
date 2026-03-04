import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';
import { useCategoryById } from '@/hooks/useCategories';
import { useImageUpload } from '@/hooks/useImageUpload';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import ImageUpload from '@/components/ui/ImageUpload';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  sort_order: z.coerce.number().int(),
});

type FormData = z.infer<typeof schema>;

export default function CategoryForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { category, loading: catLoading } = useCategoryById(id);
  const { upload, uploading } = useImageUpload();
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', slug: '', description: '', sort_order: 0 },
  });

  const nameValue = watch('name');

  useEffect(() => {
    if (!isEditing) {
      setValue('slug', generateSlug(nameValue));
    }
  }, [nameValue, isEditing, setValue]);

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        slug: category.slug,
        description: category.description ?? '',
        sort_order: category.sort_order,
      });
      setImageUrl(category.image_url ?? undefined);
    }
  }, [category, reset]);

  const handleImageChange = async (file: File | null) => {
    if (!file) return;
    const folder = isEditing ? `categories/${id}` : 'categories/temp';
    const url = await upload(file, { folder });
    if (url) setImageUrl(url);
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    const payload = { ...data, image_url: imageUrl ?? null };

    if (isEditing) {
      const { error } = await supabase.from('categories').update(payload).eq('id', id);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Category updated');
        navigate('/admin/categories');
      }
    } else {
      const { error } = await supabase.from('categories').insert(payload);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Category created');
        navigate('/admin/categories');
      }
    }
    setSaving(false);
  };

  if (isEditing && catLoading) return <Spinner className="py-20" />;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/categories')} className="p-2 rounded-lg hover:bg-white">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Category' : 'New Category'}</h1>
      </div>

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input id="name" label="Category Name" error={errors.name?.message} {...register('name')} />
            <Input id="slug" label="Slug" error={errors.slug?.message} {...register('slug')} />
            <Textarea id="description" label="Description" {...register('description')} />
            <Input id="sort_order" label="Sort Order" type="number" {...register('sort_order')} />

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Image</label>
              <ImageUpload
                value={imageUrl}
                onChange={handleImageChange}
                onRemove={() => setImageUrl(undefined)}
              />
              {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => navigate('/admin/categories')}>
                Cancel
              </Button>
              <Button type="submit" loading={saving}>
                {isEditing ? 'Update Category' : 'Create Category'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
