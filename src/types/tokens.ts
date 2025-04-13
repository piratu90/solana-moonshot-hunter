
export interface Token {
  id: string;
  name: string;
  symbol: string;
  logo?: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  liquidity: number;
  launchDate?: string;
  isScam?: boolean;
  isPumping?: boolean;
}

export interface ApiStatus {
  jupiter: 'online' | 'offline' | 'connecting' | 'error';
  dexScreener: 'online' | 'offline' | 'connecting' | 'error';
  solscan: 'online' | 'offline' | 'connecting' | 'error';
  rugCheck: 'online' | 'offline' | 'connecting' | 'error';
}

export interface TradeSettings {
  minMarketCap: number;
  minLiquidity: number;
  buyAmount: number;
  takeProfitPercent: number;
  stopLossPercent: number;
  maxRetries: number;
  botEnabled: boolean;
}
