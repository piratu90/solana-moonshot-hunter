
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon, StopCircleIcon, TrendingUpIcon } from 'lucide-react';
import { Token } from '@/types/tokens';
import { formatCurrency, formatNumber } from '@/lib/formatters';

interface TokenRowProps {
  token: Token;
  onBuy?: (token: Token) => void;
  onSell?: (token: Token) => void;
  className?: string;
}

export function TokenRow({ token, onBuy, onSell, className }: TokenRowProps) {
  const isPriceUp = token.priceChange24h >= 0;
  
  return (
    <div className={cn(
      "grid grid-cols-12 gap-2 p-3 border-b border-border hover:bg-secondary/20 transition-colors items-center text-sm",
      className
    )}>
      <div className="col-span-4 md:col-span-3 flex items-center gap-2">
        {token.logo ? (
          <img src={token.logo} alt={token.name} className="w-6 h-6 rounded-full" />
        ) : (
          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
            {token.symbol.charAt(0)}
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-medium">{token.symbol}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">{token.name}</span>
        </div>
      </div>
      <div className="col-span-2 font-mono">${formatCurrency(token.price)}</div>
      <div className={cn(
        "col-span-2 font-mono flex items-center gap-1",
        isPriceUp ? "text-success" : "text-danger"
      )}>
        {isPriceUp ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
        {Math.abs(token.priceChange24h)}%
      </div>
      <div className="col-span-2 md:col-span-2 font-mono">${formatCurrency(token.marketCap)}</div>
      <div className="hidden md:block md:col-span-1 font-mono">${formatCurrency(token.liquidity)}</div>
      <div className="col-span-2 flex items-center gap-1 justify-end">
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={() => onBuy?.(token)} 
          className="h-7 text-xs"
        >
          Buy
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onSell?.(token)} 
          className="h-7 text-xs"
        >
          Sell
        </Button>
      </div>
    </div>
  );
}
