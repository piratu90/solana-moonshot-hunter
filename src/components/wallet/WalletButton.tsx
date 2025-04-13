
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { WalletIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WalletButton() {
  const { wallet, publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toBase58();
      const truncatedAddress = address.slice(0, 4) + '...' + address.slice(-4);
      setWalletAddress(truncatedAddress);
    } else {
      setWalletAddress(null);
    }
  }, [publicKey]);

  const handleClick = () => {
    if (!wallet) {
      setVisible(true);
    } else if (publicKey) {
      disconnect();
    }
  };

  return (
    <Button 
      size="sm" 
      variant={publicKey ? "outline" : "secondary"}
      onClick={handleClick}
      disabled={connecting}
      className="flex items-center gap-2"
    >
      <WalletIcon size={16} />
      {connecting ? 'Connecting...' : walletAddress || 'Connect Wallet'}
    </Button>
  );
}
