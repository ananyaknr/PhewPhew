import React from "react";
import { Badge } from "@/components/atoms/Badge";
import { StatusDot } from "@/components/atoms/StatusDot";
import { type StatusType } from "@/logic/FaceAnalyzer";

export function AppHeader({
  status,
}: {
  status: { text: string; type: StatusType };
}) {
  return (
    <header className="relative z-20 shrink-0 flex items-center justify-between px-6 py-3 border-b border-sage/10 bg-dark/80 backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <div className="w-7.5 h-7.5 rounded-lg bg-teal flex items-center justify-center font-serif text-sm text-white">
          ผ
        </div>
        <div className="font-serif text-[19px]">
          Phew<span className="text-sage">Phew</span>
        </div>
      </div>
      <Badge>🔍 Payload Inspector — No API Key Required</Badge>
      <div className="flex items-center gap-2 text-xs text-muted">
        <StatusDot type={status.type} />
        <span>{status.text}</span>
      </div>
    </header>
  );
}
