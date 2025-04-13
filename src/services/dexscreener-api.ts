
import { API_ENDPOINTS, fetchWithErrorHandling } from './api-config';

export interface DexScreenerToken {
  name?: string;
  symbol?: string;
  address: string;
  decimals?: number;
}

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: DexScreenerToken;
  quoteToken: DexScreenerToken;
  priceNative: string;
  priceUsd?: string;
  txns: {
    m5: {
      buys: number;
      sells: number;
    };
    h1: {
      buys: number;
      sells: number;
    };
    h6: {
      buys: number;
      sells: number;
    };
    h24: {
      buys: number;
      sells: number;
    };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  liquidity?: {
    usd?: number;
    base?: number;
    quote?: number;
  };
  fdv?: number;
  marketCap?: number;
}

export interface DexScreenerResponse {
  pairs: DexScreenerPair[];
  schemaVersion: string;
}

export async function getTokenPairs(tokenAddress: string): Promise<DexScreenerPair[]> {
  const url = `${API_ENDPOINTS.DEX_SCREENER.BASE_URL}${API_ENDPOINTS.DEX_SCREENER.PAIRS}/solana/${tokenAddress}`;
  
  try {
    // DexScreener are limită de rate la 300 cereri pe minut, așa că implementăm un timeout mai mare
    const response = await fetchWithErrorHandling<DexScreenerResponse>(url, {
      cache: 'no-cache' // Mereu date actualizate
    }, 15000);
    
    return response.pairs;
  } catch (error) {
    console.error('DexScreener pairs error:', error);
    throw error;
  }
}

export async function searchTokens(query: string): Promise<DexScreenerPair[]> {
  const url = `${API_ENDPOINTS.DEX_SCREENER.BASE_URL}${API_ENDPOINTS.DEX_SCREENER.SEARCH}?query=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetchWithErrorHandling<DexScreenerResponse>(url, {
      cache: 'no-cache'
    }, 15000);
    
    return response.pairs;
  } catch (error) {
    console.error('DexScreener search error:', error);
    throw error;
  }
}

// Adăugăm o nouă funcție pentru a obține tendințele
export async function getTrendingTokens(): Promise<DexScreenerPair[]> {
  // DexScreener nu are un endpoint direct pentru trending, așa că vom folosi o abordare alternativă
  // Vom căuta top tokens bazate pe volume sau market cap
  const url = `${API_ENDPOINTS.DEX_SCREENER.BASE_URL}${API_ENDPOINTS.DEX_SCREENER.PAIRS}/solana/trending`;
  
  try {
    const response = await fetchWithErrorHandling<DexScreenerResponse>(url, {
      cache: 'no-cache'
    }, 15000);
    
    return response.pairs.slice(0, 20); // Limităm la primele 20 pentru performanță
  } catch (error) {
    console.error('DexScreener trending error:', error);
    // În caz de eroare, returnăm un array gol
    return [];
  }
}
