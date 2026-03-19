import React from "react";
import {
  AnalysisCard,
  type Condition,
} from "@component/molecules/AnalysisCard";
import { Sparkles, ClipboardList, ShieldAlert, Loader2 } from "lucide-react";

export interface AnalysisResults {
  overall_summary: string;
  conditions: Condition[];
  recommendations: string[];
  limitations: string;
}

interface ResultsPaneProps {
  results: AnalysisResults | null;
  isLoading: boolean;
}

export function ResultsPane({ results, isLoading }: ResultsPaneProps) {
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center bg-dark2">
        <Loader2 className="w-10 h-10 text-mint animate-spin" />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-white uppercase tracking-widest">
            Analysing Skin Profile
          </p>
          <p className="text-xs text-muted">
            Claude 3.5 Sonnet is inspecting the frame…
          </p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center bg-dark2">
        <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center border border-teal/20 mb-2">
          <Sparkles className="w-8 h-8 text-teal opacity-60" />
        </div>
        <div className="max-w-[280px]">
          <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">
            Ready for Analysis
          </h4>
          <p className="text-xs text-muted leading-relaxed">
            Position your face within the zones and hit <strong>Capture</strong>{" "}
            to generate your AI-powered skin health report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-dark2 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-5 flex flex-col gap-6">
        {/* OVERALL SUMMARY */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-mint" />
            <h4 className="text-[11px] font-bold tracking-wider text-sage uppercase">
              Overall Assessment
            </h4>
          </div>
          <div className="bg-gradient-to-br from-teal/20 to-mint/5 border border-mint/20 rounded-2xl p-5 shadow-lg shadow-black/20">
            <p className="text-sm text-white leading-relaxed font-medium italic">
              &quot;{results.overall_summary}&quot;
            </p>
          </div>
        </section>

        {/* CONDITIONS */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-mint" />
            <h4 className="text-[11px] font-bold tracking-wider text-sage uppercase">
              Observed Conditions
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {results.conditions.map((condition, idx) => (
              <AnalysisCard key={idx} condition={condition} />
            ))}
          </div>
        </section>

        {/* RECOMMENDATIONS */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-mint" />
            <h4 className="text-[11px] font-bold tracking-wider text-sage uppercase">
              Actionable Steps
            </h4>
          </div>
          <div className="bg-white/5 border border-sage/10 rounded-2xl p-5 flex flex-col gap-3">
            {results.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-mint mt-1.5 flex-shrink-0" />
                <p className="text-xs text-white/80 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LIMITATIONS */}
        <section className="mt-2">
          <div className="bg-warn/5 border border-warn/20 rounded-xl p-4 flex gap-3 items-start">
            <ShieldAlert className="w-4 h-4 text-warn flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-warn/80">
                Analysis Disclaimer
              </span>
              <p className="text-[11px] text-warn/70 leading-relaxed italic">
                {results.limitations}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
