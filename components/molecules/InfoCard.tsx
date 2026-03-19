import React from "react";

export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-sage/10 rounded-xl p-4">
      <h4 className="text-[11px] font-bold tracking-wider text-sage uppercase mb-2">
        {title}
      </h4>
      <div className="text-xs text-white/65 leading-relaxed">{children}</div>
    </div>
  );
}
