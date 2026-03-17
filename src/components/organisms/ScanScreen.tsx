import React, { useState, useEffect } from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box, Text, StatusBar, NavBar } from "../ui/PhewphewAtoms";

interface ScanScreenProps {
  onNav: (screen: string) => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({ onNav }) => {
  const [phase, setPhase] = useState<"camera" | "scanning" | "result" | "manual" | "recent-detail">("camera");
  const [scanProgress, setScanProgress] = useState(0);
  const [inputMode, setInputMode] = useState<"camera" | "text">("camera");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => (f + 1) % 60), 100);
    return () => clearInterval(interval);
  }, []);

  const triggerScan = () => {
    setPhase("scanning");
    setScanProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += 4;
      setScanProgress(p);
      if (p >= 100) { clearInterval(t); setTimeout(() => setPhase("result"), 300); }
    }, 60);
  };

  const camNoise = Array.from({ length: 6 }, (_, i) => ({
    x: 10 + ((frame * 7 + i * 43) % 80),
    y: 10 + ((frame * 11 + i * 29) % 60),
    op: 0.04 + (Math.sin((frame + i * 10) * 0.3) * 0.02),
  }));

  return (
    <Box style={{ height: "100vh", background: "#0D1F2A", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0D1F2A" }}><StatusBar /></div>

      <div style={{ padding: "2px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", color: "#9BE9FA", fontSize: 20 }}>‹</div>
        <Text size={17} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif" }}>Ingredient Scanner</Text>
      </div>

      {phase === "camera" || phase === "scanning" ? (
        <>
          <div style={{ position: "relative", flex: "0 0 auto", height: 320, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "#0D2A3A" }} />
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              {camNoise.map((n, i) => (
                <ellipse key={i} cx={n.x} cy={n.y} rx={12} ry={8} fill={i % 2 === 0 ? "#9BE9FA" : "#b5ffef"} opacity={n.op} />
              ))}
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 220, height: 130, border: `2px solid ${C.accentMid}`, borderRadius: 12 }} />
            </div>
          </div>

          <div style={{ flex: 1, background: C.bg, borderRadius: "20px 20px 0 0", padding: "16px 20px" }}>
            <div onClick={triggerScan} style={{ width: "100%", padding: "15px", borderRadius: 16, background: C.accent, textAlign: "center", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
              {phase === "scanning" ? `Scanning... ${scanProgress}%` : "◎ Scan Ingredients"}
            </div>
          </div>
        </>
      ) : (
        <div style={{ flex: 1, background: C.bg, padding: "20px" }}>
          <Text size={18} weight={800}>Analysis Result</Text>
          <Text style={{ marginTop: 10 }}>This product is compatible with your skin type.</Text>
          <div onClick={() => setPhase("camera")} style={{ marginTop: 20, color: C.accent, cursor: "pointer" }}>← Scan Another</div>
        </div>
      )}

      <NavBar active="scan" onNav={onNav} />
    </Box>
  );
};
