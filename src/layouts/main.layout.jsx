import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { cn } from "../lib/utils";

export const MainLayout = ({ children, className = "" }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full relative min-h-screen h-full flex flex-col">
        <div>
          <Header />
        </div>
        <main
          className={cn(
            "max-w-screen-2xl px-5 lg:px-10 mx-auto flex-grow h-full",
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
