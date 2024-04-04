import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount, usePublicClient } from "wagmi";
import { ERC20_ABI, ERC20_ADDRESS } from "@/src/lib/constants";
import { formatEther } from "viem";

const TuskBalanceContext = createContext({
  balanceOf: 0,
  getTuskBalance: () => Promise.resolve(),
});

export const TuskBalanceContextProvider = ({ children }) => {
  const publicClient = usePublicClient();
  const { address } = useAccount();

  const [balanceOf, setBalanceOf] = useState(0);

  const getTuskBalance = useCallback(
    async (address) => {
      try {
        const result = await publicClient.readContract({
          abi: ERC20_ABI,
          address: ERC20_ADDRESS,
          functionName: "balanceOf",
          args: [address],
        });

        const balanceOf = formatEther(result);

        setBalanceOf(balanceOf);
      } catch (err) {
        console.log(err);
      }
    },
    [publicClient]
  );

  useEffect(() => {
    address && getTuskBalance(address);
  }, [address, getTuskBalance]);
  return (
    <TuskBalanceContext.Provider
      value={{
        balanceOf,
        getTuskBalance,
      }}
    >
      {children}
    </TuskBalanceContext.Provider>
  );
};

export const useTuskBalanceContext = () => useContext(TuskBalanceContext);
