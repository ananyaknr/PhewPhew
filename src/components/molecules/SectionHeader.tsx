import React from "react";

export function SectionHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-black/30 border-b border-sage/10 shrink-0">
      <span className="text-[11px] font-semibold tracking-wider text-sage uppercase">
        {title}
      </span>
      {children}
    </div>
  );
}
