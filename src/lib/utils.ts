export function cn(...inputs: (string | boolean | null | undefined)[]): string {
  // Simple class merging without clsx dependency
  return inputs
    .flat()
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
    .join(' ');
}

export function formatPrice(price: number, currencySymbol = '₦'): string {
  return `${currencySymbol}${price.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
