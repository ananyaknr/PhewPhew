"use client";

import React, { useState } from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box } from "../atoms/Layout";
import { Text } from "../atoms/Text";
import { PremiumTag } from "../atoms/PremiumTag";
import { SectionHead } from "../molecules/SectionHead";
import { useRouter } from "next/navigation";

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [routineTab, setRoutineTab] = useState<"AM" | "PM">("AM");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const allSteps = {
    AM: [
      { name: "Gentle Cleanser", brand: "CeraVe Hydrating", emoji: "🫧", why: "Removes overnight sebum without stripping your barrier — essential first step every AM.", tag: "Barrier Safe",     tagColor: C.mintDark,  tagBg: "#E8FFFB" },
      { name: "Hydrating Toner",  brand: "COSRX AHA/BHA",   emoji: "💧", why: "Preps skin pH before serums so actives absorb 40% better. Choose alcohol-free.",          tag: "Prep Step",       tagColor: "#1A6A88",   tagBg: C.accentLight },
      { name: "Vitamin C Serum",  brand: "Timeless 20% C+E",emoji: "🍊", why: "AM antioxidant that neutralises free radicals from PM2.5 — boosts SPF effectiveness.",    tag: "✦ New",           tagColor: C.premium,   tagBg: C.premiumMid },
      { name: "Moisturiser",      brand: "Round Lab Birch", emoji: "🧴", why: "Seals in serum actives and maintains hydration throughout the day.",                       tag: "Locks In",        tagColor: "#1A6A88",   tagBg: C.accentLight },
      { name: "SPF 50 Sunscreen", brand: "Beauty of Joseon",emoji: "☀️", why: "Non-negotiable last step — UV is the #1 cause of aging. Reapply every 2h outdoors.",      tag: "Required",      tagColor: "#7A6A00",   tagBg: "#FFFDE8" },
    ],
    PM: [
      { name: "Oil Cleanser",     brand: "Banila Co Clean It", emoji: "🫧", why: "First cleanse dissolves sunscreen and makeup. Essential for double-cleanse method.",      tag: "Double Cleanse",  tagColor: C.mintDark,  tagBg: "#E8FFFB" },
      { name: "Foaming Cleanser", brand: "CeraVe Foaming",     emoji: "🧼", why: "Second cleanse clears remaining impurities — sets clean canvas for PM actives.",          tag: "Deep Clean",      tagColor: "#1A6A88",   tagBg: C.accentLight },
      { name: "BHA Toner",        brand: "Paula's Choice 2%",  emoji: "⚗️", why: "Unclogs pores and exfoliates dead skin while you sleep. Use 2–3x per week.",              tag: "✦ New",           tagColor: C.premium,   tagBg: C.premiumMid },
      { name: "Retinol 0.3%",     brand: "The Ordinary",       emoji: "🔬", why: "Stimulates collagen overnight — the gold standard anti-aging ingredient. Start slow.",    tag: "Anti-aging",      tagColor: "#5A5000",   tagBg: "#FFFDE8" },
      { name: "Night Moisturiser",brand: "Laneige Water Bank", emoji: "🌙", why: "Heavier PM formula that repairs and locks in moisture during sleep.", tag: "Repair Mode", tagColor: "#1A6A88", tagBg: C.accentLight },
    ],
  };

  const [stepStates, setStepStates] = useState<{ AM: boolean[]; PM: boolean[] }>({ 
    AM: [true, true, true, false, false], 
    PM: [false, false, false, false, false] 
  });

  const currentSteps = allSteps[routineTab];
  const currentStepStates = stepStates[routineTab];

  const toggleStep = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    setStepStates(prev => {
      const updated = [...prev[routineTab]];
      updated[i] = !updated[i];
      return { ...prev, [routineTab]: updated };
    });
  };

  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <Box style={{ flex: 1, overflowY: "auto", paddingBottom: 120 }}>

        {/* ── HERO HEADER ── */}
        <div style={{
          background: "linear-gradient(150deg, #D4F0FB 0%, #E8F8FF 50%, #E2F4FC 100%)",
          padding: "0 20px 18px",
          borderBottom: `1px solid ${C.border}`,
          position: "relative", overflow: "hidden",
        }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, marginBottom: 16, position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: C.accentMid, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px #9BE9FA44" }}>
                <span style={{ fontSize: 16 }}>✦</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.text, fontFamily: "Syne, sans-serif", lineHeight: 1 }}>PhewPhew</div>
                <div style={{ fontSize: 9, color: C.accent, letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>SKIN INTELLIGENCE</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative", cursor: "pointer", padding: 4 }}>
                <span style={{ fontSize: 20 }}>🔔</span>
                <div style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: C.danger, border: `1.5px solid ${C.bg}` }} />
              </div>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accentMid}, ${C.mint})`, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.surface}`, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                <span style={{ fontSize: 16 }}>👤</span>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 1, marginBottom: 14 }}>
            <Text size={11} color={C.sub} style={{ letterSpacing: "0.04em", marginBottom: 3 }}>Good morning, User ✦</Text>
            <Text size={21} weight={800} style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.2, color: C.text }}>
              Your skin is getting<br />
              <span style={{ color: C.accent }}>smarter every day.</span>
            </Text>
          </div>

          {/* Skin Score card */}
          <div style={{
            background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`,
            padding: "12px 14px", display: "flex", alignItems: "center", gap: 14,
            cursor: "pointer", position: "relative", zIndex: 1,
            boxShadow: "0 2px 12px rgba(45,156,202,0.10)",
          }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid ${C.accentMid}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", flexShrink: 0, background: C.accentLight }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: C.accent, fontFamily: "Syne, sans-serif", lineHeight: 1 }}>74</span>
              <span style={{ fontSize: 7, color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>/100</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <Text size={11} weight={700}>Skin Score Today</Text>
                <PremiumTag />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[["Hydration", 78, C.accentMid], ["Clarity", 65, "#b5ffef"], ["Texture", 82, "#fff9af"]].map(([label, val, barColor]) => (
                  <div key={label as string} style={{ flex: 1 }}>
                    <div style={{ height: 4, borderRadius: 99, background: C.card }}>
                      <div style={{ height: "100%", width: `${val}%`, borderRadius: 99, background: barColor as string }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span style={{ color: C.muted, fontSize: 16 }}>›</span>
          </div>
        </div>

        {/* ── ENVIRONMENT BANNER ── */}
        <div style={{ padding: "14px 20px 0" }}>
          <div style={{
            borderRadius: 16, overflow: "hidden", cursor: "pointer",
            background: "linear-gradient(120deg, #0D3A50 0%, #1A6A7A 55%, #1A5040 100%)",
            boxShadow: "0 4px 20px rgba(13,58,80,0.18)",
            position: "relative",
          }}>
            <div style={{ padding: "14px 16px", position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Local Environment</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 99, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }} />
                  <span style={{ fontSize: 8, fontWeight: 700, color: "#9BE9FA", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>LIVE</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { icon: "🌡️", label: "Temp",    value: "34°C" },
                  { icon: "☁️", label: "PM2.5",   value: "AQI 142", alert: true },
                  { icon: "☀️", label: "UV Index", value: "9 High", alert: true },
                ].map(s => (
                  <div key={s.label} style={{
                    flex: 1, background: s.alert ? "rgba(220,100,50,0.18)" : "rgba(255,255,255,0.08)",
                    border: `1px solid ${s.alert ? "rgba(220,100,50,0.4)" : "rgba(255,255,255,0.12)"}`,
                    borderRadius: 10, padding: "8px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 14 }}>{s.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: s.alert ? "#FFB380" : "#9BE9FA" }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── TODAY'S ROUTINE ── */}
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <Text size={13} weight={800}>Today&apos;s Routine</Text>
            <div style={{ display: "flex", background: C.card, borderRadius: 10, padding: 2, border: `1px solid ${C.border}` }}>
              {["AM", "PM"].map(tab => (
                <div key={tab} onClick={() => { setRoutineTab(tab as "AM" | "PM"); setExpandedStep(null); }} style={{
                  padding: "5px 16px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer",
                  background: routineTab === tab ? C.surface : "transparent",
                  color: routineTab === tab ? C.accent : C.muted,
                  transition: "all 0.15s",
                }}>{tab}</div>
              ))}
            </div>
          </div>

          <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {currentSteps.map((step, i) => {
              const isExp = expandedStep === i;
              const isDone = currentStepStates[i];
              return (
                <div key={step.name} style={{ borderBottom: i < currentSteps.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                  <div
                    onClick={() => setExpandedStep(isExp ? null : i)}
                    style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", background: isExp ? "#F0F8FF" : "transparent", cursor: "pointer" }}
                  >
                    <div
                      onClick={(e) => toggleStep(e, i)}
                      style={{
                        width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                        border: `2px solid ${isDone ? C.accent : C.border}`,
                        background: isDone ? C.accentMid : C.surface,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {isDone && <span style={{ fontSize: 10, color: "#0D2A3A", fontWeight: 800 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 17 }}>{step.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                        <Text size={12} weight={700} color={isDone ? C.muted : C.text} style={{ textDecoration: isDone ? "line-through" : "none" }}>{step.name}</Text>
                        <div style={{ padding: "1px 6px", borderRadius: 99, background: step.tagBg, fontSize: 8, fontWeight: 700, color: step.tagColor }}>{step.tag}</div>
                      </div>
                      <Text size={10} color={C.muted}>{step.brand}</Text>
                    </div>
                  </div>
                  {isExp && (
                    <div style={{ padding: "8px 13px 12px 46px", background: "#F0F8FF" }}>
                      <Text size={11} color="#1A5A78" style={{ lineHeight: 1.65 }}>{step.why}</Text>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CORE TOOLS ── */}
        <div style={{ padding: "16px 20px 0" }}>
          <SectionHead label="Core Tools" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "◎", label: "Ingredient Scanner", href: "/scan",     bg: "#E8FFFB", border: "#7ADFC8", iconColor: C.mintDark },
              { icon: "◈", label: "AI Skin Analysis",   href: "/analysis", bg: C.accentLight, border: C.border, iconColor: C.accent },
            ].map(a => (
              <div key={a.label} onClick={() => router.push(a.href)} style={{ background: a.bg, border: `1.5px solid ${a.border}`, borderRadius: 14, padding: "13px", cursor: "pointer" }}>
                <span style={{ fontSize: 22, color: a.iconColor }}>{a.icon}</span>
                <Text size={12} weight={700} style={{ marginTop: 8 }}>{a.label}</Text>
              </div>
            ))}
          </div>
        </div>

      </Box>
    </Box>
  );
};
