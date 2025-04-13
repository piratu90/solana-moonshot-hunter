
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StatusIndicator } from '@/components/dashboard/StatusIndicator';
import { CircleDollarSignIcon, PanelRightIcon } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  className?: string;
}

export function Header({ onToggleSidebar, className }: HeaderProps) {
  return (
    <header className={cn(
      "h-16 border-b border-border px-4 flex items-center justify-between bg-background z-10",
      className
    )}>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <PanelRightIcon size={18} />
        </Button>
        <div className="flex items-center gap-2">
          <CircleDollarSignIcon size={24} className="text-solana" />
          <h1 className="text-xl font-medium">SolanaShot</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <StatusIndicator status="online" label="Jupiter API" />
          <StatusIndicator status="online" label="Dexscreener API" />
          <StatusIndicator status="online" label="Solscan API" />
        </div>
        
        <Button size="sm" variant="secondary">
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}
