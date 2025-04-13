
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
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new ApiError(`API request failed: ${response.statusText}`, response.status);
    }
    
    return await response.json() as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
    }
  }
}
