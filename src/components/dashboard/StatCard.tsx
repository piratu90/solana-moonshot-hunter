
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  className,
  prefix = '',
  suffix = ''
}: StatCardProps) {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-center justify-between">
        <div className="stat-title">{title}</div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="stat-value">
        {prefix}{value}{suffix}
      </div>
      {typeof change !== 'undefined' && (
        <div className={cn(
          "stat-change", 
          change >= 0 ? "text-success" : "text-danger"
        )}>
          {change >= 0 ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />}
          <span>{Math.abs(change)}%</span>
        </div>
      )}
    </div>
  );
}
