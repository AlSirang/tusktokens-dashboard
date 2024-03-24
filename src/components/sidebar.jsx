import { ConnectButton } from "./connectButton";
import { DisconnectButton } from "./disconnectButton";
import { LogoImage } from "./logoImage";

export default function Sidebar() {
  return (
    <aside className="max-w-xs w-full hidden lg:block bg-dark-200">
      <div className="container py-12 px-10">
        <div>
          <div className="flex items-center justify-center">
            <LogoImage className="max-w-40" />
          </div>

          <div className="mt-52 w-full flex flex-col gap-5 items-center justify-center">
            <ConnectButton />
            <DisconnectButton />
          </div>
        </div>
      </div>
    </aside>
  );
}
