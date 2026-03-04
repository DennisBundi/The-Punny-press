type Variant = 'default' | 'success' | 'warning' | 'danger';

const variantStyles: Record<Variant, string> = {
  default: 'bg-warm-gray text-charcoal',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-gold-light text-gold-dark',
  danger: 'bg-red-100 text-red-800',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
