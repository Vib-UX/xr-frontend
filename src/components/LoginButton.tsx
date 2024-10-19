'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-sm"
      text="Connect Wallet"
      withWalletAggregator={true}
    />
  );
}
