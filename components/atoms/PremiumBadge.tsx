import React from "react";
import { PHEWPHEW_COLORS as C } from "@component/PhewphewConstants";

export const PremiumBadge: React.FC<{ label?: string; premium?: boolean }> = ({ label, premium }) => {
  if (!premium) return null; // Only render premium badges
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 10px", borderRadius: 99,
      background: C.premiumMid, border: `1px solid #D4C840`,
      fontSize: 10, fontWeight: 700, color: "#5A5000",
      letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif",
    }}>
      ★ PREMIUM{label ? ` · ${label}` : ""}
    </div>
  );
};
