import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { Button } from "../button";

export const DisconnectButton = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  if (!isConnected) return null;

  return (
    <Button
      variant="secondary"
      onClick={() => open()}
      className="w-full py-1.5 px-4 h-auto text-lg font-semibold rounded-full"
    >
      <span className="capitalize">Disconnect</span>
    </Button>
  );
};
