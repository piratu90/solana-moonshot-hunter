
// API Endpoints
export const API_ENDPOINTS = {
  JUPITER: {
    BASE_URL: 'https://price.jup.ag/v4',
    PRICE: '/price',
    QUOTE: '/quote'
  },
  DEX_SCREENER: {
    BASE_URL: 'https://api.dexscreener.com/latest',
    PAIRS: '/dex/pairs/solana',
    SEARCH: '/dex/search'
  },
  SOLSCAN: {
    BASE_URL: 'https://public-api.solscan.io',
    TOKEN: '/token',
    ACCOUNT: '/account'
  },
  RUG_CHECK: {
    BASE_URL: 'https://api.rugcheck.xyz/v1',
    SCAN: '/scan/solana',
    REPORT: '/report/solana'
  }
};

// API Key config
export const API_KEYS = {
  // Solscan necesită API key pentru rate limit mai mare
  SOLSCAN: import.meta.env.VITE_SOLSCAN_API_KEY || '',
  // RugCheck este un serviciu care poate necesita API key în viitor
  RUG_CHECK: import.meta.env.VITE_RUGCHECK_API_KEY || ''
};

// Error handling
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Utility for making API requests with error handling
export async function fetchWithErrorHandling<T>(
  url: string, 
  options?: RequestInit,
  timeout = 10000 // 10 secunde timeout implicit
): Promise<T> {
  // Creăm un controller pentru a permite timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const fetchOptions = {
      ...options,
      signal: controller.signal,
    };
    
    const response = await fetch(url, fetchOptions);
    
    // Anulăm timeout-ul dacă request-ul s-a încheiat cu succes
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      throw new ApiError(`API request failed: ${response.statusText}. Details: ${errorText}`, response.status);
    }
    
    return await response.json() as T;
  } catch (error) {
    // Anulăm timeout-ul dacă apare o eroare
    clearTimeout(timeoutId);
    
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    } else {
      console.error('API Error:', error);
      throw new ApiError(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
    }
  }
}

// Funcție helper pentru a adăuga API key la headere unde este necesar
export function getAuthHeaders(apiType: 'SOLSCAN' | 'RUG_CHECK'): HeadersInit {
  const headers: HeadersInit = {
    'accept': 'application/json'
  };
  
  const apiKey = API_KEYS[apiType];
  if (apiKey) {
    if (apiType === 'SOLSCAN') {
      headers['x-api-key'] = apiKey;
    } else if (apiType === 'RUG_CHECK') {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
  }
  
  return headers;
}
