import React from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";

export const Text: React.FC<{ size?: number; weight?: number | string; color?: string; children?: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({ size = 13, weight = 400, color = C.text, children, style, className }) => (
  <div className={className} style={{ fontSize: size, fontWeight: weight, color, lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif", ...style }}>{children}</div>
);
