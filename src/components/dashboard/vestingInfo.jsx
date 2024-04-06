import { useCallback, useEffect, useState } from "react";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { formatEther } from "viem";
import { Button } from "../button";
import { Card } from "../card";
import {
  VESTING_ABI,
  VESTING_ADDRESS,
  VESTING_ASSET_OPTIONS,
} from "@/src/lib/constants";
import { VestingTable } from "./vestingTable";
import toast from "react-hot-toast";
import { AssetButton } from "../assetButton";
import { useWatchAsset } from "@/src/hooks/useWatchAsset";

const vestingContract = {
  abi: VESTING_ABI,
  address: VESTING_ADDRESS,
};
export const VestingInfo = () => {
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { handleWatchAsset } = useWatchAsset();

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
    <>
      <Card>
        <div className="flex flex-wrap lg:flex-nowrap gap-10">
          <div className=" basis-full lg:basis-1/2">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <h2 className="text-white text-lg lg:text-xl font-semibold">
                  Vested TUSK
                </h2>
                <p className="text-lg lg:text-xl font-semibold">
                  {parseInt(balanceOf).toFixed(2)} vTUSK
                </p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-white text-lg lg:text-xl font-semibold">
                  Vesting Schedules
                </h2>
                <p className="text-lg lg:text-xl font-semibold">
                  {vestingSchedules}
                </p>
              </div>
            </div>
          </div>
          <div className="basis-full lg:basis-1/2">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <h2 className="text-white text-lg lg:text-xl font-semibold">
                  Claimable vTUSK
                </h2>
                <p className="text-lg lg:text-xl font-semibold">
                  {parseInt(claimableBalance).toFixed(2)}
                </p>
              </div>

              <div>
                <Button
                  className="md:max-w-44 py-2 rounded-full"
                  disabled={parseInt(claimableBalance) === 0}
                  onClick={handleClaim}
                >
                  <span className="font-semibold normal-case">Claim vTUSK</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end relative -bottom-5">
          <AssetButton
            onClick={() => {
              handleWatchAsset(VESTING_ASSET_OPTIONS);
            }}
          >
            Add vTUSK To Wallet
          </AssetButton>
        </div>
      </Card>

      {vestingSchedules > 0 && (
        <Card className="w-full">
          <VestingTable vestingCount={parseInt(vestingSchedules)} />
        </Card>
      )}
    </>
  );
};
