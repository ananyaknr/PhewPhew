import React from 'react';
import { cn } from '@/logic/utils';

export function Button({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'sm' | 'accent' }) {
  const variants = {
    primary: "bg-pp-accent text-white hover:bg-pp-text hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-pp-accent/20",
    accent: "bg-pp-accent-mid text-pp-text hover:bg-pp-accent hover:text-white transition-all shadow-md shadow-pp-accent-mid/30",
    ghost: "bg-white/50 text-pp-sub border border-pp-border hover:bg-pp-card",
    sm: "px-3 py-1.5 text-[11px] bg-pp-card text-pp-text border border-pp-border hover:bg-pp-accent hover:text-white",
  };

  return (
    <button 
      className={cn(
        "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
