import type { LucideIcon } from 'lucide-react';
import Card from '@/components/ui/Card';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export default function StatsCard({ icon: Icon, label, value }: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gold-light">
          <Icon className="h-6 w-6 text-gold-dark" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-charcoal">{value}</p>
        </div>
      </div>
    </Card>
  );
}
