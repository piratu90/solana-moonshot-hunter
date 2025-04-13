
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CircleDollarSignIcon, LayoutDashboardIcon, Settings2Icon, BarChart3Icon, HistoryIcon, ShieldAlertIcon, SearchIcon } from 'lucide-react';
import { StatusIndicator } from '@/components/dashboard/StatusIndicator';
import { useApiStatus } from '@/hooks/use-api-status';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const NavItem = ({ 
  children, 
  isActive = false,
  ...props 
}: React.ComponentProps<typeof Button> & { isActive?: boolean }) => {
  return (
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start gap-3",
        isActive && "bg-accent/10 text-accent"
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export function Sidebar({ isOpen, onClose, className }: SidebarProps) {
  const { apiStatus } = useApiStatus();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        className
      )}>
        <div className="p-4 flex items-center gap-2">
          <CircleDollarSignIcon size={24} className="text-solana" />
          <h1 className="text-xl font-medium">SolanaShot</h1>
        </div>
        
        <Separator />
        
        <div className="p-2">
          <p className="text-xs text-muted-foreground mb-2 px-2">NAVIGATION</p>
          
          <NavItem isActive>
            <LayoutDashboardIcon size={18} />
            Dashboard
          </NavItem>
          
          <NavItem>
            <SearchIcon size={18} />
            Token Scanner
          </NavItem>
          
          <NavItem>
            <BarChart3Icon size={18} />
            Analytics
          </NavItem>
          
          <NavItem>
            <HistoryIcon size={18} />
            Trade History
          </NavItem>
          
          <NavItem>
            <ShieldAlertIcon size={18} />
            Risk Management
          </NavItem>
          
          <NavItem>
            <Settings2Icon size={18} />
            Settings
          </NavItem>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Separator className="mb-4" />
          <div className="space-y-2">
            <StatusIndicator status={apiStatus.jupiter} label="Jupiter API" />
            <StatusIndicator status={apiStatus.dexScreener} label="Dexscreener API" />
            <StatusIndicator status={apiStatus.solscan} label="Solscan API" />
            <StatusIndicator status={apiStatus.rugCheck} label="RugCheck API" />
          </div>
        </div>
      </aside>
    </>
  );
}
