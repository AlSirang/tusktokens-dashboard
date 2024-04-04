import { useCallback, useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { Card } from "../card";
import { ERC20_ABI, ERC20_ADDRESS } from "@/src/lib/constants";
import { formatEther } from "viem";

export const BalanceInfo = () => {
  const publicClient = usePublicClient();
  const { address } = useAccount();

  const [balanceOf, setBalanceOf] = useState(0);

  const getBalance = useCallback(
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
    address && getBalance(address);
  }, [address, getBalance]);
  return (
    <Card>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Amount of TUSK Tokens
        </h2>
        <p className="mt-5 text-xl md:text-2xl font-semibold">{balanceOf}</p>
      </div>
    </Card>
  );
};
