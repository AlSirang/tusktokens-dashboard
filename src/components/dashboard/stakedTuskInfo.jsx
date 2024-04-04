import toast from "react-hot-toast";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { useStakeContext } from "@/src/context/stakeContext";
import { useTuskBalanceContext } from "@/src/context/tuskBalanceContext";
import { Button } from "../button";
import { STAKING_ABI, STAKING_ADDRESS } from "@/src/lib/constants";

export const StakedTuskInfo = () => {
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { getTuskBalance } = useTuskBalanceContext();
  const { balanceOf, getStakeInfo } = useStakeContext();

  const handleUnstake = () => {
    const actionPromise = new Promise(async (resolve, reject) => {
      try {
        const txId = await writeContractAsync({
          abi: STAKING_ABI,
          address: STAKING_ADDRESS,
          functionName: "unstakeTokens",
        });

        await publicClient.waitForTransactionReceipt({
          hash: txId,
          confirmations: 2,
        });
        getStakeInfo(address);
        getTuskBalance(address);
        resolve(null);
      } catch (error) {
        reject(error?.shortMessage || error.message || "Something went wrong");
      }
    });

    toast.promise(actionPromise, {
      loading: "Please accept transaction and wait...",
      success: "Unstaked tokens successfully",
      error: (err) => err,
    });
  };

  return (
    <div className="flex gap-3 flex-col justify-end">
      <p className="text-lg md:text-xl font-semibold text-right">
        {balanceOf} sTUSK
      </p>

      <Button
        disabled={parseInt(balanceOf) === 0}
        onClick={handleUnstake}
        variant="secondary"
        className="basis-1/2  py-1.5 px-4 h-auto rounded-full"
      >
        <span className="font-semibold text-sm normal-case">Unstake</span>
      </Button>
    </div>
  );
};
