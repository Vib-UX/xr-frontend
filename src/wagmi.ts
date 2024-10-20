"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useMemo } from "react";
import { createConfig, http } from "wagmi";
import { NEXT_PUBLIC_WC_PROJECT_ID } from "./config";
import { SUPPORTED_CHAINS } from "./utils/chains";

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? "";
  if (!projectId) {
    const providerErrMessage =
      "To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable";
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: "Recommended Wallet",
          wallets: [coinbaseWallet],
        },
        {
          groupName: "Other Wallets",
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: "onchainkit",
        projectId,
      }
    );

    const wagmiConfig = createConfig({
      chains: SUPPORTED_CHAINS,
      // turn off injected provider discovery
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        "22040": http(),
        "84532": http(),
        "2810": http(),
        "37084624": http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
