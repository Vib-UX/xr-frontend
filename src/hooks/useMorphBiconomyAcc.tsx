import { createSmartAccount } from '@/constant/biconomy'
import useGlobalStore from '@/store'
import { MORPH_HOLESKY } from '@/utils/chains'
import { BiconomySmartAccountV2 } from '@biconomy/account'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
interface MorphBiconomyAccountResult {
    smartAccount: BiconomySmartAccountV2 | null
    error: Error | null
}

function useMorphBiconomyAccount(): MorphBiconomyAccountResult {
    const { primaryWallet } = useDynamicContext()
    const { address, chainId } = useAccount()
    const { setMorphBiconomyAccount, setMorphBiconomyAccountAddress } = useGlobalStore()

    const { data: smartAccount, error } = useQuery<BiconomySmartAccountV2 | null, Error>({
        queryKey: ['morphBiconomyAccount', primaryWallet?.address, chainId],
        queryFn: async (): Promise<BiconomySmartAccountV2 | null> => {
            if (!primaryWallet) return null
            if (!primaryWallet.connector.isEmbeddedWallet) {
                throw new Error('No embedded wallet selected')
            }
            if (!isEthereumWallet(primaryWallet)) {
                throw new Error('This wallet is not an Ethereum wallet')
            }
            const walletClient = await primaryWallet.getWalletClient()
            if (!walletClient) throw new Error('Failed to get wallet client')
            const chainId = await walletClient.getChainId()
            if (chainId !== MORPH_HOLESKY.id) {
                throw new Error('This wallet is not on Morph Holesky')
            }
            const biconomyClient = await createSmartAccount(walletClient)
            const address = await biconomyClient.getAccountAddress()
            setMorphBiconomyAccountAddress(address)
            setMorphBiconomyAccount(biconomyClient)
            return biconomyClient
        },
        enabled: !!primaryWallet && !!address && !!chainId && chainId === MORPH_HOLESKY.id,
    });

    return { smartAccount: smartAccount ?? null, error: error ?? null };
}

export default useMorphBiconomyAccount