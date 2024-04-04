import { Button } from "../button";

export const StakedTuskInfo = () => {
  const handleUnstake = () => {
    const actionPromise = new Promise((resolve, reject) => {});
  };

  return (
    <div className="flex gap-3 flex-col justify-end">
      <p className="text-lg md:text-xl font-semibold text-right">{0} sTUSK</p>

      <Button
        onClick={handleUnstake}
        variant="secondary"
        className="basis-1/2  py-1.5 px-4 h-auto rounded-full"
      >
        <span className="font-semibold text-sm normal-case">Unstake</span>
      </Button>
    </div>
  );
};
