import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Button({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'sm' }) {
  const variants = {
    primary: "bg-teal text-white hover:bg-teal2 hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed",
    ghost: "bg-white/5 text-sage border border-sage/20 hover:bg-sage/10",
    sm: "px-3 py-1.5 text-[11px] bg-white/5 text-sage border border-sage/20 hover:bg-sage/10",
  };

  return (
    <button 
      className={cn(
        "flex items-center gap-2 px-4.5 py-2 rounded-lg text-sm font-semibold transition-all",
        variants[variant === 'sm' ? 'sm' : variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("px-3.5 py-1 bg-mint/10 border border-mint/20 rounded-full text-xs text-mint font-medium", className)}>
      {children}
    </span>
  );
}

export function StatusDot({ type }: { type: 'on' | 'err' | 'idle' }) {
  return (
    <div className={cn(
      "w-1.5 h-1.5 rounded-full transition-all duration-300",
      type === 'on' ? "bg-mint shadow-[0_0_8px_rgba(2,195,154,0.5)]" : 
      type === 'err' ? "bg-red-500" : "bg-muted"
    )} />
  );
}

export function Tag({ children, variant = 'mint' }: { children: React.ReactNode; variant?: 'mint' | 'purple' | 'post' }) {
  const variants = {
    mint: "bg-mint/10 text-mint",
    purple: "bg-purple-500/15 text-purple-400",
    post: "bg-mint/15 text-mint font-bold uppercase tracking-wider",
  };
  return (
    <span className={cn("px-1.5 py-0.5 rounded text-[10.5px]", variants[variant])}>
      {children}
    </span>
  );
}
