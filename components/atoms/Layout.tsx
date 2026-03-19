import React from "react";
import { cn } from "@/logic/utils";

/**
 * Layout atoms refactored for Tailwind CSS 4.
 * Prefer using className with tailwind utilities.
 */

export const Box: React.FC<{ 
  style?: React.CSSProperties; 
  children?: React.ReactNode; 
  onClick?: () => void; 
  className?: string 
}> = ({ style, children, onClick, className }) => (
  <div 
    onClick={onClick} 
    className={cn("box-border", className)} 
    style={style}
  >
    {children}
  </div>
);

export const Rect: React.FC<{ 
  w: number | string; 
  h: number | string; 
  r?: number | string; 
  color?: string; 
  style?: React.CSSProperties;
  className?: string;
}> = ({ w, h, r = 8, color, style, className }) => (
  <div 
    className={cn("flex-shrink-0 bg-pp-card", className)} 
    style={{ 
      width: w, 
      height: h, 
      borderRadius: typeof r === 'number' ? `${r}px` : r, 
      backgroundColor: color, 
      ...style 
    }} 
  />
);

export const Line: React.FC<{ 
  w?: number | string; 
  h?: number | string; 
  r?: number | string; 
  color?: string; 
  style?: React.CSSProperties;
  className?: string;
}> = ({ w = "100%", h = 10, r = 5, color, style, className }) => (
  <div 
    className={cn("bg-pp-border", className)} 
    style={{ 
      width: w, 
      height: h, 
      borderRadius: typeof r === 'number' ? `${r}px` : r, 
      backgroundColor: color, 
      ...style 
    }} 
  />
);
