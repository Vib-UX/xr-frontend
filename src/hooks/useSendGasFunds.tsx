"use client";
import { AMOUNT_OF_USDC_TO_SEND, MUSD_ADDRESS_MAPPING } from "@/constants";
import useGlobalStore from "@/store";
import { MORPH_HOLESKY } from "@/utils/chains";
import { useQuery } from "@tanstack/react-query";
import Big from "big.js";
import toast from "react-hot-toast";
import { createWalletClient, erc20Abi, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useAccount, usePublicClient } from "wagmi";

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_SFUEL_PK as `0x${string}`
);

function useSendGasFunds() {
  const publicClient = usePublicClient();
  const { chain, address } = useAccount();
  const { morphBiconomyAccountAddress } = useGlobalStore();

  return useQuery({
    queryKey: [
      "send-gas-funds",
      chain?.id,
      !!publicClient,
      morphBiconomyAccountAddress,
    ],
    enabled: !!chain?.id && !!publicClient,
    queryFn: async () => {
      try {
        if (!publicClient || !address || !chain)
          throw new Error("Missing required data");
        if (chain.id === MORPH_HOLESKY.id && !morphBiconomyAccountAddress) {
          return {
            nativeAmount: "0",
            usdcAmount: "0",
          };
        }
        const walletAddress =
          chain.id === MORPH_HOLESKY.id ? morphBiconomyAccountAddress : address;

        const client = createWalletClient({
          account,
          chain,
          transport: http(),
        });

        const balance = await publicClient.getBalance({
          address: walletAddress as `0x${string}`,
        });

        const usdcBalance = await publicClient.readContract({
          abi: erc20Abi,
          address: MUSD_ADDRESS_MAPPING[
            chain.id as keyof typeof MUSD_ADDRESS_MAPPING
          ] as `0x${string}`,
          functionName: "balanceOf",
          args: [walletAddress as `0x${string}`],
        });

        const nativeAmount =
          AMOUNT_OF_USDC_TO_SEND[
            chain.id as keyof typeof AMOUNT_OF_USDC_TO_SEND
          ].native.toString();
        const usdcAmount =
          AMOUNT_OF_USDC_TO_SEND[
            chain.id as keyof typeof AMOUNT_OF_USDC_TO_SEND
          ].usdc.toString();
        if (
          Big(balance.toString()).eq(0) &&
          Big(usdcBalance.toString()).eq(0) &&
          chain.id !== MORPH_HOLESKY.id
        ) {
          const tx = await client.sendTransaction({
            to: walletAddress as `0x${string}`,
            value: BigInt(nativeAmount),
          });
          await publicClient.waitForTransactionReceipt({ hash: tx });
          const sendUsdcTx = await client.writeContract({
            abi: erc20Abi,
            address: MUSD_ADDRESS_MAPPING[
              chain.id as keyof typeof MUSD_ADDRESS_MAPPING
            ] as `0x${string}`,
            functionName: "transfer",
            args: [walletAddress as `0x${string}`, BigInt(usdcAmount)],
          });
          await publicClient.waitForTransactionReceipt({ hash: sendUsdcTx });
          return {
            nativeAmount: Big(nativeAmount)
              .div(10 ** 18)
              .toString(),
            usdcAmount: Big(usdcAmount)
              .div(10 ** 6)
              .toString(),
          };
        }
        if (Big(balance.toString()).eq(0) && chain.id !== MORPH_HOLESKY.id) {
          const tx = await client.sendTransaction({
            to: walletAddress as `0x${string}`,
            value: BigInt(nativeAmount),
            gasPrice: BigInt(100000000),
          });
          await publicClient.waitForTransactionReceipt({ hash: tx });
          return {
            nativeAmount: Big(nativeAmount)
              .div(10 ** 18)
              .toString(),
            usdcAmount: Big(usdcAmount)
              .div(10 ** 6)
              .toString(),
          };
        }
        if (Big(usdcBalance.toString()).eq(0)) {
          const sendUsdcTx = await client.writeContract({
            abi: erc20Abi,
            address: MUSD_ADDRESS_MAPPING[
              chain.id as keyof typeof MUSD_ADDRESS_MAPPING
            ] as `0x${string}`,
            functionName: "transfer",
            args: [walletAddress as `0x${string}`, BigInt(usdcAmount)],
          });
          await publicClient.waitForTransactionReceipt({ hash: sendUsdcTx });
        }
        toast.success("Funds sent successfully");
        return {
          nativeAmount: Big(nativeAmount)
            .div(10 ** 18)
            .toString(),
          usdcAmount: Big(usdcAmount)
            .div(10 ** 6)
            .toString(),
        };
      } catch (error) {
        console.error(error);
        toast.error("Failed to send funds");
        throw new Error("Failed to send funds");
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export default useSendGasFunds;
