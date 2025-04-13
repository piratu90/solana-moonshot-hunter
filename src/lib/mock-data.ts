
import { Token } from '@/types/tokens';

export const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Solana Doge',
    symbol: 'SODOG',
    logo: 'https://picsum.photos/seed/sodog/200',
    price: 0.00021,
    priceChange24h: 124.5,
    marketCap: 8500000,
    liquidity: 450000,
    isPumping: true,
  },
  {
    id: '2',
    name: 'Moon Frog',
    symbol: 'FROG',
    logo: 'https://picsum.photos/seed/moonfrog/200',
    price: 0.000043,
    priceChange24h: 78.2,
    marketCap: 3200000,
    liquidity: 220000,
    isPumping: true,
  },
  {
    id: '3',
    name: 'Solana Shib',
    symbol: 'SOSHIB',
    logo: 'https://picsum.photos/seed/soshib/200',
    price: 0.00000152,
    priceChange24h: 45.8,
    marketCap: 1500000,
    liquidity: 180000,
  },
  {
    id: '4',
    name: 'Bonk Coin',
    symbol: 'BONK',
    logo: 'https://picsum.photos/seed/bonk/200',
    price: 0.00000293,
    priceChange24h: 12.4,
    marketCap: 125000000,
    liquidity: 7800000,
  },
  {
    id: '5',
    name: 'Rocket Token',
    symbol: 'RCKT',
    logo: 'https://picsum.photos/seed/rocket/200',
    price: 0.00082,
    priceChange24h: -5.3,
    marketCap: 4200000,
    liquidity: 350000,
  },
  {
    id: '6',
    name: 'Pepe Sol',
    symbol: 'PEPES',
    logo: 'https://picsum.photos/seed/pepesol/200',
    price: 0.0000076,
    priceChange24h: -12.8,
    marketCap: 980000,
    liquidity: 75000,
  },
  {
    id: '7',
    name: 'Cato Finance',
    symbol: 'CATO',
    price: 0.000146,
    priceChange24h: 32.7,
    marketCap: 2700000,
    liquidity: 190000,
  },
];

export const mockTransactions = [
  {
    id: 't1',
    type: 'buy' as const,
    status: 'completed' as const,
    tokenSymbol: 'SODOG',
    tokenName: 'Solana Doge',
    amount: 0.01,
    price: 0.00019,
    timestamp: '2023-04-12T14:32:45.000Z',
    txHash: '5VJtGnGPhNMH9rkXmuEog93UJnJptcGQhVq9wKTCxPRS',
  },
  {
    id: 't2',
    type: 'sell' as const,
    status: 'completed' as const,
    tokenSymbol: 'FROG',
    tokenName: 'Moon Frog',
    amount: 0.01,
    price: 0.000048,
    timestamp: '2023-04-12T12:18:22.000Z',
    txHash: '3sYfnED7LrbxQFH6vCT58xEwvay7gRgmBoErKEcFFxqh',
  },
  {
    id: 't3',
    type: 'buy' as const,
    status: 'failed' as const,
    tokenSymbol: 'SOSHIB',
    tokenName: 'Solana Shib',
    amount: 0.01,
    price: 0.00000142,
    timestamp: '2023-04-12T10:45:12.000Z',
  },
  {
    id: 't4',
    type: 'buy' as const,
    status: 'pending' as const,
    tokenSymbol: 'CATO',
    tokenName: 'Cato Finance',
    amount: 0.01,
    price: 0.000138,
    timestamp: '2023-04-12T09:23:05.000Z',
  },
];

export const mockPerformanceData = {
  daily: Array(24).fill(0).map((_, i) => {
    const now = new Date();
    now.setHours(now.getHours() - 23 + i);
    
    // Start with 100, add some random fluctuation
    const baseValue = 100;
    const randomFluctuation = (Math.random() - 0.3) * 5; // Bias towards growth
    const growthFactor = 1 + (i / 50); // Gradual growth
    
    return {
      timestamp: now.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }),
      value: baseValue * growthFactor + randomFluctuation,
    };
  }),
  
  weekly: Array(7).fill(0).map((_, i) => {
    const now = new Date();
    now.setDate(now.getDate() - 6 + i);
    
    const baseValue = 95;
    const randomFluctuation = (Math.random() - 0.3) * 10;
    const growthFactor = 1 + (i / 20);
    
    return {
      timestamp: now.toLocaleDateString('en-US', { weekday: 'short' }),
      value: baseValue * growthFactor + randomFluctuation,
    };
  }),
  
  monthly: Array(30).fill(0).map((_, i) => {
    const now = new Date();
    now.setDate(now.getDate() - 29 + i);
    
    const baseValue = 80;
    const randomFluctuation = (Math.random() - 0.2) * 15;
    const growthFactor = 1 + (i / 15);
    
    return {
      timestamp: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: baseValue * growthFactor + randomFluctuation,
    };
  }),
};

export const defaultTradingSettings = {
  minMarketCap: 10000,
  minLiquidity: 10000,
  buyAmount: 0.01,
  takeProfitPercent: 50,
  stopLossPercent: 20,
  maxRetries: 3,
  botEnabled: false,
};
