import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/utils';
import { useSettings } from '@/contexts/SettingsContext';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/admin/DataTable';
import DeleteDialog from '@/components/admin/DeleteDialog';
import Spinner from '@/components/ui/Spinner';
import EmptyState from '@/components/ui/EmptyState';
import { Package } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/types';

export default function ProductList() {
  const { products, loading, refetch } = useProducts({ includeUnavailable: true });
  const { settings } = useSettings();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    // Delete images from storage
    const { data: images } = await supabase
      .from('product_images')
      .select('url')
      .eq('product_id', deleteTarget.id);

    if (images) {
      const paths = images
        .map((i) => i.url.split('/storage/v1/object/public/images/')[1])
        .filter(Boolean);
      if (paths.length > 0) {
        await supabase.storage.from('images').remove(paths as string[]);
      }
    }

    await supabase.from('products').delete().eq('id', deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    refetch();
    toast.success('Product deleted');
  };

  if (loading) return <Spinner className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products yet"
          description="Create your first product to get started."
          action={
            <Link to="/admin/products/new">
              <Button>Add Product</Button>
            </Link>
          }
        />
      ) : (
        <DataTable
          data={products}
          keyExtractor={(p) => p.id}
          columns={[
            {
              key: 'image',
              header: '',
              className: 'w-16',
              render: (p) => {
                const img = p.images?.find((i) => i.is_primary) ?? p.images?.[0];
                return img ? (
                  <img src={img.url} alt="" className="h-10 w-10 rounded object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded bg-warm-gray" />
                );
              },
            },
            {
              key: 'name',
              header: 'Name',
              render: (p) => <span className="font-medium">{p.name}</span>,
            },
            {
              key: 'category',
              header: 'Category',
              render: (p) => p.category?.name ?? <span className="text-gray-400">—</span>,
            },
            {
              key: 'price',
              header: 'Price',
              render: (p) => formatPrice(p.price, settings.currency_symbol),
            },
            {
              key: 'status',
              header: 'Status',
              render: (p) => (
                <div className="flex gap-1">
                  {p.is_available ? (
                    <Badge variant="success">Available</Badge>
                  ) : (
                    <Badge variant="danger">Unavailable</Badge>
                  )}
                  {p.is_featured && <Badge variant="warning">Featured</Badge>}
                </div>
              ),
            },
            {
              key: 'actions',
              header: '',
              className: 'w-24',
              render: (p) => (
                <div className="flex items-center gap-1">
                  <Link to={`/admin/products/${p.id}`} className="p-1.5 rounded hover:bg-warm-gray">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(p)}
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
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
