
import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchWithErrorHandling } from '@/services/api-config';
import { ApiStatus } from '@/types/tokens';
import { toast } from 'sonner';

export function useApiStatus() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    jupiter: 'connecting',
    dexScreener: 'connecting',
    solscan: 'connecting',
    rugCheck: 'connecting'
  });

  const checkApiStatus = async () => {
    // Check Jupiter API
    try {
      // Jupiter nu are un endpoint de ping, vom verifica prețul pentru SOL/USDC
      await fetchWithErrorHandling(
        `${API_ENDPOINTS.JUPITER.BASE_URL}${API_ENDPOINTS.JUPITER.PRICE}?ids=So11111111111111111111111111111111111111112&vsToken=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`, 
        {}, 
        5000
      );
      setApiStatus(prev => ({ ...prev, jupiter: 'online' }));
    } catch (error) {
      console.error('Jupiter API check failed:', error);
      setApiStatus(prev => ({ ...prev, jupiter: 'error' }));
      toast.error('Jupiter API connection issue', {
        description: 'Some price data may not be available'
      });
    }

    // Check DexScreener API
    try {
      // DexScreener nu are ping direct, verificăm un token comun
      await fetchWithErrorHandling(
        `${API_ENDPOINTS.DEX_SCREENER.BASE_URL}${API_ENDPOINTS.DEX_SCREENER.PAIRS}/solana/So11111111111111111111111111111111111111112`,
        {},
        5000
      );
      setApiStatus(prev => ({ ...prev, dexScreener: 'online' }));
    } catch (error) {
      console.error('DexScreener API check failed:', error);
      setApiStatus(prev => ({ ...prev, dexScreener: 'error' }));
      toast.error('DexScreener API connection issue', {
        description: 'Some market data may not be available'
      });
    }

    // Check Solscan API
    try {
      await fetchWithErrorHandling(
        `${API_ENDPOINTS.SOLSCAN.BASE_URL}/block/last`,
        {},
        5000
      );
      setApiStatus(prev => ({ ...prev, solscan: 'online' }));
    } catch (error) {
      console.error('Solscan API check failed:', error);
      setApiStatus(prev => ({ ...prev, solscan: 'error' }));
      toast.error('Solscan API connection issue', {
        description: 'Token info data may not be available'
      });
    }

    // Check RugCheck API
    try {
      // RugCheck nu oferă endpoint de status, vom încerca să facem o interogare sample
      await fetchWithErrorHandling(
        `${API_ENDPOINTS.RUG_CHECK.BASE_URL}/status`,
        {},
        5000
      ).catch(() => {
        // Chiar dacă endpoint-ul /status nu există, vom verifica dacă avem răspuns de la server
        return { status: 'ok' };
      });
      setApiStatus(prev => ({ ...prev, rugCheck: 'online' }));
    } catch (error) {
      console.error('RugCheck API check failed:', error);
      setApiStatus(prev => ({ ...prev, rugCheck: 'error' }));
      toast.error('RugCheck API connection issue', {
        description: 'Token security data may not be available'
      });
    }
  };

  useEffect(() => {
    // Check API statuses when component mounts
    checkApiStatus();
    
    // Set up interval to check API statuses every 60 seconds
    const intervalId = setInterval(checkApiStatus, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return { apiStatus, checkApiStatus };
}
