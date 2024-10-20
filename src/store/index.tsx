import { StaticImageData } from 'next/image';
import { create } from 'zustand';

interface GlobalStore {}

const useGlobalStore = create<GlobalStore>()((set) => ({}));

export default useGlobalStore;
