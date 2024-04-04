import { Card } from "../card";
import { useTuskBalanceContext } from "@/src/context/tuskBalanceContext";

export const BalanceInfo = () => {
  const { balanceOf } = useTuskBalanceContext();

  return (
    <Card>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Amount of TUSK Tokens
        </h2>
        <p className="mt-5 text-xl md:text-2xl font-semibold">{balanceOf}</p>
      </div>
    </Card>
  );
};
