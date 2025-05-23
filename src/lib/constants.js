import ERC20_ABI from "@/src/assets/abis/ERC20.json";
import VESTING_ABI from "@/src/assets/abis/vestingABI.json";
import STAKING_ABI from "@/src/assets/abis/stakingABI.json";

const VESTING_ADDRESS = "0xcac70e96865ecb2a96dc2fc41f6a457e96cf40df";
const ERC20_ADDRESS = "0x5aecCb66a800e94E78f054e6258Ff7AfAe8b7957";
const STAKING_ADDRESS = "0x71b5C617cfc1273079dFC52af2d440a292B41069";

export {
  ERC20_ABI,
  STAKING_ABI,
  VESTING_ABI,
  ERC20_ADDRESS,
  STAKING_ADDRESS,
  VESTING_ADDRESS,
};

export const VESTING_ASSET_OPTIONS = {
  address: VESTING_ADDRESS,
  symbol: "vTUSK",
  decimals: 18,
};

export const TUSK_ASSET_OPTIONS = {
  address: ERC20_ADDRESS,
  symbol: "TUSK",
  decimals: 18,
};
export const STAKING_ASSET_OPTIONS = {
  address: STAKING_ADDRESS,
  symbol: "sTUSK",
  decimals: 18,
};
