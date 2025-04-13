
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface TradingParamsProps {
  values: {
    minMarketCap: number;
    minLiquidity: number;
    buyAmount: number;
    takeProfitPercent: number;
    stopLossPercent: number;
    maxRetries: number;
    botEnabled: boolean;
  };
  onValuesChange: (newValues: Partial<TradingParamsProps['values']>) => void;
  onSaveSettings: () => void;
  className?: string;
}

export function TradingParameters({ 
  values, 
  onValuesChange, 
  onSaveSettings,
  className 
}: TradingParamsProps) {
  const handleChange = (field: string, value: number | boolean) => {
    onValuesChange({ [field]: value });
  };
  
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trading Parameters</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="bot-status" className="text-sm cursor-pointer">Bot {values.botEnabled ? 'Running' : 'Paused'}</Label>
            <Switch 
              id="bot-status" 
              checked={values.botEnabled}
              onCheckedChange={(checked) => handleChange('botEnabled', checked)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Token Filtering</h3>
            
            <div className="space-y-2">
              <Label htmlFor="min-market-cap">Min Market Cap ($)</Label>
              <Input
                id="min-market-cap"
                type="number"
                value={values.minMarketCap}
                onChange={(e) => handleChange('minMarketCap', Number(e.target.value))}
                className="font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="min-liquidity">Min Liquidity ($)</Label>
              <Input
                id="min-liquidity"
                type="number"
                value={values.minLiquidity}
                onChange={(e) => handleChange('minLiquidity', Number(e.target.value))}
                className="font-mono"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Trading Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="buy-amount">Buy Amount (SOL)</Label>
              <Input
                id="buy-amount"
                type="number"
                step="0.01"
                value={values.buyAmount}
                onChange={(e) => handleChange('buyAmount', Number(e.target.value))}
                className="font-mono"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="take-profit">Take Profit (%)</Label>
                <Input
                  id="take-profit"
                  type="number"
                  value={values.takeProfitPercent}
                  onChange={(e) => handleChange('takeProfitPercent', Number(e.target.value))}
                  className="font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                <Input
                  id="stop-loss"
                  type="number"
                  value={values.stopLossPercent}
                  onChange={(e) => handleChange('stopLossPercent', Number(e.target.value))}
                  className="font-mono"
                />
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-end">
          <Button onClick={onSaveSettings}>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
