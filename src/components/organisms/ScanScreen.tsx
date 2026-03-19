"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box } from "@/components/atoms/Layout";
import { Text } from "@/components/atoms/Text";
import { 
  ChevronLeft, 
  Camera, 
  FileText, 
  Upload, 
  Zap, 
  Check, 
  X, 
  Share2,
  Plus
} from "lucide-react";

export const ScanScreen: React.FC = () => {
  const router = useRouter();
  const [phase, setPhase] = useState<"camera" | "scanning" | "result" | "manual" | "recent-detail">("camera");
  const [scanProgress, setScanProgress] = useState(0);
  const [inputMode, setInputMode] = useState<"camera" | "text">("camera");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [selectedRecent, setSelectedRecent] = useState<any>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => (f + 1) % 60), 100);
    return () => clearInterval(interval);
  }, []);

  const recentScans = [
    { 
      id: 1, 
      name: "COSRX AHA/BHA Clarifying Toner", 
      brand: "COSRX", 
      date: "Today, 9:14 AM", 
      safe: true, 
      conflict: false, 
      emoji: "🧴",
      ingredients: [
        { name: "Glycolic Acid 0.1%", tag: "EXFOLIANT", safe: true },
        { name: "BHA 0.1%", tag: "PORE CARE", safe: true },
        { name: "Niacinamide 3%", tag: "BRIGHTENING", safe: true },
      ],
      summary: "Safe for your combination skin. Low concentration actives — no conflicts with your current routine.",
    },
    { 
      id: 2, 
      name: "The Ordinary Niacinamide 10%", 
      brand: "The Ordinary", 
      date: "Yesterday", 
      safe: true, 
      conflict: false, 
      emoji: "💧",
      ingredients: [
        { name: "Niacinamide 10%", tag: "BRIGHTENING", safe: true },
        { name: "Zinc PCA 1%", tag: "OIL CONTROL", safe: true },
        { name: "Aqua / Water", tag: "BASE", safe: true },
      ],
      summary: "Compatible. Niacinamide at 10% is well-tolerated — avoid combining with Vitamin C serum at the same step.",
    },
    { 
      id: 3, 
      name: "Paula's Choice 2% BHA Exfoliant", 
      brand: "Paula's Choice", 
      date: "Mar 10", 
      safe: false, 
      conflict: true, 
      emoji: "⚗️",
      ingredients: [
        { name: "Salicylic Acid 2%", tag: "EXFOLIANT", safe: true },
        { name: "Methylpropanediol", tag: "PENETRATION", safe: true },
        { name: "Fragrance", tag: "⚠ IRRITANT", safe: false },
      ],
      summary: "⚠ Conflict detected: Fragrance listed. Your profile flags fragrance sensitivity. Use with caution.",
    },
  ];

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

  const triggerManualScan = () => {
    if (!productName.trim()) return;
    setPhase("scanning");
    setScanProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += 3;
      setScanProgress(p);
      if (p >= 100) { clearInterval(t); setTimeout(() => setPhase("result"), 300); }
    }, 70);
  };

  const camNoise = Array.from({ length: 6 }, (_, i) => ({
    x: 10 + ((frame * 7 + i * 43) % 80),
    y: 10 + ((frame * 11 + i * 29) % 60),
    op: 0.04 + (Math.sin((frame + i * 10) * 0.3) * 0.02),
  }));

  if (phase === "recent-detail" && selectedRecent) {
    const r = selectedRecent;
    return (
      <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
        <Box style={{ padding: "4px 20px 14px", display: "flex", alignItems: "center", gap: 12 }}>
          <div onClick={() => { setPhase("camera"); setSelectedRecent(null); }} className="cursor-pointer text-[#4A7A8A]">
            <ChevronLeft size={24} />
          </div>
          <Text size={17} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Scan Result</Text>
          <Text size={10} color={C.muted} style={{ marginLeft: "auto" }}>{r.date}</Text>
        </Box>
        <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
          {/* Header card */}
          <div style={{ background: r.safe ? "#E8FFFB" : "#FFF3E8", border: `1.5px solid ${r.safe ? "#7ADFC8" : "#F0A060"}`, borderRadius: 16, padding: "16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{r.emoji}</div>
            <div className="flex-1">
              <Text size={13} weight={800} style={{ lineHeight: 1.3 }}>{r.name}</Text>
              <Text size={10} color={C.sub} style={{ marginTop: 2 }}>{r.brand}</Text>
              <div style={{ marginTop: 6 }}>
                <span style={{ padding: "2px 9px", borderRadius: 99, background: r.safe ? "#E8FFFB" : "#FDEEE8", fontSize: 10, fontWeight: 700, color: r.safe ? C.mintDark : "#C05000", fontFamily: "'DM Sans', sans-serif", border: `1px solid ${r.safe ? "#7ADFC8" : "#F0A060"}` }}>
                  {r.safe ? "✓ Compatible" : "⚠ Conflict Found"}
                </span>
              </div>
            </div>
          </div>
          {/* Summary */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
            <Text size={11} weight={700} color={C.sub} style={{ letterSpacing: "0.06em", marginBottom: 6 }}>AI SUMMARY</Text>
            <Text size={12} color={C.text} style={{ lineHeight: 1.65 }}>{r.summary}</Text>
          </div>
          {/* Ingredients */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
            <Text size={11} weight={700} color={C.sub} style={{ letterSpacing: "0.06em", marginBottom: 10 }}>KEY INGREDIENTS</Text>
            {r.ingredients.map((ing: any) => (
              <div key={ing.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ing.safe ? C.accentMid : C.danger, flexShrink: 0 }} />
                <Text size={12}>{ing.name}</Text>
                <div style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: 99, background: ing.safe ? C.accentLight : "#FDE8E8", fontSize: 9, fontWeight: 700, color: ing.safe ? "#1A6A88" : C.danger, fontFamily: "'DM Sans', sans-serif" }}>{ing.tag}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "13px", borderRadius: 14, background: C.accentMid, textAlign: "center", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#0D2A3A" }}>
            + Add to Routine
          </div>
        </Box>
      </Box>
    );
  }

  return (
    <Box style={{ height: "100%", background: "#0D1F2A", display: "flex", flexDirection: "column" }}>
      
      {/* ── Header ── */}
      <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => router.push("/home")} className="cursor-pointer text-[#9BE9FA]">
          <ChevronLeft size={24} />
        </div>
        <Text size={17} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif" }}>Ingredient Scanner</Text>
        {/* Mode toggle */}
        <div className="ml-auto flex bg-white/10 rounded-[10px] p-[2px]">
          {[
            { id: "camera", icon: <Camera size={14} />, label: "Camera" },
            { id: "text", icon: <FileText size={14} />, label: "Manual" }
          ].map((m) => (
            <div 
              key={m.id} 
              onClick={() => { 
                setInputMode(m.id as "camera" | "text"); 
                if (phase !== "result") setPhase(m.id === "text" ? "manual" : "camera"); 
              }} 
              style={{
                background: inputMode === m.id ? "rgba(155,233,250,0.2)" : "transparent",
                color: inputMode === m.id ? C.accentMid : "rgba(255,255,255,0.45)",
              }}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer font-sans transition-all flex items-center gap-1"
            >
              <span>{m.icon}</span>
              <span className="capitalize">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CAMERA PHASE — full-bleed live viewport ── */}
      {(phase === "camera" || phase === "scanning") && inputMode === "camera" && (
        <>
          {/* Live camera fill */}
          <div className="relative flex-none h-[320px] overflow-hidden bg-[#0D2A3A]">
            {/* Simulated live feed background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D2A3A] via-[#0A1A24] to-[#0D3240]" />
            {/* Moving noise blobs */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {camNoise.map((n, i) => (
                <ellipse key={i} cx={n.x} cy={n.y} rx={12} ry={8} fill={i % 2 === 0 ? "#9BE9FA" : "#b5ffef"} opacity={n.op} />
              ))}
            </svg>

            {/* Scan frame overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[220px] h-[130px]">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-[#9BE9FA] rounded-tl-sm" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-[#9BE9FA] rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-[#9BE9FA] rounded-bl-sm" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-[#9BE9FA] rounded-br-sm" />
                
                {/* Scan line animation */}
                {phase === "scanning" && (
                  <div 
                    style={{ top: `${scanProgress}%` }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9BE9FA] to-transparent transition-[top] duration-75 rounded-full shadow-[0_0_8px_#9BE9FA]" 
                  />
                )}
                
                {/* Instruction */}
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-[10px] font-sans font-semibold ${phase === "scanning" ? "text-[#9BE9FA]" : "text-[#9BE9FA]/60"}`}>
                    {phase === "scanning" ? `Analysing... ${scanProgress}%` : "Point at ingredient label"}
                  </span>
                </div>
              </div>
            </div>

            {/* Live badge & Torch */}
            <div className="absolute top-3 left-4 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] text-[#9BE9FA]/80 font-bold tracking-wider font-sans">LIVE</span>
            </div>
            <div className="absolute top-3 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
              <Zap size={16} className="text-white" />
            </div>

            {/* Progress bar */}
            {phase === "scanning" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
                <div style={{ width: `${scanProgress}%` }} className="h-full bg-[#9BE9FA] transition-[width] duration-75" />
              </div>
            )}
          </div>

          {/* ── Bottom sheet ── */}
          <div style={{ background: C.bg }} className="flex-1 rounded-t-[20px] px-5 pt-4 pb-32 overflow-y-auto">
            <div style={{ background: C.border }} className="w-9 h-1 rounded-full mx-auto mb-3.5" />

            {/* Primary action */}
            {phase === "camera" && (
              <div 
                onClick={triggerScan} 
                style={{ background: `linear-gradient(120deg, ${C.accentMid}, ${C.accent})` }}
                className="w-full p-3.5 rounded-2xl text-center text-[15px] font-extrabold cursor-pointer font-sans text-[#0D2A3A] shadow-lg shadow-[#9BE9FA]/40 mb-3 hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                ◎  Scan Ingredients
              </div>
            )}
            {phase === "scanning" && (
              <div style={{ background: C.card }} className="w-full p-3.5 rounded-2xl text-center text-[14px] font-bold font-sans text-[#8BBCCC] mb-3 flex items-center justify-center gap-2">
                <div className="animate-spin w-3 h-3 border-2 border-[#8BBCCC] border-t-transparent rounded-full" /> 
                Scanning... {scanProgress}%
              </div>
            )}

            {/* Upload alternative */}
            <div className="flex gap-2 mb-4.5">
              <div style={{ background: C.surface, borderColor: C.border }} className="flex-1 p-2.5 rounded-xl border text-center text-[12px] font-semibold cursor-pointer text-[#0D2A3A] font-sans hover:bg-gray-50 flex flex-col items-center gap-1">
                <Upload size={16} className="mb-1" />
                Upload Photo
              </div>
              <div 
                onClick={() => { setInputMode("text"); setPhase("manual"); }} 
                style={{ background: C.surface, borderColor: C.border }}
                className="flex-1 p-2.5 rounded-xl border text-center text-[12px] font-semibold cursor-pointer text-[#0D2A3A] font-sans hover:bg-gray-50 flex flex-col items-center gap-1"
              >
                <FileText size={16} className="mb-1" />
                Type Manually
              </div>
            </div>

            {/* Recent scans */}
            <div className="flex justify-between items-center mb-2.5">
              <Text size={12} weight={800}>Recent Scans</Text>
              <Text size={10} color={C.accent} weight={600} style={{ cursor: "pointer" }}>See all</Text>
            </div>
            {recentScans.map(s => (
              <div 
                key={s.id} 
                onClick={() => { setSelectedRecent(s); setPhase("recent-detail"); }} 
                style={{ background: C.surface, borderColor: s.conflict ? "#F0C080" : C.border }}
                className="border rounded-xl p-3 mb-2.5 flex items-center gap-3 cursor-pointer hover:shadow-sm transition-shadow"
              >
                <div 
                  style={{ background: s.safe ? "#E8FFFB" : "#FFF3E8" }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                >
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <Text size={12} weight={700} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</Text>
                  <Text size={10} color={C.muted}>{s.date}</Text>
                </div>
                <div className="flex items-center gap-1.5">
                  <span 
                    style={{ 
                      background: s.safe ? "#E8FFFB" : "#FFF3E8", 
                      color: s.safe ? C.mintDark : "#C05000", 
                      borderColor: s.safe ? "#7ADFC8" : "#F0A060" 
                    }}
                    className="px-2 py-0.5 rounded-full text-[9px] font-bold border whitespace-nowrap"
                  >
                    {s.safe ? "✓ Safe" : "⚠ Conflict"}
                  </span>
                  <ChevronLeft size={14} className="text-[#8BBCCC] rotate-180" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── MANUAL TEXT INPUT ── */}
      {phase === "manual" && inputMode === "text" && (
        <div style={{ background: C.bg }} className="flex-1 rounded-t-[20px] mt-0 overflow-y-auto px-5 pt-5 pb-32">
          <div className="flex items-center gap-2 mb-5">
            <div style={{ background: C.accentLight, borderColor: C.border }} className="w-9 h-9 rounded-xl border flex items-center justify-center">
              <span className="text-lg">✏️</span>
            </div>
            <div>
              <Text size={13} weight={800}>Enter Product Details</Text>
              <Text size={10} color={C.sub}>No photo? Describe it and we&apos;ll analyse.</Text>
            </div>
          </div>

          {/* Product name input */}
          <div className="mb-3.5">
            <Text size={11} weight={700} color={C.sub} style={{ letterSpacing: "0.05em", marginBottom: 5 }}>PRODUCT NAME</Text>
            <div style={{ background: C.surface, borderColor: productName ? C.accent : C.border }} className="border-2 rounded-xl p-3 flex items-center gap-2">
              <span className="text-base">🧴</span>
              <input
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="e.g. COSRX Advanced Snail Mucin"
                className="flex-1 border-none outline-none bg-transparent text-[13px] font-sans text-[#0D2A3A] placeholder:text-gray-400"
              />
              {productName && <X size={14} className="text-gray-400 cursor-pointer" onClick={() => setProductName("")} />}
            </div>
          </div>

          {/* Ingredients / description */}
          <div className="mb-5">
            <Text size={11} weight={700} color={C.sub} style={{ letterSpacing: "0.05em", marginBottom: 5 }}>INGREDIENTS OR DESCRIPTION <span className="font-normal normal-case text-[10px]">(optional)</span></Text>
            <div style={{ background: C.surface, borderColor: productDesc ? C.accent : C.border }} className="border-2 rounded-xl p-3">
              <textarea
                value={productDesc}
                onChange={e => setProductDesc(e.target.value)}
                placeholder={"Paste ingredient list or describe the product...\ne.g. Niacinamide, Zinc PCA, Hyaluronic Acid, Fragrance"}
                rows={4}
                className="w-full border-none outline-none bg-transparent text-[12px] font-sans text-[#0D2A3A] resize-none leading-relaxed placeholder:text-gray-400"
              />
            </div>
            <Text size={9} color={C.muted} style={{ marginTop: 5 }}>Tip: Copy directly from the product label or brand website for best results</Text>
          </div>

          <div 
            onClick={triggerManualScan} 
            style={{ 
              background: productName ? `linear-gradient(120deg, ${C.accentMid}, ${C.accent})` : C.card,
              color: productName ? "#0D2A3A" : C.muted,
              boxShadow: productName ? `0 6px 20px ${C.accentMid}55` : "none"
            }}
            className={`w-full p-3.5 rounded-2xl text-center text-[14px] font-extrabold font-sans transition-all ${productName ? "cursor-pointer hover:scale-[1.01]" : "cursor-default"}`}
          >
            {productName ? "◎  Analyse Product" : "Enter product name above"}
          </div>

          {/* Recent scans compact */}
          <div className="mt-5">
            <Text size={12} weight={800} style={{ marginBottom: 10 }}>Recent Scans</Text>
            {recentScans.map(s => (
              <div 
                key={s.id} 
                onClick={() => { setSelectedRecent(s); setPhase("recent-detail"); }} 
                style={{ background: C.surface, borderColor: s.conflict ? "#F0C080" : C.border }}
                className="border rounded-xl p-3 mb-2.5 flex items-center gap-3 cursor-pointer hover:shadow-sm"
              >
                <div style={{ background: s.safe ? "#E8FFFB" : "#FFF3E8" }} className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <Text size={12} weight={700} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</Text>
                  <Text size={10} color={C.muted}>{s.date}</Text>
                </div>
                <ChevronLeft size={14} className="text-[#8BBCCC] rotate-180" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {phase === "result" && (
        <div style={{ background: C.bg }} className="flex-1 overflow-y-auto pb-32">

          {/* ── Hero verdict ── */}
          <div className="bg-gradient-to-br from-[#0A2E20] to-[#0D4A30] p-5 pb-7 relative overflow-hidden">
            <div className="absolute -top-7 -right-7 w-[120px] h-[120px] rounded-full bg-[#b5ffef] opacity-[0.08]" />
            <div className="absolute -bottom-5 -left-5 w-[90px] h-[90px] rounded-full bg-[#b5ffef] opacity-[0.1]" />

            {/* Product identity */}
            <div className="flex items-center gap-3 mb-4.5 relative z-10">
              <div className="w-11 h-11 rounded-[13px] bg-white/10 border border-white/15 flex items-center justify-center text-2xl flex-shrink-0">
                🧴
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-extrabold text-white font-sans leading-tight">
                  {productName || "COSRX Niacinamide Serum"}
                </div>
                <div className="text-[10px] text-[#b5ffef]/70 font-sans mt-0.5">
                  {inputMode === "text" ? "✏️ Entered manually" : "📷 Camera scan · COSRX"}
                </div>
              </div>
            </div>

            {/* Score + verdict */}
            <div className="flex items-center gap-4.5 relative z-10">
              <div className="relative w-[72px] h-[72px] flex-shrink-0">
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
                  <circle cx="36" cy="36" r="30" fill="none" stroke="#4ade80" strokeWidth="6"
                    strokeDasharray={`${0.88 * 188.5} ${188.5}`}
                    strokeLinecap="round" strokeDashoffset="47"
                    transform="rotate(-90 36 36)"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[18px] font-extrabold text-white font-sans leading-none">88</span>
                  <span className="text-[8px] text-white/50 font-sans">/100</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-[16px] font-extrabold text-[#4ade80] font-sans leading-tight mb-1">
                  Great match for<br />your skin
                </div>
                <div className="text-[10px] text-[#b5ffef]/75 font-sans leading-snug">
                  3 actives work well together · 1 minor flag (fragrance) — safe to use with caution
                </div>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex gap-1.5 mt-4 relative z-10">
              {[
                { label: "4 ingredients", sub: "detected", color: "bg-[#9BE9FA]/15", border: "border-[#9BE9FA]/25", text: "text-[#9BE9FA]" },
                { label: "3 compatible", sub: "with your skin", color: "bg-green-400/10", border: "border-green-400/30", text: "text-green-400" },
                { label: "1 flag", sub: "fragrance", color: "bg-orange-400/10", border: "border-orange-400/30", text: "text-orange-400" },
              ].map(p => (
                <div key={p.label} className={`flex-1 px-2 pb-1.5 pt-2 rounded-[10px] border text-center ${p.color} ${p.border}`}>
                  <div className={`text-[11px] font-extrabold font-sans ${p.text}`}>{p.label}</div>
                  <div className="text-[8px] text-white/45 font-sans mt-px">{p.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Body ── */}
          <div className="px-5 pt-4">

            {/* Ingredient breakdown */}
            <div style={{ background: C.surface, borderColor: C.border }} className="border rounded-2xl mb-3.5 overflow-hidden">
              <div style={{ borderColor: C.border }} className="px-4 py-3 border-b">
                <Text size={12} weight={800}>Ingredient Breakdown</Text>
              </div>
              {[
                { name: "Niacinamide 10%",  tag: "BRIGHTENING",  safe: true,  note: "Reduces pores + pigmentation. Works well with your Zinc toner." },
                { name: "Zinc PCA 1%",       tag: "OIL CONTROL",  safe: true,  note: "Balances sebum — ideal for your combination skin type." },
                { name: "Hyaluronic Acid",   tag: "HYDRATION",    safe: true,  note: "Draws moisture into skin. Layer before moisturiser for best effect." },
                { name: "Fragrance",         tag: "⚠ IRRITANT",   safe: false, note: "Your profile flags fragrance sensitivity. Watch for redness or itching." },
              ].map((ing, i, arr) => (
                <div 
                  key={ing.name} 
                  style={{ 
                    borderColor: C.border, 
                    background: ing.safe ? "transparent" : "#FFFAF5" 
                  }} 
                  className={`px-4 py-3 ${i < arr.length - 1 ? "border-b" : ""}`}
                >
                  <div className={`flex items-center gap-2.5 ${ing.note ? "mb-1" : ""}`}>
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${ing.safe ? "bg-[#4ade80]" : "bg-[#D44B3A]"}`} />
                    <Text size={12} weight={700}>{ing.name}</Text>
                    <div 
                      style={{ 
                        background: ing.safe ? C.accentLight : "#FDE8E8", 
                        color: ing.safe ? "#1A6A88" : C.danger 
                      }}
                      className="ml-auto px-2 py-0.5 rounded-full text-[8px] font-bold font-sans flex-shrink-0"
                    >
                      {ing.tag}
                    </div>
                  </div>
                  {ing.note && <Text size={10} color={ing.safe ? C.sub : "#B05000"} style={{ paddingLeft: 19, lineHeight: 1.55 }}>{ing.note}</Text>}
                </div>
              ))}
            </div>

            {/* Routine conflict check */}
            <div style={{ background: C.surface, borderColor: C.border }} className="border rounded-2xl mb-3.5 overflow-hidden">
              <div style={{ borderColor: C.border }} className="px-4 py-3 border-b flex items-center justify-between">
                <Text size={12} weight={800}>Routine Compatibility</Text>
                <span className="px-2 py-0.5 rounded-full bg-[#E8FFFB] text-[9px] font-bold text-[#2A9E80] font-sans border border-[#7ADFC8]">✓ No conflicts</span>
              </div>
              {[
                { step: "Vitamin C Serum", icon: "🍊", ok: true,  note: "Use Niacinamide at a different time — alternating AM/PM is ideal." },
                { step: "BHA Toner",       icon: "⚗️", ok: true,  note: "No conflict. BHA + Niacinamide complement each other." },
                { step: "SPF 50",          icon: "☀️", ok: true,  note: "Apply this before SPF for best absorption." },
              ].map((r, i, arr) => (
                <div key={r.step} style={{ borderColor: C.border }} className={`flex items-start gap-2.5 px-4 py-2.5 ${i < arr.length - 1 ? "border-b" : ""}`}>
                  <span className="text-base flex-shrink-0">{r.icon}</span>
                  <div className="flex-1">
                    <Text size={11} weight={700}>{r.step}</Text>
                    <Text size={10} color={C.sub} style={{ marginTop: 2, lineHeight: 1.5 }}>{r.note}</Text>
                  </div>
                  <Check size={14} className="text-[#4ade80] flex-shrink-0 mt-0.5" />
                </div>
              ))}
            </div>

            {/* Where to use pill */}
            <div style={{ background: C.accentLight, borderColor: C.border }} className="border rounded-xl px-4 py-3 mb-4 flex gap-3 items-center">
              <span className="text-xl">💡</span>
              <div>
                <Text size={11} weight={700} color={C.accent}>Best used in your AM routine</Text>
                <Text size={10} color={C.sub} style={{ marginTop: 2, lineHeight: 1.5 }}>After toner, before moisturiser. Pat gently — do not rub.</Text>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-2.5 mb-3">
              <div
                onClick={() => { setPhase("camera"); setInputMode("camera"); setProductName(""); setProductDesc(""); setScanProgress(0); }}
                style={{ background: C.surface, borderColor: C.border, color: C.text }}
                className="flex-1 p-3 rounded-xl border text-center text-[13px] font-semibold cursor-pointer font-sans hover:bg-gray-50"
              >
                ← Scan Again
              </div>
              <div 
                style={{ background: `linear-gradient(120deg, ${C.accentMid}, ${C.accent})`, boxShadow: `0 4px 16px ${C.accentMid}55` }}
                className="flex-[2] p-3 rounded-xl text-center text-[13px] font-extrabold cursor-pointer font-sans text-[#0D2A3A] hover:scale-[1.01] transition-transform"
              >
                <Plus size={14} className="inline mr-1 -mt-0.5" />
                Add to AM Routine
              </div>
            </div>

            {/* Secondary action: share / derm */}
            <div className="flex gap-2.5 mb-2.5">
              <div style={{ background: C.surface, borderColor: C.border, color: C.sub }} className="flex-1 p-2.5 rounded-xl border text-center text-[12px] font-semibold cursor-pointer font-sans hover:bg-gray-50 flex items-center justify-center gap-1.5">
                <Share2 size={12} /> Share Result
              </div>
              <div onClick={() => router.push("/derm")} className="flex-1 p-2.5 rounded-xl bg-[#FFFDE8] border border-[#E0D840] text-center text-[12px] font-semibold cursor-pointer font-sans text-[#5A5000] hover:bg-[#FFFCE0] flex items-center justify-center gap-1.5">
                <Plus size={12} /> Ask Derm
              </div>
            </div>

          </div>
        </div>
      )}

    </Box>
  );
};
