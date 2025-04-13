import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { TokenListHeader } from '@/components/dashboard/TokenListHeader';
import { TokenRow } from '@/components/dashboard/TokenRow';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { TradingParameters } from '@/components/dashboard/TradingParameters';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { mockTokens, mockTransactions, mockPerformanceData, defaultTradingSettings } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Token } from '@/types/tokens';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleDollarSignIcon, Wallet, TrendingUpIcon, Activity, ShieldIcon } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tokens, setTokens] = useState<Token[]>(mockTokens);
  const [sortField, setSortField] = useState<string>('priceChange24h');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [tradingSettings, setTradingSettings] = useState(defaultTradingSettings);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }

    const sortedTokens = [...tokens].sort((a, b) => {
      const aValue = a[field as keyof Token];
      const bValue = b[field as keyof Token];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    setTokens(sortedTokens);
  };

  const handleBuy = (token: Token) => {
    toast.success(`Buying ${token.symbol}`, {
      description: `Buying 0.01 SOL of ${token.symbol} at $${token.price.toFixed(8)}`
    });
  };

  const handleSell = (token: Token) => {
    toast.info(`Selling ${token.symbol}`, {
      description: `Selling all holdings of ${token.symbol}`
    });
  };

  const handleSettingsSave = () => {
    toast.success('Settings saved', {
      description: 'Your trading parameters have been updated'
    });
  };

  const totalTokens = tokens.length;
  const pumpingTokens = tokens.filter(t => t.isPumping).length;
  const potentialScams = tokens.filter(t => t.isScam).length;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className={`flex-1 p-4 md:p-6 md:ml-64 transition-all duration-300`}>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Portfolio Balance" 
                value={152.48}
                change={12.3}
                prefix="$"
                icon={<CircleDollarSignIcon size={18} />}
              />
              <StatCard 
                title="Current Tokens" 
                value={totalTokens} 
                icon={<Wallet size={18} />}
              />
              <StatCard 
                title="Pumping Tokens" 
                value={pumpingTokens} 
                change={15.8}
                icon={<TrendingUpIcon size={18} />}
              />
              <StatCard 
                title="Flagged as Risky" 
                value={potentialScams} 
                icon={<ShieldIcon size={18} />}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <PerformanceChart data={mockPerformanceData} className="lg:col-span-2" />
            <TradingParameters 
              values={tradingSettings}
              onValuesChange={(newValues) => setTradingSettings({...tradingSettings, ...newValues})}
              onSaveSettings={handleSettingsSave}
            />
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Token Scanner</h2>
            
            <Tabs defaultValue="all" className="mb-2">
              <TabsList>
                <TabsTrigger value="all">All Tokens</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">New Listings</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="bg-card rounded-md border border-border">
              <TokenListHeader 
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              
              {tokens.map((token) => (
                <TokenRow 
                  key={token.id} 
                  token={token} 
                  onBuy={handleBuy} 
                  onSell={handleSell}
                />
              ))}
            </div>
          </div>
          
          <div>
            <RecentTransactions transactions={mockTransactions} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
