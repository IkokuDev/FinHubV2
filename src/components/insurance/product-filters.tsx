import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeartPulse, Car, User, List } from "lucide-react";

interface ProductFiltersProps {
  activeFilter: 'all' | 'health' | 'auto' | 'life';
  onFilterChange: (filter: 'all' | 'health' | 'auto' | 'life') => void;
}

const filters = [
  { value: 'all', label: 'All', icon: List },
  { value: 'health', label: 'Health', icon: HeartPulse },
  { value: 'auto', label: 'Auto', icon: Car },
  { value: 'life', label: 'Life', icon: User },
] as const;

export default function ProductFilters({ activeFilter, onFilterChange }: ProductFiltersProps) {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className="transition-all"
        >
          <filter.icon className="mr-2 h-4 w-4" />
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
