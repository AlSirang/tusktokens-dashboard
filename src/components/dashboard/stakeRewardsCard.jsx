import { Button } from "../button";
import { Card } from "../card";
import { useState } from "react";

export const StakeRewardsCard = () => {
  const [{ rewards, dueAfter }, setState] = useState({
    rewards: "-",
    dueAfter: "-",
  });
  return (
    <Card className="">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Claimable Rewards (TUSK)
          </h2>
          <p className="text-lg md:text-xl font-semibold">{rewards}</p>
        </div>
        <div className="flex justify-between">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Due after
          </h2>
          <p className="text-lg md:text-xl font-semibold">{dueAfter}</p>
        </div>
        <div>
          <Button className="max-w-44  py-1.5 px-4 h-auto text-lg font-semibold rounded-full">
            <span className="font-semibold normal-case">Claim TUSK</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
