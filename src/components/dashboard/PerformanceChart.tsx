
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';

interface ChartData {
  timestamp: string;
  value: number;
}

interface PerformanceChartProps {
  data: {
    daily: ChartData[];
    weekly: ChartData[];
    monthly: ChartData[];
  };
  className?: string;
}

export function PerformanceChart({ data, className }: PerformanceChartProps) {
  const [period, setPeriod] = React.useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const currentData = data[period];
  const latestValue = currentData[currentData.length - 1]?.value || 0;
  const firstValue = currentData[0]?.value || 0;
  const change = firstValue !== 0 
    ? ((latestValue - firstValue) / firstValue) * 100
    : 0;
  
  const isPositive = change >= 0;
  
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Portfolio Performance</CardTitle>
          <Tabs 
            value={period} 
            onValueChange={(v) => setPeriod(v as 'daily' | 'weekly' | 'monthly')}
            className="h-8"
          >
            <TabsList className="h-7">
              <TabsTrigger value="daily" className="text-xs h-6">24H</TabsTrigger>
              <TabsTrigger value="weekly" className="text-xs h-6">7D</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs h-6">30D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-end gap-2 mt-2">
          <div className="text-2xl font-mono font-medium">
            ${formatCurrency(latestValue)}
          </div>
          <div className={cn(
            "text-sm font-medium flex items-center",
            isPositive ? "text-success" : "text-danger"
          )}>
            {change.toFixed(2)}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={currentData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? "var(--success)" : "var(--danger)"} 
                    stopOpacity={0.4}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? "var(--success)" : "var(--danger)"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="timestamp" 
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                dy={10}
              />
              <YAxis 
                tickFormatter={(value) => `$${formatCurrency(value)}`}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip 
                formatter={(value: number) => [`$${formatCurrency(value)}`, 'Value']}
                labelFormatter={(label) => `Time: ${label}`}
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value"
                stroke={isPositive ? "var(--success)" : "var(--danger)"}
                fillOpacity={1}
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
