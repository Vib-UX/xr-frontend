import { parseUnits } from "viem";
import {
  AIRDAO,
  FLOW_TESTNET,
  MORPH_HOLESKY,
  SKALE_NEBULA_TESTNET,
} from "./utils/chains";

export const FITNESS_ADDRESS_MAPPING = {
  [SKALE_NEBULA_TESTNET.id]: "0xa2D6c4e6E9E87Ecf7F0422Be7C278C287E197798",
  [AIRDAO.id]: "0xF99b791257ab50be7F235BC825E7d4B83942cf38",
  [MORPH_HOLESKY.id]: "0x04da57512F7861fdf16728b5fC26a7321a0E5Cdc",
  [FLOW_TESTNET.id]: "0xF99b791257ab50be7F235BC825E7d4B83942cf38",
};

export const MUSD_ADDRESS_MAPPING = {
  [SKALE_NEBULA_TESTNET.id]: "0x593126a49ACb15450CEc39EC271d25fA2e2cABd6",
  [AIRDAO.id]: "0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA",
  [MORPH_HOLESKY.id]: "0x306fB44CFB6Ac9A58EA9f0c64c7E5e500964cBEa",
  [FLOW_TESTNET.id]: "0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA",
};

export const AMOUNT_OF_USDC_TO_SEND = {
  [SKALE_NEBULA_TESTNET.id]: {
    native: parseUnits("0.01", 18),
    usdc: parseUnits("1", 6),
  },
  [AIRDAO.id]: {
    native: parseUnits("5", 18),
    usdc: parseUnits("5", 6),
  },
  [FLOW_TESTNET.id]: {
    native: parseUnits("1", 18),
    usdc: parseUnits("10", 6),
  },
  [MORPH_HOLESKY.id]: {
    native: parseUnits("5", 18),
    usdc: parseUnits("10", 6),
  },
};
