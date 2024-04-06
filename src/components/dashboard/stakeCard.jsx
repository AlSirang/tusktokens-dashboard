import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { useTuskBalanceContext } from "@/src/context/tuskBalanceContext";
import toast from "react-hot-toast";
import { Button } from "../button";
import { Card } from "../card";
import { StakedTuskInfo } from "./stakedTuskInfo";
import {
  ERC20_ABI,
  ERC20_ADDRESS,
  STAKING_ABI,
  STAKING_ADDRESS,
} from "@/src/lib/constants";
import { useStakeContext } from "@/src/context/stakeContext";
import { parseEther } from "viem";

export const StakeCard = () => {
  const publicClient = usePublicClient();
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { getTuskBalance } = useTuskBalanceContext();
  const { getStakeInfo } = useStakeContext();

  const handleStake = (event) => {
    event.preventDefault();

    if (!isConnected) return toast.error("Please connect wallet");

    const form = new FormData(event.target);
    const amount = form.get("amount");
    if (!amount) return toast.error("Please enter a valid amount");
    const amountInWei = parseEther(amount.toString());
    const actionPromise = new Promise(async (resolve, reject) => {
      try {
        const allowance = await publicClient.readContract({
          abi: ERC20_ABI,
          address: ERC20_ADDRESS,
          functionName: "allowance",
          args: [address, STAKING_ADDRESS],
        });

        if (allowance < amountInWei) {
          const txId = await writeContractAsync({
            abi: ERC20_ABI,
            address: ERC20_ADDRESS,
            functionName: "approve",
            args: [STAKING_ADDRESS, amountInWei],
          });
          await publicClient.waitForTransactionReceipt({
            hash: txId,
            confirmations: 2,
          });
        }

        const txId = await writeContractAsync({
          abi: STAKING_ABI,
          address: STAKING_ADDRESS,
          functionName: "stakeTokens",
          args: [amountInWei],
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
      success: "Staked tokens successfully",
      error: (err) => err,
    });
  };
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-white text-lg lg:text-xl font-semibold">
            Duration for Rewards
          </h2>
          <p className="text-lg lg:text-xl font-semibold">30 Days</p>
        </div>
        <div className="flex justify-between">
          <h2 className="text-white text-lg lg:text-xl font-semibold">
            Staked TUSK
          </h2>
          <StakedTuskInfo />
        </div>

        <form onSubmit={handleStake} className="flex flex-col gap-5">
          <div className="flex justify-between flex-wrap gap-1.5 w-full">
            <label className="text-lg lg:text-xl text-white font-semibold">
              TUSK to Stake
            </label>
            <input
              autoComplete="off"
              type="number"
              name="amount"
              placeholder="Enter amount"
              className="text-base lg:text-lg basis-full py-1.5 px-2 rounded-md text-black border-2 border-transparent focus:border-yellow-200 outline-0 focus:outline-0"
            />
          </div>

          <div className="flex gap-5">
            <Button
              type="submit"
              className="md:basis-1/2  py-1.5 px-4 h-auto text-lg font-semibold rounded-full md:max-w-52"
            >
              <span className="font-semibold normal-case">Stake</span>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
