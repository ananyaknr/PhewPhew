import { useState } from "react";

const W = 390;
const H = 844;

// ─── Palette ──────────────────────────────────────────────
const C = {
  bg: "#F5F2EE",
  surface: "#FFFFFF",
  card: "#F0EDE8",
  border: "#D9D4CC",
  borderLight: "#EAE6DF",
  text: "#1A1714",
  sub: "#7A7269",
  muted: "#B0A89E",
  accent: "#2D5A3D",
  accentLight: "#E8F0EA",
  premium: "#8B5E1A",
  premiumLight: "#F5EDD8",
  danger: "#C0392B",
  tag: "#E8E3DC",
};

// ─── Shared components ────────────────────────────────────
const Box = ({ style, children, onClick }) => (
  <div onClick={onClick} style={{ boxSizing: "border-box", ...style }}>{children}</div>
);

const Rect = ({ w, h, r = 8, color = C.card, style }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: color, flexShrink: 0, ...style }} />
);

const Line = ({ w = "100%", h = 10, r = 5, color = C.border, style }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: color, ...style }} />
);

const Text = ({ size = 13, weight = 400, color = C.text, children, style }) => (
  <div style={{ fontSize: size, fontWeight: weight, color, lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif", ...style }}>{children}</div>
);

const Badge = ({ label, premium }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "3px 10px", borderRadius: 99,
    background: premium ? C.premiumLight : C.accentLight,
    border: `1px solid ${premium ? "#D4A855" : "#A8C4AE"}`,
    fontSize: 10, fontWeight: 700, color: premium ? C.premium : C.accent,
    letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif",
  }}>
    {premium ? "★ PREMIUM" : "FREE"}{label ? ` · ${label}` : ""}
  </div>
);

const NavBar = ({ active, onNav }) => {
  const items = [
    { id: "home", icon: "⌂", label: "Home" },
    { id: "scan", icon: "◎", label: "Scan" },
    { id: "tracker", icon: "◉", label: "Track" },
    { id: "community", icon: "◻", label: "Feed" },
    { id: "shop", icon: "◪", label: "Shop" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 72,
      background: C.surface, borderTop: `1px solid ${C.border}`,
      display: "flex", alignItems: "center",
    }}>
      {items.map(it => (
        <div key={it.id} onClick={() => onNav(it.id)} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
          gap: 2, cursor: "pointer", paddingBottom: 8,
        }}>
          <div style={{ fontSize: 20, color: active === it.id ? C.accent : C.muted }}>{it.icon}</div>
          <div style={{ fontSize: 9, fontWeight: active === it.id ? 700 : 400, color: active === it.id ? C.accent : C.muted, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>{it.label}</div>
        </div>
      ))}
    </div>
  );
};

const StatusBar = () => (
  <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
    <Text size={12} weight={600}>9:41</Text>
    <div style={{ display: "flex", gap: 6 }}>
      <Text size={12}>▲▲▲</Text>
      <Text size={12}>WiFi</Text>
      <Text size={12}>⬜</Text>
    </div>
  </div>
);

// ─── SCREENS ──────────────────────────────────────────────

