
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type StatusType = 'online' | 'offline' | 'connecting' | 'error';

interface StatusIndicatorProps {
  status: StatusType;
  label: string;
  className?: string;
}

const statusClasses = {
  online: 'bg-success',
  offline: 'bg-muted',
  connecting: 'bg-warning animate-pulse-slow',
  error: 'bg-danger'
};

const statusLabels = {
  online: 'Online',
  offline: 'Offline',
  connecting: 'Connecting',
  error: 'Error'
};

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-2", className)}>
            <div className={cn("w-2 h-2 rounded-full", statusClasses[status])} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}: {statusLabels[status]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
