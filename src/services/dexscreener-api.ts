
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
  const response = await fetchWithErrorHandling<DexScreenerResponse>(url);
  return response.pairs;
}

export async function searchTokens(query: string): Promise<DexScreenerPair[]> {
  const url = `${API_ENDPOINTS.DEX_SCREENER.BASE_URL}${API_ENDPOINTS.DEX_SCREENER.SEARCH}?query=${query}`;
  const response = await fetchWithErrorHandling<DexScreenerResponse>(url);
  return response.pairs;
}
