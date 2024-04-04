import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAccount, usePublicClient } from "wagmi";
import { STAKING_ABI, STAKING_ADDRESS } from "../lib/constants";
import { formatEther } from "viem";

const StakeContext = createContext({
  getStakeInfo: () => Promise.resolve(),
  balanceOf: 0,
  rewards: 0,
  dueAfter: "-",
});

const stakingContract = {
  abi: STAKING_ABI,
  address: STAKING_ADDRESS,
};
export const StakeContextProvider = ({ children }) => {
  const publicClient = usePublicClient();
  const { address } = useAccount();

  const [state, setState] = useState({
    balanceOf: 0,
    rewards: 0,
    dueAfter: "-",
  });

  const getStakeInfo = useCallback(
    async (address) => {
      try {
        const results = await publicClient.multicall({
          contracts: [
            {
              ...stakingContract,
              functionName: "balanceOf",
              args: [address],
            },

            {
              ...stakingContract,
              functionName: "viewClaimableRewardsAndReleaseTime",
              args: [address],
            },
          ],
        });

        const balanceOf = formatEther(
          results[0].status === "success" ? results[0].result : "0"
        );

        const rewards = formatEther(
          results[0].status === "success" ? results[1].result[0] : "0"
        );
        const dueAfter =
          results[0].status === "success"
            ? parseInt(results[1].result[1])
            : "-";

        setState({
          balanceOf,
          rewards,
          dueAfter,
        });
      } catch (err) {}
    },
    [publicClient]
  );

  useEffect(() => {
    address && getStakeInfo(address);
  }, [address, getStakeInfo]);

  return (
    <StakeContext.Provider
      value={{
        ...state,
        getStakeInfo,
      }}
    >
      {children}
    </StakeContext.Provider>
  );
};

export const useStakeContext = () => useContext(StakeContext);
