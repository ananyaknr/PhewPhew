import React from "react";

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
