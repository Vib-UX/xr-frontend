'use client';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className="ockConnectWallet_Container min-w-[90px] w-full bg-blue-600 hover:bg-blue-700 !text-white !rounded-lg"
      text="Connect Wallet"
      withWalletAggregator={true}
    />
  );
}
