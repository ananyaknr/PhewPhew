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

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("px-3.5 py-1 bg-pp-accent-mid/20 border border-pp-accent-mid/30 rounded-full text-[10px] text-pp-accent font-bold uppercase tracking-wider", className)}>
      {children}
    </span>
  );
}

export function StatusDot({ type }: { type: 'on' | 'err' | 'idle' }) {
  return (
    <div className={cn(
      "w-1.5 h-1.5 rounded-full transition-all duration-300",
      type === 'on' ? "bg-pp-accent shadow-[0_0_8px_rgba(45,156,202,0.5)]" : 
      type === 'err' ? "bg-pp-danger" : "bg-pp-muted"
    )} />
  );
}

export function Tag({ children, variant = 'mint' }: { children: React.ReactNode; variant?: 'mint' | 'purple' | 'post' | 'pp' }) {
  const variants = {
    mint: "bg-pp-mint/30 text-pp-text border border-pp-mint/50",
    purple: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
    post: "bg-pp-accent/15 text-pp-accent font-bold uppercase tracking-wider border border-pp-accent/20",
    pp: "bg-pp-card text-pp-text border border-pp-border font-medium",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px]", variants[variant])}>
      {children}
    </span>
  );
}
