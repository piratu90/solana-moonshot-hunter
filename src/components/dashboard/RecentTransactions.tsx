
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2Icon, AlertCircleIcon, RotateCwIcon } from 'lucide-react';
import { formatCurrency, formatTime } from '@/lib/formatters';
import { Separator } from '@/components/ui/separator';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  status: 'completed' | 'failed' | 'pending';
  tokenSymbol: string;
  tokenName: string;
  amount: number;
  price: number;
  timestamp: string;
  txHash?: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  className?: string;
}

export function RecentTransactions({ transactions, className }: RecentTransactionsProps) {
  const statusIcons = {
    completed: <CheckCircle2Icon size={14} className="text-success" />,
    failed: <AlertCircleIcon size={14} className="text-danger" />,
    pending: <RotateCwIcon size={14} className="text-warning animate-spin" />,
  };
  
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div key={tx.id} className="px-6 py-2 hover:bg-secondary/10 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant={tx.type === 'buy' ? 'default' : 'outline'}>
                      {tx.type === 'buy' ? 'BUY' : 'SELL'}
                    </Badge>
                    <div className="text-sm font-medium">{tx.tokenSymbol}</div>
                    <div className="text-xs text-muted-foreground hidden sm:inline-block">
                      {tx.tokenName}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {statusIcons[tx.status]}
                    <span className="text-xs capitalize">{tx.status}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <div>
                    Amount: <span className="font-mono">{tx.amount} SOL</span> @ 
                    <span className="font-mono"> ${formatCurrency(tx.price)}</span>
                  </div>
                  <div>{formatTime(tx.timestamp)}</div>
                </div>
                
                {tx.txHash && (
                  <div className="mt-1 text-xs">
                    <a 
                      href={`https://solscan.io/tx/${tx.txHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:underline truncate inline-block max-w-[200px]"
                    >
                      {tx.txHash.slice(0, 8)}...{tx.txHash.slice(-8)}
                    </a>
                  </div>
                )}
                <Separator className="mt-2" />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No transactions yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
