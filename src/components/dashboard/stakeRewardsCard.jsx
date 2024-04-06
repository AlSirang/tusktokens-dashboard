import { useStakeContext } from "@/src/context/stakeContext";
import { Button } from "../button";
import { Card } from "../card";
import { AssetButton } from "../assetButton";
import { STAKING_ASSET_OPTIONS } from "@/src/lib/constants";
import { useWatchAsset } from "@/src/hooks/useWatchAsset";

export const StakeRewardsCard = () => {
  const { rewards, dueAfter } = useStakeContext();
  const { handleWatchAsset } = useWatchAsset();

  return (
    <Card className="h-full">
      <div className="flex flex-col justify-between h-full gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <h2 className="text-white text-lg md:text-xl font-semibold">
              Claimable Rewards
            </h2>
            <p className="text-lg md:text-xl font-semibold">{rewards} TUSK</p>
          </div>
          <div className="flex justify-between">
            <h2 className="text-white text-lg md:text-xl font-semibold">
              Due after
            </h2>
            <p className="text-lg md:text-xl font-semibold">
              {dueAfter > 0 ? new Date(dueAfter * 1000).toLocaleString() : "-"}
            </p>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-5">
          <Button
            disabled={
              (parseInt(rewards) === 0) | (dueAfter * 1000 > Date.now())
            }
            className="md:max-w-44 py-1.5 px-4 h-auto text-lg font-semibold rounded-full"
          >
            <span className="font-semibold normal-case">Claim sTUSK</span>
          </Button>

          <div className="flex justify-end w-full">
            <AssetButton
              onClick={() => {
                handleWatchAsset(STAKING_ASSET_OPTIONS);
              }}
            >
              Add sTUSK To Wallet
            </AssetButton>
          </div>
        </div>
      </div>
    </Card>
  );
};
