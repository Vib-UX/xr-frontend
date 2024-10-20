"use client";
import { useMemo } from "react";
import { createConfig, http } from "wagmi";
import Web3AuthConnectorInstance from "./components/web3auth/Web3AuthInstance";
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
    const wagmiConfig = createConfig({
      chains: SUPPORTED_CHAINS,
      // turn off injected provider discovery
      multiInjectedProviderDiscovery: false,
      connectors: [Web3AuthConnectorInstance()],
      ssr: true,
      transports: {
        "22040": http(),
        "545": http(),
        "2810": http(),
        "37084624": http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
