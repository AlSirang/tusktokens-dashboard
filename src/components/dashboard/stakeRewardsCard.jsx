import { useStakeContext } from "@/src/context/stakeContext";
import { Button } from "../button";
import { Card } from "../card";

export const StakeRewardsCard = () => {
  const { rewards, dueAfter } = useStakeContext();
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
              {new Date(dueAfter * 1000).toLocaleString()}
            </p>
          </div>
        </div>
        <div>
          <Button
            disabled={
              (parseInt(rewards) === 0) | (dueAfter * 1000 > Date.now())
            }
            className="max-w-44  py-1.5 px-4 h-auto text-lg font-semibold rounded-full"
          >
            <span className="font-semibold normal-case">Claim TUSK</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
