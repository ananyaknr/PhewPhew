import React from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";

export const Box: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode; onClick?: () => void; className?: string }> = ({ style, children, onClick, className }) => (
  <div onClick={onClick} className={className} style={{ boxSizing: "border-box", ...style }}>{children}</div>
);

export const Rect: React.FC<{ w: number | string; h: number | string; r?: number; color?: string; style?: React.CSSProperties }> = ({ w, h, r = 8, color = C.card, style }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: color, flexShrink: 0, ...style }} />
);

export const Line: React.FC<{ w?: number | string; h?: number; r?: number; color?: string; style?: React.CSSProperties }> = ({ w = "100%", h = 10, r = 5, color = C.border, style }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: color, ...style }} />
);
