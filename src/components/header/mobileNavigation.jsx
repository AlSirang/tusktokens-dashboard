import React from "react";
import { FaXmark } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "../connectButton";
import { DisconnectButton } from "../disconnectButton";
import { cn } from "@/src/lib/utils";

export const MobileNavigation = React.forwardRef(
  ({ links = [], onToggle = () => null }, ref) => {
    const { pathname } = useLocation();

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
                className={cn(
                  "text-base font-semibold capitalize block py-2 text-slate-100 hover:text-yellow-200 transition-all",
                  {
                    "text-yellow-200": pathname.endsWith(path),
                  }
                )}
                to={path}
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 mt-10" onClick={onToggle}>
            <ConnectButton />
            <DisconnectButton />
          </div>
        </div>
      </div>
    );
  }
);
