
import { API_ENDPOINTS, fetchWithErrorHandling } from './api-config';

export interface JupiterPriceResponse {
  data: {
    [tokenMint: string]: {
      id: string;
      mintSymbol: string;
      vsToken: string;
      vsTokenSymbol: string;
      price: number;
    }
  }
}

export interface JupiterQuoteResponse {
  data: {
    inputMint: string;
    outputMint: string;
    amount: string;
    otherAmountThreshold: string;
    swapMode: string;
    slippageBps: number;
    routes: Array<{
      inAmount: string;
      outAmount: string;
      amount: string;
      otherAmountThreshold: string;
      swapMode: string;
      priceImpactPct: number;
      marketInfos: Array<{
        id: string;
        label: string;
        inputMint: string;
        outputMint: string;
        inAmount: string;
        outAmount: string;
        lpFee: {
          amount: string;
          mint: string;
          pct: number;
        }
      }>
    }>
  }
}

export async function getTokenPrice(tokenMint: string, vsToken = 'USDC'): Promise<number> {
  const url = `${API_ENDPOINTS.JUPITER.BASE_URL}${API_ENDPOINTS.JUPITER.PRICE}?ids=${tokenMint}&vsToken=${vsToken}`;
  const response = await fetchWithErrorHandling<JupiterPriceResponse>(url);
  
  if (!response.data[tokenMint]) {
    throw new Error(`No price data found for token: ${tokenMint}`);
  }
  
  return response.data[tokenMint].price;
}

export async function getSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: string,
  slippageBps = 50
): Promise<JupiterQuoteResponse> {
  const url = `${API_ENDPOINTS.JUPITER.BASE_URL}${API_ENDPOINTS.JUPITER.QUOTE}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;
  return await fetchWithErrorHandling<JupiterQuoteResponse>(url);
}
