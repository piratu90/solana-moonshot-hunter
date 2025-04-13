import { useQuery } from '@tanstack/react-query';
import { getTokenPrice } from '@/services/jupiter-api';
import { getTokenPairs } from '@/services/dexscreener-api';
import { getTokenInfo, getTokenHolders } from '@/services/solscan-api';
import { scanToken } from '@/services/rugcheck-api';
import { Token } from '@/types/tokens';
import { toast } from 'sonner';

export function useTokenInfo(tokenAddress: string) {
  return useQuery({
    queryKey: ['tokenInfo', tokenAddress],
    queryFn: () => getTokenInfo(tokenAddress),
    enabled: !!tokenAddress,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to load token info', {
          description: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  });
}

export function useTokenPrice(tokenAddress: string) {
  return useQuery({
    queryKey: ['tokenPrice', tokenAddress],
    queryFn: () => getTokenPrice(tokenAddress),
    enabled: !!tokenAddress,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to load token price', {
          description: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  });
}

export function useTokenPairs(tokenAddress: string) {
  return useQuery({
    queryKey: ['tokenPairs', tokenAddress],
    queryFn: () => getTokenPairs(tokenAddress),
    enabled: !!tokenAddress,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to load token pairs', {
          description: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  });
}

export function useTokenHolders(tokenAddress: string) {
  return useQuery({
    queryKey: ['tokenHolders', tokenAddress],
    queryFn: () => getTokenHolders(tokenAddress),
    enabled: !!tokenAddress,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to load token holders', {
          description: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  });
}

export function useRugCheck(tokenAddress: string) {
  return useQuery({
    queryKey: ['rugCheck', tokenAddress],
    queryFn: () => scanToken(tokenAddress),
    enabled: !!tokenAddress,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to perform rug check', {
          description: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  });
}

export function useTokenData(tokenAddress: string) {
  const tokenInfo = useTokenInfo(tokenAddress);
  const tokenPrice = useTokenPrice(tokenAddress);
  const tokenPairs = useTokenPairs(tokenAddress);
  const rugCheck = useRugCheck(tokenAddress);
  
  const isLoading = 
    tokenInfo.isLoading || 
    tokenPrice.isLoading || 
    tokenPairs.isLoading || 
    rugCheck.isLoading;
  
  const error = 
    tokenInfo.error || 
    tokenPrice.error || 
    tokenPairs.isError || 
    rugCheck.error;
  
  let tokenData: Partial<Token> | null = null;
  
  if (!isLoading && !error && tokenInfo.data && tokenPairs.data?.[0] && tokenPrice.data) {
    const pair = tokenPairs.data[0];
    
    tokenData = {
      id: tokenAddress,
      name: tokenInfo.data.name,
      symbol: tokenInfo.data.symbol,
      logo: tokenInfo.data.icon,
      price: tokenPrice.data,
      priceChange24h: pair.priceChange.h24 || 0,
      marketCap: pair.marketCap || pair.fdv || 0,
      liquidity: pair.liquidity?.usd || 0,
      launchDate: new Date().toISOString(), // This would come from another source
      isScam: rugCheck.data?.risk_level === 'high' || rugCheck.data?.risk_level === 'critical',
      isPumping: (pair.priceChange.h24 || 0) > 5
    };
  }
  
  return {
    tokenData,
    isLoading,
    error
  };
}
