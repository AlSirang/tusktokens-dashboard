import { Button } from "@/src/components/button";
import { Card } from "@/src/components/card";

export const StakeCard = () => {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Duration for Rewards
          </h2>
          <p className="text-lg md:text-xl font-semibold">{0}</p>
        </div>
        <div className="flex justify-between">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Staked TUSK (sTUSK)
          </h2>
          <p className="text-lg md:text-xl font-semibold">{0}</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between flex-wrap gap-2 w-full">
            <label className="text-base font-semibold">
              TUSK to Stake/Unstake
            </label>
            <input
              placeholder="Enter amount"
              className="text-base lg:text-lg basis-full py-1.5 px-2 rounded-md text-black border-2 border-transparent focus:border-yellow-200 outline-0 focus:outline-0"
            />
          </div>

          <div className="flex gap-5">
            <Button className="basis-1/2  py-1.5 px-4 h-auto text-lg font-semibold rounded-full">
              <span className="font-semibold normal-case">Stake</span>
            </Button>
            <Button
              variant="secondary"
              className="basis-1/2  py-1.5 px-4 h-auto text-lg font-semibold rounded-full"
            >
              <span className="font-semibold normal-case">Unstake</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
