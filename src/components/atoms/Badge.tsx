import React from "react";
import { cn } from "@/logic/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "px-3.5 py-1 bg-pp-accent-mid/20 border border-pp-accent-mid/30 rounded-full text-[10px] text-pp-accent font-bold uppercase tracking-wider",
        className,
      )}
    >
      {children}
    </span>
  );
}
