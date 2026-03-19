import React from "react";
import { ZONES } from "@component/Constants";

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
