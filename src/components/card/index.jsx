import { cn } from "@/src/lib/utils";

export const Card = ({ className = "", children }) => {
  return (
    <section
      className={cn(
        "bg-dark-200 bg-gradient-to-b from-[#151920] to-[#282828] shadow-[0px_0px_5px_-3px] rounded-md h-full w-full inset-1",
        className
      )}
    >
      <div className="py-10 px-5">{children}</div>
    </section>
  );
};
