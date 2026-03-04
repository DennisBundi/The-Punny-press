import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/contexts/SettingsContext';
import { useImageUpload } from '@/hooks/useImageUpload';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ImageUpload from '@/components/ui/ImageUpload';
import Spinner from '@/components/ui/Spinner';
import { toast } from 'sonner';
import type { SiteSettings } from '@/types';

export default function Settings() {
  const { settings, loading, refetch } = useSettings();
  const { upload, uploading } = useImageUpload();
  const [saving, setSaving] = useState(false);
  const [heroImage, setHeroImage] = useState<string | undefined>();

  const { register, handleSubmit, reset } = useForm<SiteSettings>();

  useEffect(() => {
    reset(settings);
    setHeroImage(settings.hero_image_url || undefined);
  }, [settings, reset]);

  const handleHeroUpload = async (file: File | null) => {
    if (!file) return;
    const url = await upload(file, { folder: 'site' });
    if (url) setHeroImage(url);
  };

  const onSubmit = async (data: SiteSettings) => {
    setSaving(true);
    const entries = Object.entries({ ...data, hero_image_url: heroImage ?? '' });

    for (const [key, value] of entries) {
      if (key === 'hero_image_url' || typeof value === 'string') {
        await supabase
          .from('site_settings')
          .upsert({ key, value: value as string }, { onConflict: 'key' });
      }
    }

    await refetch();
    setSaving(false);
    toast.success('Settings saved');
  };

  if (loading) return <Spinner className="py-20" />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your store settings</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Business Info</h2>
          <div className="space-y-4">
            <Input id="business_name" label="Business Name" {...register('business_name')} />
            <Input id="business_tagline" label="Tagline" {...register('business_tagline')} />
            <Textarea id="about_text" label="About Text" {...register('about_text')} />
            <Input id="contact_email" label="Contact Email" type="email" {...register('contact_email')} />
            <Input id="currency_symbol" label="Currency Symbol" {...register('currency_symbol')} />
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Hero Image</h2>
          <ImageUpload
            value={heroImage}
            onChange={handleHeroUpload}
            onRemove={() => setHeroImage(undefined)}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">WhatsApp</h2>
          <Input
            id="whatsapp_number"
            label="WhatsApp Number"
            placeholder="2348012345678"
            {...register('whatsapp_number')}
          />
          <p className="text-xs text-gray-500 mt-1">Include country code without + sign (e.g. 2348012345678)</p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Social Media</h2>
          <div className="space-y-4">
            <Input id="instagram_url" label="Instagram URL" placeholder="https://instagram.com/..." {...register('instagram_url')} />
            <Input id="tiktok_url" label="TikTok URL" placeholder="https://tiktok.com/@..." {...register('tiktok_url')} />
            <Input id="facebook_url" label="Facebook URL" placeholder="https://facebook.com/..." {...register('facebook_url')} />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" loading={saving}>
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
