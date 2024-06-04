import { cn } from "@/src/lib/utils";

export const Card = ({ className = "", children }) => {
  return (
    <section
      className={cn(
        "bg-dark-200 bg-gradient-to-b from-dark-100 to-dark-200 shadow-[0px_0px_5px_-3px] rounded-[10px] h-full w-full inset-1",
        className
      )}
    >
      <div className="py-10 px-5 h-full">{children}</div>
    </section>
  );
};
