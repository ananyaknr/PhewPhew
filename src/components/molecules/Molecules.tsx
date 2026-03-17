import React from "react";
import { ZONES } from "@/components/Constants";
import { cn } from "@/components/ui/Atoms";

export function ZoneLegend() {
  return (
    <div className="flex gap-3 flex-wrap p-2 px-4 border-t border-sage/5 bg-black/30 shrink-0">
      {ZONES.map((z) => (
        <div
          key={z.name}
          className="flex items-center gap-1.5 text-[10.5px] text-muted"
        >
          <div
            className="w-2 h-2 rounded-sm"
            style={{
              backgroundColor:
                z.color
                  .replace("rgba", "rgb")
                  .replace(",0.11", "")
                  .replace(",0.45", "") + ")",
            }}
          />
          {z.name}
        </div>
      ))}
    </div>
  );
}

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

export function FlowStep({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-sage/5 last:border-0 items-start">
      <div className="w-5.5 h-5.5 rounded-full bg-teal shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5">
        {num}
      </div>
      <p className="text-xs text-white/65 leading-relaxed">{text}</p>
    </div>
  );
}

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
