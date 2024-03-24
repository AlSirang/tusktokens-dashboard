import { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

// Components
import { Button } from "../button";
import { shortenAddress } from "@/src/lib/address";
import { activeChain } from "@/src/configs/chainConfig";
import { switchNetwork } from "@/src/lib/utils";

export const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected, chain } = useAccount();
  const { data: walletProvider } = useWalletClient();

  const [{ isCorrectChain }, setState] = useState({
    isCorrectChain: true,
  });

  // useEffect(() => {
  //   if (isConnected)
  //     setState({
  //       isCorrectChain: chain?.id === Number(activeChain.chainId),
  //     });
  // }, [chain, isConnected]);

  const onChainChanged = async () => {
    try {
      await switchNetwork(walletProvider, activeChain);
    } catch (err) {}
  };

  return (
    <>
      {isCorrectChain && (
        <Button
          type="button"
          onClick={() => open()}
          className="w-full py-1.5 px-4 h-auto text-lg font-semibold"
        >
          {shortenAddress(address) || (
            <span className="capitalize">Connect Wallet</span>
          )}
        </Button>
      )}

      {!isCorrectChain && (
        <Button
          type="button"
          onClick={onChainChanged}
          className="w-full text-sm bg-red-600 text-white"
        >
          <span className="capitalize">Wrong Network</span>
        </Button>
      )}
    </>
  );
};
