import React from 'react';
import { cn } from '@/logic/utils';

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
