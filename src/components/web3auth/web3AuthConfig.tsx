import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions } from "@web3auth/modal";
import { Web3AuthContextConfig } from "@web3auth/modal-react-hooks";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { skaleNebulaTestnet } from "wagmi/chains";


export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x" + skaleNebulaTestnet.id.toString(16),
  rpcTarget: skaleNebulaTestnet.rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
  displayName: skaleNebulaTestnet.name,
  tickerName: skaleNebulaTestnet.nativeCurrency?.name,
  ticker: skaleNebulaTestnet.nativeCurrency?.symbol,
  blockExplorerUrl: skaleNebulaTestnet.blockExplorers?.default.url[0] as string,
};

export const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
});

export const APP_NAME = "Onlytease";

export const web3AuthOptions: Web3AuthOptions = {
  clientId: "BFW3wcM203ReRzwb2nnd4bu4vUTtwPOZ7zsjkd62YkniA5DOtjJAXzchQGT_lvcJswnlp18k__tWqAPs76mGNAI",
  chainConfig,
  privateKeyProvider,
  uiConfig: {
    appName: APP_NAME,
    loginMethodsOrder: ["google"],
    defaultLanguage: "en",
    modalZIndex: "2147483647",
    logoLight: "https://web3auth.io/images/web3authlog.png",
    logoDark: "https://web3auth.io/images/web3authlogodark.png",
    uxMode: "redirect",
    mode: "light",
  },
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  enableLogging: true,
  // useCoreKitKey: true,
};

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "optional",
  },
  adapterSettings: {
    uxMode: "redirect", // "redirect" | "popup"
    whiteLabel: {
      logoLight: "https://web3auth.io/images/web3authlog.png",
      logoDark: "https://web3auth.io/images/web3authlogodark.png",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
      mode: "dark", // whether to enable dark, light or auto mode. defaultValue: auto [ system theme]
    },
    mfaSettings: {
      deviceShareFactor: {
        enable: true,
        priority: 1,
        mandatory: true,
      },
      backUpShareFactor: {
        enable: true,
        priority: 2,
        mandatory: false,
      },
      socialBackupFactor: {
        enable: true,
        priority: 3,
        mandatory: false,
      },
      passwordFactor: {
        enable: true,
        priority: 4,
        mandatory: true,
      },
    },
  },
});

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: { whiteLabel: { showWidgetButton: true } },
});


export const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [openloginAdapter],
  plugins: [walletServicesPlugin],
};
