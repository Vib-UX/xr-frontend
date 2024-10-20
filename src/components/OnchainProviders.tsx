'use client';
import { AIRDAO, MORPH_HOLESKY, SKALE_NEBULA_TESTNET } from '@/utils/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import {
  DynamicContextProvider
} from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { NEXT_PUBLIC_CDP_API_KEY } from '../config';
import { useWagmiConfig } from '../wagmi';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function OnchainProviders({ children }: Props) {
  const wagmiConfig = useWagmiConfig();

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "37350351-1ccf-45db-b660-7319f1ce68fd",
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: [
            {
              blockExplorerUrls: [SKALE_NEBULA_TESTNET.blockExplorers.default.url],
              chainId: SKALE_NEBULA_TESTNET.id,
              name: SKALE_NEBULA_TESTNET.name,
              iconUrls: ['/images/nebula.svg'],
              nativeCurrency: SKALE_NEBULA_TESTNET.nativeCurrency,
              rpcUrls: [SKALE_NEBULA_TESTNET.rpcUrls.default.http[0]],
              networkId: SKALE_NEBULA_TESTNET.id,
            },
            {
              blockExplorerUrls: [MORPH_HOLESKY.blockExplorers.default.url],
              chainId: MORPH_HOLESKY.id,
              name: MORPH_HOLESKY.name,
              iconUrls: ['/images/morph.svg'],
              nativeCurrency: MORPH_HOLESKY.nativeCurrency,
              rpcUrls: [MORPH_HOLESKY.rpcUrls.default.http[0]],
              networkId: MORPH_HOLESKY.id,
            },
            {
              blockExplorerUrls: [AIRDAO.blockExplorers.default.url],
              chainId: AIRDAO.id,
              name: AIRDAO.name,
              iconUrls: ['/images/airdao.svg'],
              nativeCurrency: AIRDAO.nativeCurrency,
              rpcUrls: [AIRDAO.rpcUrls.default.http[0]],
              networkId: AIRDAO.id,
            },
          ],
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider apiKey={NEXT_PUBLIC_CDP_API_KEY} chain={base}>
            <RainbowKitProvider modalSize="compact">
              <DynamicWagmiConnector>
                <SessionProvider>
                  {children}
                </SessionProvider>
              </DynamicWagmiConnector>
            </RainbowKitProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

export default OnchainProviders;
