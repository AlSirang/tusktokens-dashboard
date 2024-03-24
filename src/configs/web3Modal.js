import { createWeb3Modal } from "@web3modal/wagmi/react";
import { bsc } from "viem/chains";
import { http, createConfig } from "wagmi";
import { walletConnect, injected } from "wagmi/connectors";
//  Get projectId
const projectId = "3828bedc82f5ba0e923c413da3250b1a";

// Create wagmiConfig
const metadata = {
  name: "Tusk Tokens",
  description: "Tusk Tokens Dashboard",
  url: "https://canary-lend.vercel.app",
};

export const chains = [bsc];

export const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    [chains[0].id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
});
// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
  themeVariables: {
    "--w3m-border-radius-master": "0.085rem",
  },
});
