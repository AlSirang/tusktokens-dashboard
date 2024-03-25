import React, { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

export const Button = forwardRef(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex justify-center items-center py-3 px-4 rounded-md w-full font-medium uppercase transition-all disabled:text-foreground/50 disabled:bg-primary/30 disabled:hover:opacity-100 hover:opacity-80",
          {
            "text-dark-100 bg-yellow-200 disabled:bg-yellow-200/60":
              variant === "primary",
            "text-foreground bg-transparent border border-yellow-200 disabled:bg-transparent disabled:border-foreground/50":
              variant === "secondary",
          },
          className
        )}
        {...props}
      />
    );
  }
);
