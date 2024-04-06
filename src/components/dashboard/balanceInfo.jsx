import { useWatchAsset } from "@/src/hooks/useWatchAsset";
import { AssetButton } from "../assetButton";
import { Card } from "../card";
import { useTuskBalanceContext } from "@/src/context/tuskBalanceContext";
import { TUSK_ASSET_OPTIONS } from "@/src/lib/constants";

export const BalanceInfo = () => {
  const { balanceOf } = useTuskBalanceContext();
  const { handleWatchAsset } = useWatchAsset();

  return (
    <Card className="relative">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Amount of TUSK Tokens
        </h2>
        <p className="mt-5 text-xl md:text-2xl font-semibold">{balanceOf}</p>
      </div>

      <div className="flex justify-end relative -bottom-5 mt-5">
        <AssetButton
          onClick={() => {
            handleWatchAsset(TUSK_ASSET_OPTIONS);
          }}
        >
          Add TUSK To Wallet
        </AssetButton>
      </div>
    </Card>
  );
};
