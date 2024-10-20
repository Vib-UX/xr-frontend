import { createSmartAccountClient, Paymaster } from "@biconomy/account";

import { WalletClient } from "viem";

export const createSmartAccount = async (walletClient: WalletClient) => {
  const paymaster = new Paymaster({
    paymasterUrl:
      "https://paymaster.biconomy.io/api/v1/2810/DS-wEbVvs.54923a20-d8fe-47e7-9cff-94133e4a9716",
  });
  return await createSmartAccountClient({
    signer: walletClient,
    chainId: 2810, // Replace this with your target network
    bundlerUrl:
      "https://bundler.biconomy.io/api/v2/2810/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    paymaster: paymaster,
    biconomyPaymasterApiKey: "DS-wEbVvs.54923a20-d8fe-47e7-9cff-94133e4a9716",
  });
};
