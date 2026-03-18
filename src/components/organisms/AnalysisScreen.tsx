"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box } from "@/components/atoms/Layout";
import { Text } from "@/components/atoms/Text";
import { PremiumTag } from "@/components/atoms/PremiumTag";
import { SectionHead } from "@/components/molecules/SectionHead";
import { FaceAnalyzer } from "@/logic/FaceAnalyzer";
import { Loader2, Camera as CameraIcon } from "lucide-react";

export const AnalysisScreen: React.FC = () => {
  const router = useRouter();
  const [phase, setPhase] = useState<"capture" | "analysing" | "result">("capture");
  const [progress, setProgress] = useState(0);
  const [meshReady, setMeshReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const capRef = useRef<HTMLCanvasElement>(null);
  const analyzerRef = useRef<FaceAnalyzer | null>(null);

  useEffect(() => {
    if (phase === "capture") {
      if (!videoRef.current || !overlayRef.current || !capRef.current) return;

      const analyzer = new FaceAnalyzer({
        onMeshReadyChange: (ready) => setMeshReady(ready),
      });

      analyzer.initialize(videoRef.current, overlayRef.current, capRef.current);
      analyzerRef.current = analyzer;

      return () => {
        analyzer.stop();
      };
    }
  }, [phase]);

  const triggerAnalysis = () => {
    setPhase("analysing");
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) { 
        clearInterval(t); 
        setTimeout(() => setPhase("result"), 400); 
      }
    }, 55);
  };

  const analysisStages = ["Mapping facial zones", "Detecting skin texture", "Measuring pore density", "Analysing pigmentation", "Cross-referencing profile"];
  const currentStage = Math.floor((progress / 100) * analysisStages.length);

  return (
    <Box style={{ height: "100vh", background: "#0D1F2A", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "2px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => router.push("/home")} style={{ cursor: "pointer", color: "#9BE9FA", fontSize: 20, lineHeight: 1 }}>‹</div>
        <Text size={17} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif" }}>AI Skin Analysis</Text>
      </div>

      {phase === "capture" && (
        <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#000" }}>
            <video
              ref={videoRef}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)",
                opacity: meshReady ? 1 : 0, transition: "opacity 0.5s"
              }}
              playsInline
              muted
            />
            <canvas
              ref={overlayRef}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "scaleX(-1)" }}
              width={1280}
              height={720}
            />
            <canvas ref={capRef} style={{ display: "none" }} />

            {!meshReady && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)" }}>
                <Loader2 style={{ color: "#9BE9FA", animation: "spin 1s linear infinite" }} />
                <Text color="#9BE9FA" style={{ marginTop: 10 }}>Loading AI model...</Text>
              </div>
            )}

            {/* Viewfinder circle mask */}
            <div style={{ position: "absolute", inset: 0, border: "40px solid rgba(13,31,42,0.7)", pointerEvents: "none" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", boxShadow: "0 0 0 999px rgba(13,31,42,0.7)", border: `2px solid ${meshReady ? C.accentMid : "rgba(255,255,255,0.2)"}` }} />
            </div>
          </div>

          <div style={{ background: C.bg, padding: "20px", borderRadius: "24px 24px 0 0", textAlign: "center" }}>
            <Text size={14} weight={700} style={{ marginBottom: 15 }}>Center your face in the circle</Text>
            <div 
              onClick={meshReady ? triggerAnalysis : undefined}
              style={{ 
                width: 70, height: 70, borderRadius: "50%", background: meshReady ? C.accent : C.muted, 
                margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                boxShadow: meshReady ? `0 0 20px ${C.accent}66` : "none"
              }}
            >
              <CameraIcon color="#fff" />
            </div>
          </div>
        </div>
      )}

      {phase === "analysing" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0D1F2A", padding: 40 }}>
          <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: C.accentMid, transition: "width 0.1s" }} />
          </div>
          <Text color="#fff" weight={700}>{analysisStages[currentStage] || "Finalising..."}</Text>
          <Text color="rgba(255,255,255,0.5)" style={{ marginTop: 10 }}>Keep your phone still</Text>
        </div>
      )}

      {phase === "result" && (
        <Box style={{ flex: 1, overflowY: "auto", background: C.bg, padding: "20px 20px 80px" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 20, border: `1px solid ${C.border}`, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", border: `4px solid ${C.accentMid}`, display: "flex", alignItems: "center", justifyContent: "center", background: C.accentLight }}>
                <Text size={20} weight={800} color={C.accent}>74</Text>
              </div>
              <div>
                <Text size={16} weight={800}>Skin Score</Text>
                <Text color={C.sub}>Overall Healthy</Text>
              </div>
              <div style={{ marginLeft: "auto" }}><PremiumTag /></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Hydration", val: "78%", color: C.accentMid },
                { label: "Oiliness", val: "42%", color: "#fff9af" },
                { label: "Clarity", val: "65%", color: "#b5ffef" },
                { label: "Sensitivity", val: "Low", color: "#b5ffef" }
              ].map(s => (
                <div key={s.label} style={{ background: C.card, padding: 12, borderRadius: 12 }}>
                  <Text size={11} color={C.sub}>{s.label}</Text>
                  <Text size={14} weight={700}>{s.val}</Text>
                </div>
              ))}
            </div>
          </div>

          <SectionHead label="Top Recommendations" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Use a lightweight gel moisturiser today due to high humidity.",
              "Incorporate Vitamin C to address slight pigmentation on cheeks.",
              "Double cleanse tonight to remove high PM2.5 particles."
            ].map((r, i) => (
              <div key={i} style={{ background: "#fff", padding: 15, borderRadius: 14, border: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
                <span style={{ color: C.accent }}>✦</span>
                <Text size={13}>{r}</Text>
              </div>
            ))}
          </div>

          <div 
            onClick={() => setPhase("capture")}
            style={{ width: "100%", padding: 15, borderRadius: 16, background: C.accent, textAlign: "center", color: "#fff", fontWeight: 800, marginTop: 30, cursor: "pointer" }}
          >
            New Analysis
          </div>
        </Box>
      )}
    </Box>
  );
};
