
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SolanaWalletProvider } from './providers/WalletProvider.tsx'

createRoot(document.getElementById("root")!).render(
  <SolanaWalletProvider>
    <App />
  </SolanaWalletProvider>
);
