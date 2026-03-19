import React from "react";
import { PHEWPHEW_COLORS as C } from "@component/PhewphewConstants";

export const PremiumTag: React.FC = () => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 3,
    padding: "2px 8px", borderRadius: 99,
    background: C.premiumMid, border: `1px solid #D4C840`,
    fontSize: 9, fontWeight: 700, color: "#5A5000",
    letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif",
  }}>★ PREMIUM</div>
);