function OnboardingScreen({ onNav }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to\nSkinAI",
      sub: "Your intelligent skincare companion powered by AI + sensor technology.",
      cta: "Get Started",
    },
    {
      title: "What's your\nskin type?",
      sub: "We'll personalise your analysis and routine.",
      options: ["Oily", "Dry", "Combination", "Sensitive", "Normal"],
      cta: "Continue",
    },
    {
      title: "What are your\nskin goals?",
      sub: "Select all that apply.",
      options: ["Reduce acne", "Anti-aging", "Even tone", "Hydration", "Brightening", "Pore control"],
      cta: "Start My Journey →",
      last: true,
    },
  ];

  const s = steps[step];

  return (
    <Box style={{ height: "100%", background: "linear-gradient(160deg, #EAF2EC 0%, #F5F2EE 60%, #F0EDE8 100%)", display: "flex", flexDirection: "column", position: "relative" }}>
      <StatusBar />

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 99, background: i === step ? C.accent : C.border, transition: "all 0.3s" }} />
        ))}
      </div>

      <Box style={{ flex: 1, display: "flex", flexDirection: "column", padding: "40px 28px 24px" }}>
        {/* Illustration placeholder */}
        <div style={{ width: "100%", height: 200, borderRadius: 24, background: C.card, border: `1px solid ${C.border}`, marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 48 }}>{step === 0 ? "✦" : step === 1 ? "◈" : "◷"}</div>
          <Text size={11} color={C.muted}>Illustration</Text>
        </div>

        <Text size={28} weight={800} style={{ lineHeight: 1.2, whiteSpace: "pre-line", marginBottom: 12, fontFamily: "Syne, sans-serif" }}>{s.title}</Text>
        <Text size={14} color={C.sub} style={{ marginBottom: 28 }}>{s.sub}</Text>

        {s.options && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {s.options.map(o => (
              <div key={o} style={{ padding: "8px 16px", borderRadius: 99, border: `1.5px solid ${C.border}`, background: C.surface, fontSize: 13, color: C.text, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{o}</div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "auto" }}>
          <div
            onClick={() => s.last ? onNav("home") : setStep(step + 1)}
            style={{ width: "100%", padding: "16px", borderRadius: 14, background: C.accent, color: "#fff", textAlign: "center", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            {s.cta}
          </div>
          {step > 0 && (
            <div onClick={() => setStep(step - 1)} style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: C.sub, cursor: "pointer" }}>← Back</div>
          )}
        </div>
      </Box>
    </Box>
  );
}

// function HomeScreen({ onNav }) {
//   return (
//       <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
//         <StatusBar />
//         <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
          
//           {/* Header with Integrated Environment Status */}
//           <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, marginTop: 4 }}>
//             <div>
//               <Box style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
//                 <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e74c3c" }} />
//                 <Text size={11} weight={700} color="#C0392B">AQI 142 · UNHEALTHY</Text>
//               </Box>
//               <Text size={22} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Hi Nida, stay protected</Text>
//             </div>
//             <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <Text size={18}>👤</Text>
//             </div>
//           </Box>

//           {/* Adaptive Routine Module */}
//           <Box style={{ background: C.surface, border: `2px solid ${C.accent}`, borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 4px 12px rgba(45, 90, 61, 0.08)" }}>
//             <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//               <div>
//                 <Text size={14} weight={700}>Today's Smart Routine</Text>
//                 <Text size={11} color={C.sub}>AI-Adjusted for Pollution & UV</Text>
//               </div>
//               <Badge label="AM" />
//             </Box>

//             {/* Integrated Steps */}
//             {[
//               { item: "Gentle Cleanser", note: "Double cleanse recommended", status: "done" },
//               { item: "Barrier Repair Cream", note: "Weather Swap: Replaced AHA Toner", status: "active", highlight: true },
//               { item: "Vitamin C Serum", note: "Antioxidant boost", status: "pending" },
//               { item: "SPF 50+ PA++++", note: "Apply extra layer (UV 10)", status: "pending", highlight: true },
//             ].map((step, i) => (
//               <Box key={step.item} style={{ 
//                 display: "flex", alignItems: "center", gap: 12, padding: "10px", 
//                 borderRadius: 12, marginBottom: 8,
//                 background: step.highlight ? C.accentLight : "transparent",
//                 border: step.highlight ? `1px dashed ${C.accent}` : "1px solid transparent"
//               }}>
//                 <div style={{ 
//                   width: 22, height: 22, borderRadius: 6, 
//                   border: `2px solid ${step.status === "done" ? C.accent : C.border}`,
//                   background: step.status === "done" ? C.accent : "transparent",
//                   display: "flex", alignItems: "center", justifyContent: "center"
//                 }}>
//                   {step.status === "done" && <Text size={12} color="#fff">✓</Text>}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <Text size={13} weight={step.status === "active" ? 700 : 400} color={step.status === "done" ? C.muted : C.text}>{step.item}</Text>
//                   <Text size={10} color={step.highlight ? C.accent : C.sub}>{step.note}</Text>
//                 </div>
//               </Box>
//             ))}
            
//             <div style={{ 
//               marginTop: 12, padding: "14px", borderRadius: 12, background: C.accent, 
//               color: "#fff", textAlign: "center", fontSize: 14, fontWeight: 700, cursor: "pointer" 
//             }}>
//               Start Guided Routine +10 pts
//             </div>
//           </Box>

//           {/* Action Grid */}
//           <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//             <Box onClick={() => onNav("analysis")} style={{ background: "#1A1714", borderRadius: 16, padding: "16px", cursor: "pointer" }}>
//                 <Text size={24}>◈</Text>
//                 <Text size={13} weight={700} color="#fff" style={{ marginTop: 8 }}>Mirror Analysis</Text>
//                 <Text size={11} color="#9ca3af">2-step sensor scan</Text>
//             </Box>
//             <Box onClick={() => onNav("scan")} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", cursor: "pointer" }}>
//                 <Text size={24}>◎</Text>
//                 <Text size={13} weight={700} style={{ marginTop: 8 }}>Scan Product</Text>
//                 <Text size={11} color={C.sub}>Check compatibility</Text>
//             </Box>
//           </Box>
//         </Box>
//         <NavBar active="home" onNav={onNav} />
//       </Box>
//     );
//   }

function HomeScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>

        {/* Header */}
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, marginTop: 4 }}>
          <div>
            <Text size={12} color={C.muted}>Good morning ✦</Text>
            <Text size={22} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Nida's Dashboard</Text>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Text size={18}>👤</Text>
          </div>
        </Box>

        {/* Weather/PM2.5 alert banner */}
        <Box style={{ background: "#FFF8E8", border: `1px solid #E8C97A`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }} onClick={() => onNav("weather")}>
          <Text size={22}>⚠️</Text>
          <div>
            <Text size={12} weight={700} color="#8B6914">PM2.5 Alert — Today</Text>
            <Text size={11} color="#A07820">AQI 142 · Apply extra SPF, skip actives</Text>
          </div>
          <Text size={18} color={C.muted} style={{ marginLeft: "auto" }}>›</Text>
        </Box>

        {/* Daily To-do */}
        <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text size={13} weight={700}>Today's Routine</Text>
            <Badge label="AM" />
          </Box>
          {["Cleanser", "Toner", "Vitamin C Serum", "Moisturiser", "SPF 50"].map((item, i) => (
            <Box key={item} style={{ display: "flex", alignItems: "center", gap: 12, paddingVertical: 6, marginBottom: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${i < 3 ? C.accent : C.border}`, background: i < 3 ? C.accentLight : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i < 3 && <Text size={10} color={C.accent}>✓</Text>}
              </div>
              <Text size={13} color={i < 3 ? C.muted : C.text} style={{ textDecoration: i < 3 ? "line-through" : "none" }}>{item}</Text>
              <Text size={11} color={C.muted} style={{ marginLeft: "auto" }}>Step {i + 1}</Text>
            </Box>
          ))}
        </Box>

        {/* Quick Actions */}
        <Text size={13} weight={700} style={{ marginBottom: 10 }}>Quick Actions</Text>
        <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { icon: "◎", label: "Scan Ingredient", sub: "Check compatibility", screen: "scan", free: true },
            { icon: "◈", label: "Skin Analysis", sub: "AI + Sensor scan", screen: "analysis", free: false },
            { icon: "◷", label: "Expiry Tracker", sub: "2 expiring soon", screen: "routine", free: true },
            { icon: "◆", label: "Loyalty Points", sub: "1,240 pts", screen: "loyalty", free: true },
          ].map(a => (
            <Box key={a.label} onClick={() => onNav(a.screen)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px", cursor: "pointer" }}>
              <Text size={22}>{a.icon}</Text>
              <Text size={12} weight={700} style={{ marginTop: 6 }}>{a.label}</Text>
              <Text size={11} color={C.sub}>{a.sub}</Text>
              <div style={{ marginTop: 8 }}><Badge premium={!a.free} /></div>
            </Box>
          ))}
        </Box>

        {/* Skin Score */}
        <Box onClick={() => onNav("tracker")} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16, cursor: "pointer" }}>
          <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text size={13} weight={700}>Skin Score</Text>
            <Badge premium label="TRACK" />
          </Box>
          <Box style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: `4px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <Text size={18} weight={800} color={C.accent}>74</Text>
              <Text size={8} color={C.sub}>/100</Text>
            </div>
            <div style={{ flex: 1 }}>
              {["Hydration", "Clarity", "Texture"].map((m, i) => (
                <Box key={m} style={{ marginBottom: 6 }}>
                  <Box style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text size={10} color={C.sub}>{m}</Text>
                    <Text size={10} color={C.sub}>{[78, 65, 82][i]}%</Text>
                  </Box>
                  <div style={{ height: 5, borderRadius: 99, background: C.card, marginTop: 2 }}>
                    <div style={{ height: "100%", width: `${[78, 65, 82][i]}%`, borderRadius: 99, background: C.accent }} />
                  </div>
                </Box>
              ))}
            </div>
          </Box>
        </Box>
      </Box>
      <NavBar active="home" onNav={onNav} />
    </Box>
  );
}

function ScanScreen({ onNav }) {
  const [phase, setPhase] = useState("idle"); // idle | scanning | result

  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Ingredient Scanner</Text>
        <Badge style={{ marginLeft: "auto" }} />
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>

        {phase === "idle" && (
          <>
            {/* Camera viewfinder */}
            <div style={{ width: "100%", height: 260, borderRadius: 20, background: "#1A1714", position: "relative", overflow: "hidden", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, #222 0px, #222 10px, #1A1714 10px, #1A1714 20px)", opacity: 0.4 }} />
              <div style={{ width: 180, height: 120, border: "2px dashed #4ade80", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                <Text size={11} color="#4ade80" style={{ textAlign: "center" }}>Point camera at\ningredient label</Text>
              </div>
              <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#4ade8099", fontFamily: "'DM Sans', sans-serif" }}>AUTO-DETECT · LIVE</div>
            </div>

            <Box style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <div onClick={() => setPhase("result")} style={{ flex: 1, padding: "14px", borderRadius: 14, background: C.accent, color: "#fff", textAlign: "center", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                ◎ Scan Now
              </div>
              <div style={{ flex: 1, padding: "14px", borderRadius: 14, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.text, fontFamily: "'DM Sans', sans-serif" }}>
                Upload Photo
              </div>
            </Box>

            <Text size={13} weight={700} style={{ marginBottom: 10 }}>Recent Scans</Text>
            {[
              { name: "Cosrx AHA/BHA Toner", status: "✓ Safe", color: C.accent },
              { name: "The Ordinary Niacinamide", status: "✓ Safe", color: C.accent },
              { name: "Paula's Choice BHA", status: "⚠ Conflict", color: "#B8860B" },
            ].map(s => (
              <Box key={s.name} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", marginBottom: 10, display: "flex", alignItems: "center" }}>
                <Rect w={36} h={36} r={8} color={C.card} style={{ marginRight: 12 }} />
                <div>
                  <Text size={13} weight={600}>{s.name}</Text>
                  <Text size={11} color={s.color} weight={600}>{s.status}</Text>
                </div>
                <Text size={18} color={C.muted} style={{ marginLeft: "auto" }}>›</Text>
              </Box>
            ))}
          </>
        )}

        {phase === "result" && (
          <>
            <Box style={{ background: "#EDFAF0", border: `1px solid #A8D5B5`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
              <Box style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Text size={22}>✓</Text>
                <Text size={15} weight={700} color={C.accent}>Compatible with your skin</Text>
              </Box>
              <Text size={13} color={C.sub}>Scanned product matches your skin profile. No conflicts detected.</Text>
            </Box>

            <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
              <Text size={13} weight={700} style={{ marginBottom: 12 }}>Detected Ingredients</Text>
              {[
                { name: "Niacinamide 10%", tag: "BRIGHTENING", safe: true },
                { name: "Zinc PCA 1%", tag: "OIL CONTROL", safe: true },
                { name: "Hyaluronic Acid", tag: "HYDRATION", safe: true },
                { name: "Fragrance", tag: "IRRITANT RISK", safe: false },
              ].map(ing => (
                <Box key={ing.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ing.safe ? C.accent : "#C0392B", flexShrink: 0 }} />
                  <Text size={13}>{ing.name}</Text>
                  <div style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: 99, background: ing.safe ? C.accentLight : "#FDE8E8", fontSize: 9, fontWeight: 700, color: ing.safe ? C.accent : "#C0392B", fontFamily: "'DM Sans', sans-serif" }}>{ing.tag}</div>
                </Box>
              ))}
            </Box>

            <Box style={{ display: "flex", gap: 10 }}>
              <div onClick={() => setPhase("idle")} style={{ flex: 1, padding: "14px", borderRadius: 14, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                ← Scan Again
              </div>
              <div style={{ flex: 1, padding: "14px", borderRadius: 14, background: C.accent, color: "#fff", textAlign: "center", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Save to Routine
              </div>
            </Box>
          </>
        )}
      </Box>
      <NavBar active="scan" onNav={onNav} />
    </Box>
  );
}

// function AnalysisScreen({ onNav }) {
// const [step, setStep] = useState(1); // 1: Vision, 2: Sensor
//   return (
//     <Box style={{ height: "100%", background: "#000", display: "flex", flexDirection: "column" }}>
//       <StatusBar />
//       <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12, zIndex: 10 }}>
//         <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: "#fff" }}>‹</div>
//         <Text size={18} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif" }}>Mirror Analysis</Text>
//       </Box>

//       {/* Full Screen Viewfinder */}
//       <Box style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        
//         {/* Facial Overlay Guide */}
//         <div style={{ 
//           width: 260, height: 340, borderRadius: "150px 150px 120px 120px", 
//           border: `2px solid ${step === 1 ? "#4ade80" : "#ffffff44"}`, 
//           position: "relative", marginBottom: 40,
//           transition: "all 0.5s"
//         }}>
//           {step === 1 && <div style={{ position: "absolute", top: "20%", left: 0, right: 0, height: 2, background: "#4ade80", boxShadow: "0 0 15px #4ade80", animation: "scanLine 2s infinite" }} />}
//           {step === 2 && (
//              <div style={{ position: "absolute", right: -20, top: "50%", width: 60, height: 60, borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid #fff", animation: "pulse 1.5s infinite" }}>
//                <Text size={10} weight={700}>PLACE SENSOR</Text>
//              </div>
//           )}
//         </div>

//         {/* Step Instructions */}
//         <Box style={{ position: "absolute", bottom: 40, left: 20, right: 20, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", padding: "24px", borderRadius: 24, border: "1px solid rgba(255,255,255,0.2)" }}>
//            <Text size={10} color={C.accent} weight={800} style={{ letterSpacing: "0.1em", marginBottom: 8 }}>
//              STEP {step} OF 2: {step === 1 ? "VISUAL MAPPING" : "HYDRATION CHECK"}
//            </Text>
//            <Text size={15} color="#fff" weight={600} style={{ marginBottom: 4 }}>
//              {step === 1 ? "Keep your face within the frame" : "Apply sensor to your right cheek"}
//            </Text>
//            <Text size={12} color="#9ca3af" style={{ marginBottom: 20 }}>
//              {step === 1 ? "Prop your phone against a mirror for best results." : "Wait for the haptic vibration to finish (3s)."}
//            </Text>
           
//            <div 
//              onClick={() => step === 1 ? setStep(2) : onNav("tracker")}
//              style={{ width: "100%", padding: "16px", borderRadius: 14, background: step === 1 ? "#fff" : C.accent, color: step === 1 ? "#000" : "#fff", textAlign: "center", fontWeight: 700, cursor: "pointer" }}
//            >
//              {step === 1 ? "Capture Visual Map" : "Complete Analysis"}
//            </div>
//         </Box>
//       </Box>
//       <style>{`
//         @keyframes scanLine { 0% { top: 20%; } 50% { top: 80%; } 100% { top: 20%; } }
//         @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
//       `}</style>
//       </Box>
//   );
// }

function AnalysisScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>AI Skin Analysis</Text>
        <div style={{ marginLeft: "auto" }}><Badge premium /></div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>

        {/* Sensor + Camera combo */}
        <Box style={{ background: "#1A1714", borderRadius: 20, padding: "20px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 30%, #2D5A3D33, transparent 60%)" }} />
          <Text size={10} color="#4ade80" weight={700} style={{ letterSpacing: "0.12em", marginBottom: 12 }}>SENSOR + AI ACTIVE</Text>
          <Box style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 120, borderRadius: 12, background: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
              <Text size={28} color="#4ade80">◎</Text>
              <Text size={10} color="#6b7280">Camera Feed</Text>
            </div>
            <div style={{ flex: 1, height: 120, borderRadius: 12, background: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4, border: "1px solid #2D5A3D" }}>
              <Text size={28} color="#f59e0b">◈</Text>
              <Text size={10} color="#6b7280">Sensor Data</Text>
              <Text size={9} color="#4ade80">Hydration: 62%</Text>
            </div>
          </Box>
          <div style={{ padding: "12px 16px", borderRadius: 12, background: "#ffffff11", border: "1px solid #ffffff22" }}>
            <Text size={12} color="#e2e8f0">Place sensor gently against cheek for 3 seconds while camera captures facial map.</Text>
          </div>
        </Box>

        {/* Results section */}
        <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={13} weight={700} style={{ marginBottom: 14 }}>Analysis Results — Explainable AI</Text>
          {[
            { label: "Skin Hydration", val: 62, explain: "Slightly below optimal. Sensor confirms surface dryness." },
            { label: "Sebum Level", val: 48, explain: "Moderate oil production in T-zone detected." },
            { label: "Pore Visibility", val: 35, explain: "Low — skin texture is smooth." },
          ].map(r => (
            <Box key={r.label} style={{ marginBottom: 14 }}>
              <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <Text size={12} weight={600}>{r.label}</Text>
                <Text size={12} color={C.accent} weight={700}>{r.val}%</Text>
              </Box>
              <div style={{ height: 8, borderRadius: 99, background: C.card }}>
                <div style={{ height: "100%", width: `${r.val}%`, borderRadius: 99, background: C.accent }} />
              </div>
              <Text size={11} color={C.sub} style={{ marginTop: 4 }}>💡 {r.explain}</Text>
            </Box>
          ))}
        </Box>

        {/* Derm CTA */}
        <Box onClick={() => onNav("derm")} style={{ background: C.premiumLight, border: `1px solid #D4A855`, borderRadius: 16, padding: "16px", marginBottom: 16, cursor: "pointer" }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Text size={28}>✚</Text>
            <div>
              <Text size={13} weight={700} color={C.premium}>Consult a Dermatologist</Text>
              <Text size={11} color="#A07820">Discuss your results with a pro · ฿300/session</Text>
            </div>
            <Text size={18} color={C.muted} style={{ marginLeft: "auto" }}>›</Text>
          </Box>
        </Box>
      </Box>
      <NavBar active="scan" onNav={onNav} />
    </Box>
  );
}

function TrackerScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Progress Dashboard</Text>
        <div style={{ marginLeft: "auto" }}><Badge premium /></div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>

        {/* Before / After */}
        <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={13} weight={700} style={{ marginBottom: 12 }}>Before / After — 30 Days</Text>
          <Box style={{ display: "flex", gap: 10 }}>
            {["Week 1", "Week 4"].map((w, i) => (
              <div key={w} style={{ flex: 1 }}>
                <Rect w="100%" h={140} r={12} color={C.card} style={{ marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Text size={11} color={C.muted}>{w}</Text>
                </Rect>
                <Text size={10} color={C.sub} style={{ textAlign: "center" }}>{w}</Text>
              </div>
            ))}
          </Box>
          <Box style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: C.accentLight }}>
            <Text size={12} color={C.accent} weight={600}>🎉 Skin clarity improved 18% over 30 days!</Text>
          </Box>
        </Box>

        {/* Score Trend */}
        <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={13} weight={700} style={{ marginBottom: 12 }}>Skin Score Trend</Text>
          <div style={{ height: 100, display: "flex", alignItems: "flex-end", gap: 6 }}>
            {[55, 58, 62, 60, 67, 70, 74].map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", height: v * 1.2, borderRadius: "6px 6px 0 0", background: i === 6 ? C.accent : C.accentLight }} />
                <Text size={8} color={C.muted}>{["W1","W2","W3","W4","W5","W6","W7"][i]}</Text>
              </div>
            ))}
          </div>
        </Box>

        {/* Milestones */}
        <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={13} weight={700} style={{ marginBottom: 12 }}>Milestones</Text>
          {[
            { icon: "◆", label: "7-Day Streak", done: true },
            { icon: "◈", label: "First AI Analysis", done: true },
            { icon: "◉", label: "30-Day Check-in", done: false },
          ].map(m => (
            <Box key={m.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <Text size={18} color={m.done ? C.accent : C.muted}>{m.icon}</Text>
              <Text size={13} color={m.done ? C.text : C.muted}>{m.label}</Text>
              {m.done && <Text size={11} color={C.accent} style={{ marginLeft: "auto" }}>✓ Earned</Text>}
            </Box>
          ))}
        </Box>
      </Box>
      <NavBar active="tracker" onNav={onNav} />
    </Box>
  );
}

function CommunityScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Community</Text>
        <Badge style={{ marginLeft: "auto" }} />
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>

        {/* Trending tags */}
        <Box style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" }}>
          {["#OilyGlassSkin", "#NiacinamideLove", "#SPFDaily", "#FragranceFree", "#Trending"].map(t => (
            <div key={t} style={{ padding: "6px 14px", borderRadius: 99, background: C.surface, border: `1px solid ${C.border}`, fontSize: 11, color: C.text, whiteSpace: "nowrap", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{t}</div>
          ))}
        </Box>

        {/* Feed posts */}
        {[
          { user: "Mint_skincare", score: 82, review: "Cosrx Snail Essence is 🔥 for combination skin — cleared my texture in 2 weeks!", upvotes: 142 },
          { user: "DermNerd_TH", score: 91, review: "Reminder: never mix retinol + vitamin C in same AM routine. Conflict alert caught this for me!", upvotes: 289 },
          { user: "GlassSkinGoal", score: 76, review: "Just got my AI analysis — sensor picked up dehydration I didn't even feel. Wild.", upvotes: 87 },
        ].map((p, i) => (
          <Box key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 14 }}>
            <Box style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Rect w={36} h={36} r={18} color={C.card} />
              <div>
                <Text size={13} weight={700}>{p.user}</Text>
                <Text size={10} color={C.sub}>Skin Score {p.score}/100</Text>
              </div>
              <div style={{ marginLeft: "auto", padding: "4px 10px", borderRadius: 99, background: C.accentLight, fontSize: 10, fontWeight: 700, color: C.accent, fontFamily: "'DM Sans', sans-serif" }}>Verified</div>
            </Box>
            <Text size={13} color={C.text} style={{ marginBottom: 10, lineHeight: 1.5 }}>{p.review}</Text>
            <Box style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Text size={12} color={C.sub}>▲ {p.upvotes} upvotes</Text>
              <Text size={12} color={C.sub}>💬 Reply</Text>
              <Text size={12} color={C.sub}>⇧ Share</Text>
            </Box>
          </Box>
        ))}
      </Box>
      <NavBar active="community" onNav={onNav} />
    </Box>
  );
}

function DermScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("analysis")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Derm Consultation</Text>
        <div style={{ marginLeft: "auto" }}><Badge premium /></div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
        <Box style={{ background: C.premiumLight, border: `1px solid #D4A855`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={12} color={C.premium} weight={700} style={{ marginBottom: 4 }}>PRE-LOADED FROM YOUR ANALYSIS</Text>
          <Text size={13} color="#7A5A14">Your Skin Score, sensor data, and ingredient conflicts will be shared with your dermatologist before the session.</Text>
        </Box>

        <Text size={13} weight={700} style={{ marginBottom: 12 }}>Available Dermatologists</Text>
        {[
          { name: "Dr. Siriporn K.", spec: "Acne · Pigmentation", rate: "฿350 / 30 min", avail: "Today 2PM" },
          { name: "Dr. Nattapol W.", spec: "Anti-aging · Sensitive", rate: "฿500 / 30 min", avail: "Tomorrow 10AM" },
        ].map(d => (
          <Box key={d.name} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 14 }}>
            <Box style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <Rect w={52} h={52} r={26} color={C.card} />
              <div>
                <Text size={14} weight={700}>{d.name}</Text>
                <Text size={11} color={C.sub}>{d.spec}</Text>
                <Text size={11} color={C.accent} weight={600}>{d.rate}</Text>
              </div>
            </Box>
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text size={11} color={C.sub}>Next: {d.avail}</Text>
              <div style={{ padding: "8px 18px", borderRadius: 10, background: C.accent, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Book Now</div>
            </Box>
          </Box>
        ))}

        <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px" }}>
          <Text size={13} weight={700} style={{ marginBottom: 10 }}>Past Consultation</Text>
          <Box style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <Rect w={40} h={40} r={20} color={C.card} />
            <div>
              <Text size={13} weight={600}>Dr. Siriporn K.</Text>
              <Text size={11} color={C.sub}>Feb 15, 2026 · 30 min</Text>
            </div>
            <Text size={12} color={C.accent} style={{ marginLeft: "auto" }}>View Summary</Text>
          </Box>
        </Box>
      </Box>
      <NavBar active="scan" onNav={onNav} />
    </Box>
  );
}

function RoutineScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Routine + Expiry</Text>
        <Badge style={{ marginLeft: "auto" }} />
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>

        {/* Expiry alerts */}
        <Box style={{ background: "#FFF2F2", border: `1px solid #F5AAAA`, borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
          <Text size={12} weight={700} color={C.danger}>⚠ 2 Products Expiring Soon</Text>
          {["Vitamin C Serum — 5 days", "Eye Cream — 12 days"].map(e => (
            <Text key={e} size={12} color="#C0392B" style={{ marginTop: 4 }}>• {e}</Text>
          ))}
        </Box>

        {["AM Routine", "PM Routine"].map(r => (
          <Box key={r} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <Text size={13} weight={700}>{r}</Text>
              <Text size={12} color={C.accent} style={{ cursor: "pointer" }}>+ Add Step</Text>
            </Box>
            {["Cleanser", "Serum", "Moisturiser", r === "AM Routine" ? "SPF 50" : "Retinol 0.5%"].map((s, i) => (
              <Box key={s} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Text size={12} color={C.accent} weight={700}>{i + 1}</Text>
                </div>
                <Text size={13}>{s}</Text>
                <Text size={11} color={C.muted} style={{ marginLeft: "auto" }}>Exp: {["Apr '26", "Jan '27", "Dec '26", "Mar '26"][i]}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <NavBar active="home" onNav={onNav} />
    </Box>
  );
}

function LoyaltyScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Loyalty Program</Text>
        <Badge style={{ marginLeft: "auto" }} />
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>

        {/* Points card */}
        <Box style={{ background: "linear-gradient(135deg, #2D5A3D, #1a3a27)", borderRadius: 20, padding: "24px", marginBottom: 20 }}>
          <Text size={11} color="#A8D5B5" weight={600} style={{ letterSpacing: "0.1em", marginBottom: 6 }}>TOTAL POINTS</Text>
          <Text size={42} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif", marginBottom: 4 }}>1,240</Text>
          <Text size={12} color="#A8D5B5">Gold Tier · 260 pts to Platinum</Text>
          <div style={{ marginTop: 14, height: 6, borderRadius: 99, background: "#ffffff22" }}>
            <div style={{ height: "100%", width: "82%", borderRadius: 99, background: "#4ade80" }} />
          </div>
        </Box>

        {/* Earn ways */}
        <Text size={13} weight={700} style={{ marginBottom: 10 }}>Earn Points</Text>
        {[
          { icon: "◎", label: "Ingredient Scan", pts: "+5 pts each" },
          { icon: "◻", label: "Leave a Review", pts: "+20 pts" },
          { icon: "◪", label: "Purchase Product", pts: "+50 pts / ฿100" },
          { icon: "◷", label: "Daily Streak", pts: "+10 pts / day" },
        ].map(e => (
          <Box key={e.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <Text size={20}>{e.icon}</Text>
            <Text size={13}>{e.label}</Text>
            <div style={{ marginLeft: "auto", padding: "3px 10px", borderRadius: 99, background: C.accentLight, fontSize: 11, fontWeight: 700, color: C.accent, fontFamily: "'DM Sans', sans-serif" }}>{e.pts}</div>
          </Box>
        ))}

        <Text size={13} weight={700} style={{ marginBottom: 10, marginTop: 6 }}>Redeem Rewards</Text>
        {[
          { label: "฿50 Shop Voucher", pts: "500 pts" },
          { label: "1 Free Derm Session", pts: "1,000 pts" },
          { label: "Premium Month Free", pts: "2,000 pts" },
        ].map(r => (
          <Box key={r.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", marginBottom: 10, display: "flex", alignItems: "center" }}>
            <div>
              <Text size={13} weight={600}>{r.label}</Text>
              <Text size={11} color={C.sub}>{r.pts}</Text>
            </div>
            <div style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: 10, background: C.accent, fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Redeem</div>
          </Box>
        ))}
      </Box>
      <NavBar active="home" onNav={onNav} />
    </Box>
  );
}

function ShopScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Shop</Text>
        <Badge style={{ marginLeft: "auto" }} />
        <Text size={20} style={{ cursor: "pointer" }}>🛒</Text>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>

        <Box style={{ background: C.accentLight, border: `1px solid #A8C4AE`, borderRadius: 14, padding: "12px 16px", marginBottom: 16 }}>
          <Text size={12} weight={700} color={C.accent}>✦ Personalised for Combination Skin</Text>
          <Text size={11} color="#5A8A68">Based on your AI analysis + scan history</Text>
        </Box>

        <Text size={13} weight={700} style={{ marginBottom: 10 }}>Recommended for You</Text>
        <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { name: "Cosrx BHA Blackhead Power Liquid", price: "฿490", compat: "98% match" },
            { name: "The Ordinary Hyaluronic Acid 2%", price: "฿350", compat: "95% match" },
            { name: "Skin1004 Centella Ampoule", price: "฿620", compat: "91% match" },
            { name: "Round Lab Birch Moisturiser", price: "฿780", compat: "88% match" },
          ].map(p => (
            <Box key={p.name} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              <Rect w="100%" h={110} r={0} color={C.card} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Text size={10} color={C.muted}>Product Image</Text>
              </Rect>
              <div style={{ padding: "10px" }}>
                <Text size={11} weight={600} style={{ lineHeight: 1.3, marginBottom: 4 }}>{p.name}</Text>
                <Text size={12} weight={700} color={C.accent}>{p.price}</Text>
                <div style={{ marginTop: 6, padding: "2px 8px", borderRadius: 99, background: C.accentLight, display: "inline-block", fontSize: 9, fontWeight: 700, color: C.accent, fontFamily: "'DM Sans', sans-serif" }}>✓ {p.compat}</div>
              </div>
            </Box>
          ))}
        </Box>

        {/* Use points banner */}
        <Box style={{ background: C.premiumLight, border: `1px solid #D4A855`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }} onClick={() => onNav("loyalty")}>
          <Text size={22}>◆</Text>
          <div>
            <Text size={13} weight={700} color={C.premium}>Use 1,240 Loyalty Points</Text>
            <Text size={11} color="#A07820">Apply towards your next purchase</Text>
          </div>
          <Text size={18} color={C.muted} style={{ marginLeft: "auto" }}>›</Text>
        </Box>
      </Box>
      <NavBar active="shop" onNav={onNav} />
    </Box>
  );
}

function WeatherScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Real-Time Adapter</Text>
        <Badge style={{ marginLeft: "auto" }} />
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
        <Box style={{ background: "#1A1714", borderRadius: 20, padding: "24px", marginBottom: 16 }}>
          <Text size={10} color="#6b7280" weight={600} style={{ letterSpacing: "0.12em", marginBottom: 8 }}>BANGKOK · TODAY</Text>
          <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Text size={48} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif" }}>34°C</Text>
              <Text size={13} color="#9ca3af">Hazy Sunshine</Text>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ padding: "6px 14px", borderRadius: 99, background: "#C0392B33", border: "1px solid #C0392B66", marginBottom: 8 }}>
                <Text size={12} color="#e74c3c" weight={700}>AQI 142 · Unhealthy</Text>
              </div>
              <Text size={11} color="#6b7280">UV Index: 10 (Very High)</Text>
            </div>
          </Box>
        </Box>

        <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={13} weight={700} style={{ marginBottom: 12 }}>Skin Routine Adjustments for Today</Text>
          {[
            { icon: "☀️", tip: "Apply SPF 50+ before going outdoors — UV very high today" },
            { icon: "💧", tip: "Increase hydrating serum application — humidity low" },
            { icon: "🚫", tip: "Skip actives (AHA/BHA) — skin barrier may be stressed" },
            { icon: "😷", tip: "PM2.5 detected — double cleanse tonight" },
          ].map(t => (
            <Box key={t.tip} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
              <Text size={18}>{t.icon}</Text>
              <Text size={13} color={C.sub} style={{ lineHeight: 1.5 }}>{t.tip}</Text>
            </Box>
          ))}
        </Box>

        <Box style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px" }}>
          <Text size={13} weight={700} style={{ marginBottom: 10 }}>Auto-Adjusted Your Routine</Text>
          <Text size={12} color={C.sub} style={{ marginBottom: 10 }}>We removed AHA Toner and added Barrier Repair Cream for today's conditions.</Text>
          <Box style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, padding: "10px", borderRadius: 10, background: C.accentLight, textAlign: "center" }}>
              <Text size={12} color={C.accent} weight={600}>View Adjusted AM</Text>
            </div>
            <div onClick={() => onNav("routine")} style={{ flex: 1, padding: "10px", borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", cursor: "pointer" }}>
              <Text size={12} weight={600}>Edit Manually</Text>
            </div>
          </Box>
        </Box>
      </Box>
      <NavBar active="home" onNav={onNav} />
    </Box>
  );
}

function DailyScreen({ onNav }) {
  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Daily Wellness Tips</Text>
        <div style={{ marginLeft: "auto" }}><Badge premium /></div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
        {[
          { icon: "💧", title: "ดื่มน้ำ 8 แก้ว", sub: "You've had 3/8 glasses today", progress: 38 },
          { icon: "😴", title: "Sleep 7–8 hrs", sub: "Good sleep = skin repair. Target: 10PM", progress: 0 },
          { icon: "🥦", title: "Eat antioxidants", sub: "Berries, greens help collagen", progress: 60 },
          { icon: "☀️", title: "Apply SPF", sub: "Every 2 hours outdoors — UV 10 today", progress: 100 },
        ].map(t => (
          <Box key={t.title} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 14 }}>
            <Box style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <Text size={26}>{t.icon}</Text>
              <div>
                <Text size={14} weight={700}>{t.title}</Text>
                <Text size={11} color={C.sub}>{t.sub}</Text>
              </div>
            </Box>
            {t.progress > 0 && (
              <div style={{ height: 6, borderRadius: 99, background: C.card }}>
                <div style={{ height: "100%", width: `${t.progress}%`, borderRadius: 99, background: t.progress === 100 ? C.accent : "#f59e0b" }} />
              </div>
            )}
          </Box>
        ))}
      </Box>
      <NavBar active="home" onNav={onNav} />
    </Box>
  );
}

