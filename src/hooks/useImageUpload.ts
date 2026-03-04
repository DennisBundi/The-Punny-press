import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface UploadOptions {
  bucket?: string;
  folder?: string;
}

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File, options?: UploadOptions): Promise<string | null> => {
    const bucket = options?.bucket ?? 'images';
    const folder = options?.folder ?? 'site';
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    setUploading(true);
    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    setUploading(false);

    if (error) return null;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const remove = async (url: string, bucket = 'images') => {
    const path = url.split(`/storage/v1/object/public/${bucket}/`)[1];
    if (path) {
      await supabase.storage.from(bucket).remove([path]);
    }
  };

  return { upload, remove, uploading };
}
