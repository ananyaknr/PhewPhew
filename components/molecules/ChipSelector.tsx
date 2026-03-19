import React from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";

export const ChipSelector: React.FC<{ options: string[]; selected: string | string[]; onToggle: (o: string) => void; single?: boolean }> = ({ options, selected, onToggle }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(o => {
        const isSelected = Array.isArray(selected) ? selected.includes(o) : selected === o;
        return (
          <div
            key={o}
            onClick={() => onToggle(o)}
            style={{
              padding: "8px 14px", borderRadius: 99, cursor: "pointer",
              border: `1.5px solid ${isSelected ? C.accent : C.border}`,
              background: isSelected ? C.accentMid : C.surface,
              fontSize: 12, color: isSelected ? "#0D2A3A" : C.text,
              fontWeight: isSelected ? 700 : 400,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s",
              boxShadow: isSelected ? "0 2px 10px #9BE9FA66" : "none",
            }}
          >
            {o}
          </div>
        );
      })}
    </div>
  );
};
