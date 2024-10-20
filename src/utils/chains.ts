import { defineChain } from "viem";
import { flowTestnet, morphHolesky, skaleNebulaTestnet } from "wagmi/chains";
export const airdao = defineChain({
  id: 22040,
  name: "AirDAO Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "AirDAO",
    symbol: "AMB",
  },
  rpcUrls: {
    default: {
      http: ["https://network.ambrosus-test.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet.airdao.io/explorer" },
  },
});

export const SKALE_NEBULA_TESTNET = skaleNebulaTestnet;
export const MORPH_HOLESKY = morphHolesky;
export const AIRDAO = airdao;
export const FLOW_TESTNET = flowTestnet;

export const SUPPORTED_CHAINS = [
  AIRDAO,
  MORPH_HOLESKY,
  SKALE_NEBULA_TESTNET,
  FLOW_TESTNET,
] as const;
