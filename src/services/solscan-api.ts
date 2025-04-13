
import { API_ENDPOINTS, fetchWithErrorHandling, getAuthHeaders } from './api-config';

export interface SolscanTokenResponse {
  symbol: string;
  name: string;
  icon: string;
  decimals: number;
  tokenAuthority: string;
  supply: string;
  type: string;
}

export interface SolscanTokenHolderResponse {
  data: Array<{
    address: string;
    amount: number;
    decimals: number;
    owner: string;
    rank: number;
  }>;
  total: number;
}

export interface SolscanTokenMetadataResponse {
  metaplex: {
    metadataUri: string;
    updateAuthority: string;
    sellerFeeBasisPoints: number;
    primarySaleHappened: boolean;
    tokenStandard: string;
    creators: Array<{
      address: string;
      share: number;
      verified: boolean;
    }>;
    collection?: {
      address: string;
      verified: boolean;
    };
  };
}

export async function getTokenInfo(tokenAddress: string): Promise<SolscanTokenResponse> {
  const url = `${API_ENDPOINTS.SOLSCAN.BASE_URL}${API_ENDPOINTS.SOLSCAN.TOKEN}/${tokenAddress}`;
  
  const options: RequestInit = {
    headers: getAuthHeaders('SOLSCAN'),
    cache: 'no-cache' // Pentru asigurarea unor date actualizate
  };
  
  try {
    return await fetchWithErrorHandling<SolscanTokenResponse>(url, options);
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw error;
  }
}

export async function getTokenHolders(tokenAddress: string, limit = 10): Promise<SolscanTokenHolderResponse> {
  const url = `${API_ENDPOINTS.SOLSCAN.BASE_URL}${API_ENDPOINTS.SOLSCAN.TOKEN}/holders/${tokenAddress}?limit=${limit}`;
  
  const options: RequestInit = {
    headers: getAuthHeaders('SOLSCAN'),
    cache: 'no-cache'
  };
  
  try {
    return await fetchWithErrorHandling<SolscanTokenHolderResponse>(url, options);
  } catch (error) {
    console.error('Error fetching token holders:', error);
    throw error;
  }
}

export async function getTokenMetadata(tokenAddress: string): Promise<SolscanTokenMetadataResponse> {
  const url = `${API_ENDPOINTS.SOLSCAN.BASE_URL}${API_ENDPOINTS.SOLSCAN.TOKEN}/meta/${tokenAddress}`;
  
  const options: RequestInit = {
    headers: getAuthHeaders('SOLSCAN'),
    cache: 'no-cache'
  };
  
  try {
    return await fetchWithErrorHandling<SolscanTokenMetadataResponse>(url, options);
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    throw error;
  }
}
