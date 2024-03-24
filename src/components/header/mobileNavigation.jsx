import React from "react";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const MobileNavigation = React.forwardRef(
  ({ links = [], onToggle = () => null }, ref) => {
    return (
      <div
        className="fixed right-[288px] top-0 w-72 h-full z-10 transition-all bg-dark-200"
        ref={ref}
        style={{ right: -288 }}
      >
        <div className="mb-14 flex items-center justify-end p-5">
          <div className="[&_span]:inline-block [&_span]:cursor-pointer">
            <span className="close" onClick={onToggle}>
              <FaXmark className="h-8 w-8" />
            </span>
          </div>
        </div>
        <div className="offcanvas-menu px-5">
          <nav className="flex flex-col justify-end ">
            {links.map(({ name, path }, idx) => (
              <Link
                key={idx}
                className="text-base font-semibold capitalize block py-2 text-slate-100 hover:text-yellow-200 transition-all"
                to={path}
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col mt-5 gap-3">
            <div className="flex flex-col gap-3" onClick={onToggle}>
              {/* <WalletConnect className="button-base secondary-button connect-wallet" /> */}
              {/* <DisconnectWallet /> */}
            </div>
            {/* <BuyNowButton /> */}
          </div>
        </div>
      </div>
    );
  }
);
