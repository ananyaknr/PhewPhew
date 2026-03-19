import React from "react";
import { cn } from "@/logic/utils";

interface TextProps {
  size?: number | string;
  weight?: number | string;
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Text atom refactored for Tailwind CSS 4.
 * Prefer using className with tailwind utilities.
 */
export const Text: React.FC<TextProps> = ({ 
  size = 13, 
  weight = 400, 
  color, 
  children, 
  style, 
  className 
}) => {
  return (
    <div 
      className={cn(
        "font-sans leading-[1.4] text-pp-text",
        className
      )}
      style={{ 
        fontSize: typeof size === 'number' ? `${size}px` : size, 
        fontWeight: weight,
        color: color,
        ...style 
      }}
    >
      {children}
    </div>
  );
};
