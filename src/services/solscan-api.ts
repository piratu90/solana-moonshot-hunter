
import { API_ENDPOINTS, fetchWithErrorHandling } from './api-config';

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
    headers: {
      'accept': 'application/json'
    }
  };
  
  return await fetchWithErrorHandling<SolscanTokenResponse>(url, options);
}

export async function getTokenHolders(tokenAddress: string, limit = 10): Promise<SolscanTokenHolderResponse> {
  const url = `${API_ENDPOINTS.SOLSCAN.BASE_URL}${API_ENDPOINTS.SOLSCAN.TOKEN}/holders/${tokenAddress}?limit=${limit}`;
  
  const options: RequestInit = {
    headers: {
      'accept': 'application/json'
    }
  };
  
  return await fetchWithErrorHandling<SolscanTokenHolderResponse>(url, options);
}

export async function getTokenMetadata(tokenAddress: string): Promise<SolscanTokenMetadataResponse> {
  const url = `${API_ENDPOINTS.SOLSCAN.BASE_URL}${API_ENDPOINTS.SOLSCAN.TOKEN}/meta/${tokenAddress}`;
  
  const options: RequestInit = {
    headers: {
      'accept': 'application/json'
    }
  };
  
  return await fetchWithErrorHandling<SolscanTokenMetadataResponse>(url, options);
}
