
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/services/api-config';
import { ApiStatus } from '@/types/tokens';

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
      const jupiterResponse = await fetch(`${API_ENDPOINTS.JUPITER.BASE_URL}/ping`);
      setApiStatus(prev => ({ ...prev, jupiter: jupiterResponse.ok ? 'online' : 'error' }));
    } catch (error) {
      setApiStatus(prev => ({ ...prev, jupiter: 'offline' }));
    }

    // Check DexScreener API
    try {
      const dexScreenerResponse = await fetch(`${API_ENDPOINTS.DEX_SCREENER.BASE_URL}/ping`);
      setApiStatus(prev => ({ ...prev, dexScreener: dexScreenerResponse.ok ? 'online' : 'error' }));
    } catch (error) {
      setApiStatus(prev => ({ ...prev, dexScreener: 'offline' }));
    }

    // Check Solscan API
    try {
      const solscanResponse = await fetch(`${API_ENDPOINTS.SOLSCAN.BASE_URL}/block/last`);
      setApiStatus(prev => ({ ...prev, solscan: solscanResponse.ok ? 'online' : 'error' }));
    } catch (error) {
      setApiStatus(prev => ({ ...prev, solscan: 'offline' }));
    }

    // Check RugCheck API
    try {
      const rugCheckResponse = await fetch(`${API_ENDPOINTS.RUG_CHECK.BASE_URL}/status`);
      setApiStatus(prev => ({ ...prev, rugCheck: rugCheckResponse.ok ? 'online' : 'error' }));
    } catch (error) {
      setApiStatus(prev => ({ ...prev, rugCheck: 'offline' }));
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
