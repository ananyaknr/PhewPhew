import React from 'react';
import { cn } from '@/logic/utils';

export function StatusDot({ type }: { type: 'on' | 'err' | 'idle' }) {
  return (
    <div className={cn(
      "w-1.5 h-1.5 rounded-full transition-all duration-300",
      type === 'on' ? "bg-pp-accent shadow-[0_0_8px_rgba(45,156,202,0.5)]" : 
      type === 'err' ? "bg-pp-danger" : "bg-pp-muted"
    )} />
  );
}
