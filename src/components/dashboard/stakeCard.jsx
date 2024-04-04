import { Button } from "../button";
import { Card } from "../card";
import { StakedTuskInfo } from "./stakedTuskInfo";

export const StakeCard = () => {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Duration for Rewards
          </h2>
          <p className="text-lg md:text-xl font-semibold">30 Days</p>
        </div>
        <div className="flex justify-between">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Staked TUSK
          </h2>
          <StakedTuskInfo />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between flex-wrap gap-2 w-full">
            <label className="text-base font-semibold">TUSK to Stake</label>
            <input
              placeholder="Enter amount"
              className="text-base lg:text-lg basis-full py-1.5 px-2 rounded-md text-black border-2 border-transparent focus:border-yellow-200 outline-0 focus:outline-0"
            />
          </div>

          <div className="flex gap-5">
            <Button className="basis-1/2  py-1.5 px-4 h-auto text-lg font-semibold rounded-full">
              <span className="font-semibold normal-case">Stake</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
