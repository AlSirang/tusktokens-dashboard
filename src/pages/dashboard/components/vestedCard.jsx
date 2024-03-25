import { useCallback, useEffect, useState } from "react";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { formatEther } from "viem";
import { Button } from "@/src/components/button";
import { Card } from "@/src/components/card";
import { VESTING_ABI, VESTING_ADDRESS } from "@/src/lib/constants";
import { VestingTable } from "./vestingTable";
import toast from "react-hot-toast";

const vestingContract = {
  abi: VESTING_ABI,
  address: VESTING_ADDRESS,
};
export const VestedCard = () => {
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const { address } = useAccount();

  const [{ balanceOf, claimableBalance, vestingSchedules }, setState] =
    useState({
      balanceOf: 0,
      claimableBalance: 0,
      vestingSchedules: 0,
    });

  const getVestingInfo = useCallback(
    async (address) => {
      try {
        const results = await publicClient.multicall({
          contracts: [
            {
              ...vestingContract,
              functionName: "balanceOf",
              args: [address],
            },

            {
              ...vestingContract,
              functionName: "computeAllReleasableAmountForBeneficiary",
              args: [address],
            },
            {
              ...vestingContract,
              functionName: "getVestingSchedulesCountByBeneficiary",
              args: [address],
            },
          ],
        });

        const balanceOf = formatEther(
          results[0].status === "success" ? results[0].result : "0"
        );
        const claimableBalance = formatEther(
          results[0].status === "success" ? results[1].result : "0"
        );
        const vestingSchedules =
          results[0].status === "success" ? parseInt(results[2].result) : "0";

        setState({
          balanceOf,
          claimableBalance,
          vestingSchedules,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [publicClient]
  );

  useEffect(() => {
    address && getVestingInfo(address);
  }, [address, getVestingInfo]);

  const handleClaim = () => {
    const action = new Promise(async (resolve, reject) => {
      try {
        const txId = await writeContractAsync({
          abi: VESTING_ABI,
          address: VESTING_ADDRESS,
          functionName: "claimFromAllVestings",
        });

        await publicClient.waitForTransactionReceipt({
          hash: txId,
          confirmations: 2,
        });
        resolve(null);
      } catch (err) {
        reject(err?.shortMessage || err.message || "Something went wrong");
      }
    });

    toast.promise(action, {
      loading: "Transaction is in progress",
      success: "Successfully claimed TUSK",
      error: (error) => error,
    });
  };

  return (
    <section className="grid grid-cols-12 gap-5">
      <Card className="col-span-12 md:col-span-6">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <h2 className="text-white text-lg md:text-xl font-semibold">
              Vested TUSK (vTUSK)
            </h2>
            <p className="text-lg md:text-xl font-semibold">
              {parseInt(balanceOf).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <h2 className="text-white text-lg md:text-xl font-semibold">
              Vesting Schedules
            </h2>
            <p className="text-lg md:text-xl font-semibold">
              {vestingSchedules}
            </p>
          </div>
        </div>
      </Card>
      <Card className="col-span-12 md:col-span-6">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <h2 className="text-white text-lg md:text-xl font-semibold">
              Claimable vTUSK
            </h2>
            <p className="text-lg md:text-xl font-semibold">
              {parseInt(claimableBalance).toFixed(2)}
            </p>
          </div>

          <div>
            <Button
              className="max-w-44 py-2 rounded-full"
              disabled={parseInt(claimableBalance) === 0}
              onClick={handleClaim}
            >
              <span className="font-semibold normal-case">Claim vTUSK</span>
            </Button>
          </div>
        </div>
      </Card>

      {vestingSchedules > 0 && (
        <Card className="col-span-12">
          <VestingTable vestingCount={parseInt(vestingSchedules)} />
        </Card>
      )}
    </section>
  );
};
