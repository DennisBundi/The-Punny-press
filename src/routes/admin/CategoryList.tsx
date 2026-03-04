import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCategories } from '@/hooks/useCategories';
import Button from '@/components/ui/Button';
import DataTable from '@/components/admin/DataTable';
import DeleteDialog from '@/components/admin/DeleteDialog';
import Spinner from '@/components/ui/Spinner';
import EmptyState from '@/components/ui/EmptyState';
import { Tags } from 'lucide-react';
import { toast } from 'sonner';
import type { Category } from '@/types';

export default function CategoryList() {
  const { categories, loading, refetch } = useCategories();
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await supabase.from('categories').delete().eq('id', deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    refetch();
    toast.success('Category deleted');
  };

  if (loading) return <Spinner className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link to="/admin/categories/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          icon={Tags}
          title="No categories yet"
          description="Create categories to organize your products."
          action={
            <Link to="/admin/categories/new">
              <Button>Add Category</Button>
            </Link>
          }
        />
      ) : (
        <DataTable
          data={categories}
          keyExtractor={(c) => c.id}
          columns={[
            {
              key: 'image',
              header: '',
              className: 'w-16',
              render: (c) =>
                c.image_url ? (
                  <img src={c.image_url} alt="" className="h-10 w-10 rounded object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded bg-warm-gray" />
                ),
            },
            {
              key: 'name',
              header: 'Name',
              render: (c) => <span className="font-medium">{c.name}</span>,
            },
            {
              key: 'slug',
              header: 'Slug',
              render: (c) => <span className="text-gray-500">{c.slug}</span>,
            },
            {
              key: 'order',
              header: 'Order',
              render: (c) => c.sort_order,
            },
            {
              key: 'actions',
              header: '',
              className: 'w-24',
              render: (c) => (
                <div className="flex items-center gap-1">
                  <Link to={`/admin/categories/${c.id}`} className="p-1.5 rounded hover:bg-warm-gray">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(c)}
                    className="p-1.5 rounded hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      <DeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Category"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? Products in this category will become uncategorized.`}
      />
    </div>
  );
}
