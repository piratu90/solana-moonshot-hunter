
import { API_ENDPOINTS, fetchWithErrorHandling } from './api-config';

export interface RugCheckResult {
  token_id: string;
  token_mint: string;  
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  risk_factors: Array<{
    name: string;
    description: string;
    severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  }>;
  token_data: {
    name: string;
    symbol: string;
    decimals: number;
    total_supply: string;
  };
  analysis_date: string;
}

export interface RugCheckResponse {
  success: boolean;
  result: RugCheckResult;
}

export async function scanToken(tokenAddress: string): Promise<RugCheckResult> {
  const url = `${API_ENDPOINTS.RUG_CHECK.BASE_URL}${API_ENDPOINTS.RUG_CHECK.SCAN}/${tokenAddress}`;
  
  const options: RequestInit = {
    headers: {
      'accept': 'application/json'
    }
  };
  
  const response = await fetchWithErrorHandling<RugCheckResponse>(url, options);
  
  if (!response.success) {
    throw new Error('RugCheck scan failed');
  }
  
  return response.result;
}

export async function reportToken(
  tokenAddress: string, 
  reporterAddress: string, 
  description: string
): Promise<{success: boolean}> {
  const url = `${API_ENDPOINTS.RUG_CHECK.BASE_URL}${API_ENDPOINTS.RUG_CHECK.REPORT}/${tokenAddress}`;
  
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      reporter_address: reporterAddress,
      description: description
    })
  };
  
  return await fetchWithErrorHandling<{success: boolean}>(url, options);
}
