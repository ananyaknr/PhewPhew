"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { PROMPT } from "@component/Constants";
import { FaceAnalyzer, type StatusType } from "@/logic/FaceAnalyzer";
import { AppHeader } from "@component/organisms/AppHeader";
import { VideoPane } from "@component/organisms/VideoPane";
import { InspectorPane } from "@component/organisms/InspectorPane";
import {
  ResultsPane,
  type AnalysisResults,
} from "@component/organisms/ResultsPane";
import { cn } from "@/logic/utils";
import { ClipboardList, Code } from "lucide-react";

export default function InspectorApp() {
  const [status, setStatus] = useState<{ text: string; type: StatusType }>({
    text: "Starting…",
    type: "idle",
  });
  const [showOverlay, setShowOverlay] = useState(true);
  const [meshReady, setMeshReady] = useState(false);
  const [capturedData, setCapturedData] = useState<{
    payload: any;
    b64: string;
    url: string;
    size: number;
    prompt: string;
  } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [copied, setCopied] = useState(false);

  // New state for results
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState<"results" | "inspector">(
    "results",
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const capRef = useRef<HTMLCanvasElement>(null);
  const analyzerRef = useRef<FaceAnalyzer | null>(null);

  useEffect(() => {
    if (!videoRef.current || !overlayRef.current || !capRef.current) return;

    const analyzer = new FaceAnalyzer({
      onStatusChange: (s) => setStatus(s),
      onMeshReadyChange: (ready) => setMeshReady(ready),
    });

    analyzer.initialize(videoRef.current, overlayRef.current, capRef.current);
    analyzerRef.current = analyzer;

    return () => {
      analyzer.stop();
    };
  }, []);

  useEffect(() => {
    if (analyzerRef.current) {
      analyzerRef.current.setShowOverlay(showOverlay);
    }
  }, [showOverlay]);

  const runMockAnalysis = useCallback(() => {
    setIsAnalysing(true);
    setActiveSideTab("results");

    // Simulate API delay
    setTimeout(() => {
      const mockResults: AnalysisResults = {
        overall_summary:
          "The skin shows good overall hydration with localized areas of mild inflammation. T-zone exhibits slight oiliness, but texture remains relatively smooth across the cheeks.",
        conditions: [
          {
            name: "Mild Erythema",
            icon: "🔴",
            severity: "Low",
            confidence: 92,
            zone: "Left Cheek",
            description:
              "Localized redness observed, possibly due to sensitivity or recent environmental exposure.",
          },
          {
            name: "Sebum Activity",
            icon: "✨",
            severity: "Medium",
            confidence: 88,
            zone: "T-Zone",
            description:
              "Increased reflectance indicates moderate oil production in the forehead and nasal bridge.",
          },
          {
            name: "Congested Pores",
            icon: "🔘",
            severity: "Low",
            confidence: 85,
            zone: "Chin",
            description:
              "Slight texture irregularity suggesting minor pore congestion.",
          },
        ],
        recommendations: [
          "Incorporate a soothing niacinamide serum to address localized redness.",
          "Use a gentle BHA exfoliant twice a week on the T-zone to manage oil.",
          "Ensure daily SPF 50 application to prevent UV-induced inflammation.",
        ],
        limitations:
          "This analysis is based on a single 2D image. Results may vary with lighting and camera quality. Not a medical diagnosis.",
      };

      setAnalysisResults(mockResults);
      setIsAnalysing(false);
    }, 2500);
  }, []);

  const capturePayload = () => {
    if (!analyzerRef.current) return;

    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 600);

    const frameData = analyzerRef.current.captureFrame();
    if (!frameData) return;

    const payload = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: "[BASE64_JPEG_DATA]",
              },
            },
            {
              type: "text",
              text: PROMPT,
            },
          ],
        },
      ],
    };

    setCapturedData({
      payload,
      b64: frameData.b64,
      url: frameData.url,
      size: frameData.size,
      prompt: PROMPT,
    });

    // Trigger analysis pipeline
    runMockAnalysis();
  };

  const copyPayload = () => {
    if (!capturedData) return;
    const real = JSON.parse(JSON.stringify(capturedData.payload));
    real.messages[0].content[0].source.data = capturedData.b64;
    navigator.clipboard.writeText(JSON.stringify(real, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const syntaxHighlight = (json: string) => {
    return json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = "text-number";
          if (/^"/.test(match)) {
            cls = /:$/.test(match) ? "text-key" : "text-string";
          } else if (/true|false/.test(match)) {
            cls = "text-bool";
          } else if (/null/.test(match)) {
            cls = "text-null";
          }
          return `<span class="${cls}">${match}</span>`;
        },
      );
  };

  const colorPrompt = (text: string) => {
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return escaped
      .replace(
        /(None\|Low\|Medium\|High)/g,
        '<span class="text-mint">$1</span>',
      )
      .replace(/(0-100)/g, '<span class="text-mint">$1</span>')
      .replace(
        /("overall_summary"|"conditions"|"name"|"icon"|"severity"|"confidence"|"zone"|"description"|"recommendations"|"limitations")/g,
        '<span class="text-string">$1</span>',
      )
      .replace(
        /(Respond ONLY with valid JSON)/g,
        '<span class="text-purple-400">$1</span>',
      )
      .replace(
        /(You are PhewPhew)/g,
        '<span class="text-mint font-medium">$1</span>',
      );
  };

  return (
    <div className="flex flex-col h-screen text-white bg-dark overflow-hidden font-sans relative z-10">
      <AppHeader status={status} />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_480px] min-h-0 overflow-hidden relative z-10">
        <VideoPane
          videoRef={videoRef}
          overlayRef={overlayRef}
          capRef={capRef}
          meshReady={meshReady}
          status={status}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          capturePayload={capturePayload}
          isCapturing={isCapturing}
        />

        <div className="flex flex-col bg-dark2 border-l border-sage/10 overflow-hidden relative">
          {/* Side Tab Switcher */}
          <div className="flex bg-black/40 border-b border-sage/10 flex-shrink-0">
            <button
              onClick={() => setActiveSideTab("results")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2",
                activeSideTab === "results"
                  ? "text-mint border-mint"
                  : "text-muted border-transparent hover:text-sage",
              )}
            >
              <ClipboardList className="w-4 h-4" />
              Analysis
            </button>
            <button
              onClick={() => setActiveSideTab("inspector")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2",
                activeSideTab === "inspector"
                  ? "text-mint border-mint"
                  : "text-muted border-transparent hover:text-sage",
              )}
            >
              <Code className="w-4 h-4" />
              Inspector
            </button>
          </div>

          <div className="flex-1 flex flex-col min-h-0 relative">
            {activeSideTab === "results" ? (
              <ResultsPane results={analysisResults} isLoading={isAnalysing} />
            ) : (
              <InspectorPane
                capturedData={capturedData}
                copyPayload={copyPayload}
                copied={copied}
                syntaxHighlight={syntaxHighlight}
                colorPrompt={colorPrompt}
              />
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .text-key {
          color: #61afef;
        }
        .text-string {
          color: #98c379;
        }
        .text-number {
          color: #d19a66;
        }
        .text-bool {
          color: #c678dd;
        }
        .text-null {
          color: #56b6c2;
        }
      `}</style>
    </div>
  );
}
