"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box } from "../atoms/Layout";
import { Text } from "../atoms/Text";
import { PremiumTag } from "../atoms/PremiumTag";

export const TrackerScreen: React.FC = () => {
  const router = useRouter();
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  return (
    <Box style={{ height: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => router.push("/home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Progress Tracker</Text>
        <div style={{ marginLeft: "auto" }}><PremiumTag /></div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        <Box style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={13} weight={700} style={{ marginBottom: 4 }}>Skin Score Trend</Text>
          <div style={{ height: 100, display: "flex", alignItems: "flex-end", gap: 6, marginTop: 20 }}>
            {[55, 58, 62, 60, 67, 70, 74].map((v, i) => (
              <div key={i} onClick={() => setActiveMetric(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <div style={{ width: "100%", height: v, borderRadius: "6px 6px 0 0", background: activeMetric === i ? C.accent : C.accentLight }} />
                <Text size={8} color={C.muted}>W{i + 1}</Text>
              </div>
            ))}
          </div>
        </Box>

        <Box style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={13} weight={700} style={{ marginBottom: 12 }}>Metric Breakdown</Text>
          {[
            { label: "Hydration", val: 62, icon: "💧", color: "#FFB43A" },
            { label: "Clarity", val: 78, icon: "🌟", color: "#4ade80" },
            { label: "Texture", val: 81, icon: "🎯", color: "#4ade80" },
          ].map(m => (
            <div key={m.label} style={{ marginBottom: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <span>{m.icon}</span>
                  <Text size={12}>{m.label}</Text>
                </div>
                <Text size={12} weight={700}>{m.val}%</Text>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: C.card }}>
                <div style={{ height: "100%", width: `${m.val}%`, borderRadius: 99, background: m.color }} />
              </div>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
