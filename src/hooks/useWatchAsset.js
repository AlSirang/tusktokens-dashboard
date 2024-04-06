import toast from "react-hot-toast";
import { useWalletClient } from "wagmi";

export const useWatchAsset = () => {
  const { data: walletClient } = useWalletClient();

  const handleWatchAsset = async (options) => {
    try {
      if (!walletClient) return toast.error("Please connect wallet");
      if (!options) return;
      await walletClient.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options,
        },
      });
    } catch (err) {}
  };

  return { handleWatchAsset };
};
