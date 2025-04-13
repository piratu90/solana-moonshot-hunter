
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTokenData, useTokenHolders } from '@/hooks/use-token-data';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Shield, Users, DollarSign, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber } from '@/lib/formatters';

interface TokenDetailsProps {
  tokenAddress: string;
  className?: string;
}

export function TokenDetails({ tokenAddress, className }: TokenDetailsProps) {
  const { tokenData, isLoading, error } = useTokenData(tokenAddress);
  const holders = useTokenHolders(tokenAddress);
  
  if (isLoading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  if (error || !tokenData) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="text-danger flex items-center gap-2">
            <AlertCircle size={16} />
            Error Loading Token
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'Failed to load token details'}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {tokenData.logo ? (
            <img src={tokenData.logo} alt={tokenData.name} className="w-6 h-6 rounded-full" />
          ) : (
            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              {tokenData.symbol?.charAt(0)}
            </div>
          )}
          {tokenData.name} ({tokenData.symbol})
          
          {tokenData.isScam && (
            <Badge variant="destructive" className="ml-2">High Risk</Badge>
          )}
          
          {tokenData.isPumping && (
            <Badge variant="default" className="bg-success ml-2">Pumping</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Price</span>
            <div className="flex items-center gap-1">
              <DollarSign size={14} />
              <span className="font-mono">${formatCurrency(tokenData.price || 0)}</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">24h Change</span>
            <div className={cn(
              "flex items-center gap-1",
              (tokenData.priceChange24h || 0) >= 0 ? "text-success" : "text-danger"
            )}>
              <LineChart size={14} />
              <span className="font-mono">{tokenData.priceChange24h?.toFixed(2)}%</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Market Cap</span>
            <span className="font-mono">${formatCurrency(tokenData.marketCap || 0)}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Liquidity</span>
            <span className="font-mono">${formatCurrency(tokenData.liquidity || 0)}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Holders</span>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span className="font-mono">
                {holders.data?.total ? formatNumber(holders.data.total) : 'Unknown'}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Security</span>
            <div className="flex items-center gap-1">
              <Shield size={14} />
              <span className={cn(
                tokenData.isScam ? "text-danger" : "text-success"
              )}>
                {tokenData.isScam ? 'Risky' : 'Safe'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
