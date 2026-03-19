import React from 'react';
import { cn } from '@/logic/utils';

export interface Condition {
  name: string;
  icon: string;
  severity: 'None' | 'Low' | 'Medium' | 'High';
  confidence: number;
  zone: string;
  description: string;
}

const severityColors = {
  None: 'bg-mint/20 text-mint border-mint/30',
  Low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Medium: 'bg-warn/20 text-warn border-warn/30',
  High: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function AnalysisCard({ condition }: { condition: Condition }) {
  return (
    <div className="bg-white/5 border border-sage/10 rounded-xl p-4 flex flex-col gap-3 transition-all hover:border-sage/20">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-sage/5">
            {condition.icon}
          </div>
          <div>
            <h5 className="text-sm font-bold text-white leading-tight">{condition.name}</h5>
            <span className="text-[10px] text-muted uppercase tracking-wider font-medium">{condition.zone}</span>
          </div>
        </div>
        <div className={cn(
          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
          severityColors[condition.severity]
        )}>
          {condition.severity}
        </div>
      </div>
      
      <p className="text-xs text-white/70 leading-relaxed">
        {condition.description}
      </p>
      
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-sage/5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] text-muted uppercase tracking-tighter">Confidence</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-mint shadow-[0_0_4px_rgba(2,195,154,0.5)]" 
                style={{ width: `${condition.confidence}%` }} 
              />
            </div>
            <span className="text-[10px] font-mono text-mint">{condition.confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
