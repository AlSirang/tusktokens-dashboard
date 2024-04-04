import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa6";
import { MobileNavigation } from "./mobileNavigation";
import { LogoImage } from "../logoImage";
import { cn } from "@/src/lib/utils";

const internalPaths = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "dashboard",
    path: "/dashboard",
  },
];
const exnternalPaths = [
  {
    name: "About Us",
    path: "https://tusktokens.com/#about",
  },
  {
    name: "Tokenomics",
    path: "https://tusktokens.com/#tokenomics",
  },
  {
    name: "Roadmap",
    path: "https://tusktokens.com/#roadmap",
  },

  {
    name: "White paper",
    path: "WHITEPAPER.pdf",
  },
];
const Header = () => {
  const { pathname } = useLocation();
  const sideMenuRef = useRef(null);

  const onToggle = () => {
    if (sideMenuRef.current.style.right === "0px")
      return (sideMenuRef.current.style.right = "-288px");
    sideMenuRef.current.style.right = "0px";
  };

  return (
    <>
      <div className="overlay-image">
        <div className="overlay-color" />
      </div>

      <MobileNavigation
        ref={sideMenuRef}
        internalPaths={internalPaths}
        exnternalPaths={exnternalPaths}
        onToggle={onToggle}
      />

      <header className="py-5 lg:py-14 max-w-screen-2xl mx-auto">
        <div className="flex items-center lg:justify-end justify-between px-5">
          <div className="block lg:hidden font-semibold text-4xl">
            <LogoImage className="h-28 w-28" />
          </div>

          <div className="flex items-center">
            <div className="hidden lg:block pr-5">
              <nav className="flex items-center gap-3">
                {internalPaths.map(({ name, path }, idx) => (
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
                {exnternalPaths.map(({ name, path }, idx) => (
                  <a
                    href={path}
                    key={idx}
                    className={cn(
                      "text-base font-semibold capitalize block py-2 text-slate-100 hover:text-yellow-200 transition-all",
                      {
                        "text-yellow-200": pathname.endsWith(path),
                      }
                    )}
                  >
                    {name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex items-center lg:ml-12">
              <div className="header-mobileBar lg:hidden ml-12 ">
                <span
                  className="cursor-pointer inline-block"
                  onClick={onToggle}
                >
                  <FaAlignRight className="w-8 h-8" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
