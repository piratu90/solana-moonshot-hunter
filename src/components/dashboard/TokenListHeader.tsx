
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface TokenListHeaderProps {
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  className?: string;
}

export function TokenListHeader({ 
  sortField, 
  sortDirection, 
  onSort, 
  className 
}: TokenListHeaderProps) {
  const SortIcon = sortDirection === 'asc' ? ArrowUpIcon : ArrowDownIcon;
  
  const renderSortIcon = (field: string) => {
    if (sortField === field) {
      return <SortIcon size={14} className="ml-1" />;
    }
    return null;
  };

  const renderSortableHeader = (field: string, label: string, colSpan: number) => (
    <div 
      className={cn(
        `col-span-${colSpan} flex items-center cursor-pointer hover:text-accent transition-colors`,
        sortField === field && 'text-accent'
      )} 
      onClick={() => onSort(field)}
    >
      {label}
      {renderSortIcon(field)}
    </div>
  );

  return (
    <div className={cn(
      "grid grid-cols-12 gap-2 p-3 border-b border-border bg-card text-xs font-medium text-muted-foreground uppercase",
      className
    )}>
      {renderSortableHeader('name', 'Token', 4)}
      {renderSortableHeader('price', 'Price', 2)}
      {renderSortableHeader('priceChange24h', '24h %', 2)}
      {renderSortableHeader('marketCap', 'Market Cap', 2)}
      <div className="hidden md:block md:col-span-1">Liquidity</div>
      <div className="col-span-2 text-right">Actions</div>
    </div>
  );
}