// ─── SCREEN REGISTRY ──────────────────────────────────────
const SCREENS = {
  onboarding: OnboardingScreen,
  home: HomeScreen,
  scan: ScanScreen,
  analysis: AnalysisScreen,
  tracker: TrackerScreen,
  community: CommunityScreen,
  derm: DermScreen,
  routine: RoutineScreen,
  loyalty: LoyaltyScreen,
  shop: ShopScreen,
  weather: WeatherScreen,
  daily: DailyScreen,
};

const SCREEN_LABELS = {
  onboarding: "Onboarding",
  home: "Home Dashboard",
  scan: "Ingredient Scanner",
  analysis: "AI Skin Analysis",
  tracker: "Progress Dashboard",
  community: "Community Feed",
  derm: "Derm Consultation",
  routine: "Routine + Expiry",
  loyalty: "Loyalty Program",
  shop: "Shop",
  weather: "Real-Time Adapter",
  daily: "Daily Wellness Tips",
};

// ─── ROOT ────────────────────────────────────────────────
export default function Wireframe() {
  const [screen, setScreen] = useState("onboarding");
  const [history, setHistory] = useState(["onboarding"]);

  const navigate = (id) => {
    setScreen(id);
    setHistory(h => [...h, id]);
  };

  const Screen = SCREENS[screen] || HomeScreen;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#18181b",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "24px 0 40px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>

      {/* Top bar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20, width: "100%", maxWidth: 480, padding: "0 20px" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "#6366f1", fontWeight: 700, marginBottom: 6 }}>WIREFRAME PROTOTYPE · SKINAI MVP</div>
        <div style={{ fontSize: 13, color: "#71717a", marginBottom: 14 }}>Current screen: <span style={{ color: "#e4e4e7", fontWeight: 600 }}>{SCREEN_LABELS[screen]}</span></div>

        {/* Screen navigator */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
          {Object.entries(SCREEN_LABELS).map(([id, label]) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              style={{
                padding: "5px 12px", borderRadius: 99, fontSize: 11, fontWeight: 600,
                background: screen === id ? "#6366f1" : "#27272a",
                color: screen === id ? "#fff" : "#a1a1aa",
                border: screen === id ? "1px solid #818cf8" : "1px solid #3f3f46",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Phone frame */}
      <div style={{
        width: W,
        height: H,
        borderRadius: 48,
        background: "#111",
        padding: 12,
        boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px #333, inset 0 0 0 1px #222",
        position: "relative",
        flexShrink: 0,
      }}>
        {/* Notch */}
        <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#111", borderRadius: "0 0 20px 20px", zIndex: 100 }} />

        {/* Screen */}
        <div style={{
          width: "100%", height: "100%",
          borderRadius: 38,
          overflow: "hidden",
          background: C.bg,
          position: "relative",
        }}>
          <Screen onNav={navigate} />
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: "#3f3f46", letterSpacing: "0.08em" }}>
        Click any node above or interact with the screen — navigation is live
      </div>
    </div>
  );
}
