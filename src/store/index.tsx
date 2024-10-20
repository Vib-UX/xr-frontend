
import { BiconomySmartAccountV2 } from '@biconomy/account';
import { create } from 'zustand';

interface GlobalStore {
    morphBiconomyAccount: BiconomySmartAccountV2 | null
    morphBiconomyAccountAddress: string | null
    setMorphBiconomyAccount: (account: BiconomySmartAccountV2 | null) => void
    setMorphBiconomyAccountAddress: (address: string | null) => void
}

const useGlobalStore = create<GlobalStore>()((set) => ({
    morphBiconomyAccount: null,
    morphBiconomyAccountAddress: null,
    setMorphBiconomyAccount: (account: BiconomySmartAccountV2 | null) => set({ morphBiconomyAccount: account }),
    setMorphBiconomyAccountAddress: (address: string | null) => set({ morphBiconomyAccountAddress: address }),
}));

export default useGlobalStore;
