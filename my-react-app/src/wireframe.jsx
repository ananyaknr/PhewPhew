import { useState } from "react";

const W = 390;
const H = 844;

// ─── Palette — PhewPhew CI ─────────────────────────────────
const C = {
  bg: "#EEF8FD",           // very light sky, derived from #E2F4FC
  surface: "#FFFFFF",      // white
  card: "#E2F4FC",         // primary light blue
  border: "#B8DFF0",       // medium blue border
  borderLight: "#D4EEF9",  // soft blue border
  text: "#0D2A3A",         // deep blue-teal for legibility
  sub: "#4A7A8A",          // muted teal-blue
  muted: "#8BBCCC",        // light muted blue
  accent: "#2D9CCA",       // strong sky blue (derived from #9BE9FA shifted darker for contrast)
  accentLight: "#E2F4FC",  // primary light
  accentMid: "#9BE9FA",    // primary mid blue — CTAs, highlights
  premium: "#6B8A2A",      // golden-olive (pairs with yellow #fff9af)
  premiumLight: "#FDFDE8", // near-white yellow tint
  premiumMid: "#fff9af",   // accent yellow
  mint: "#b5ffef",         // mint accent
  mintDark: "#2A9E80",     // deeper mint for text on mint bg
  danger: "#D44B3A",       // warm red
  tag: "#E2F4FC",
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
    background: premium ? C.premiumMid : C.accentMid,
    border: `1px solid ${premium ? "#D4C840" : "#6DD6EE"}`,
    fontSize: 10, fontWeight: 700, color: premium ? C.premium : "#1A6A88",
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

// ─── SVG Illustrations ────────────────────────────────────
const IllustrationWelcome = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    {/* Background blobs */}
    <ellipse cx="160" cy="110" rx="130" ry="60" fill="#D4F0FB" />
    <ellipse cx="80" cy="90" rx="50" ry="50" fill="#E2F4FC" />
    <ellipse cx="240" cy="85" rx="45" ry="45" fill="#b5ffef" opacity="0.5" />
    {/* Face outline */}
    <ellipse cx="160" cy="85" rx="52" ry="60" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="2" />
    {/* Eyes */}
    <ellipse cx="143" cy="78" rx="7" ry="8" fill="#E2F4FC" stroke="#2D9CCA" strokeWidth="1.5" />
    <ellipse cx="177" cy="78" rx="7" ry="8" fill="#E2F4FC" stroke="#2D9CCA" strokeWidth="1.5" />
    <circle cx="144" cy="79" r="3.5" fill="#0D2A3A" />
    <circle cx="178" cy="79" r="3.5" fill="#0D2A3A" />
    <circle cx="145.5" cy="77.5" r="1.2" fill="white" />
    <circle cx="179.5" cy="77.5" r="1.2" fill="white" />
    {/* Smile */}
    <path d="M148 98 Q160 108 172 98" stroke="#2D9CCA" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Cheek glow */}
    <ellipse cx="132" cy="92" rx="10" ry="6" fill="#9BE9FA" opacity="0.4" />
    <ellipse cx="188" cy="92" rx="10" ry="6" fill="#9BE9FA" opacity="0.4" />
    {/* Sparkles */}
    <text x="44" y="50" fontSize="18" fill="#9BE9FA">✦</text>
    <text x="252" y="44" fontSize="14" fill="#b5ffef">✦</text>
    <text x="30" y="130" fontSize="10" fill="#9BE9FA" opacity="0.6">✦</text>
    <text x="270" y="130" fontSize="12" fill="#fff9af">★</text>
    {/* Floating dots */}
    <circle cx="55" cy="70" r="4" fill="#9BE9FA" opacity="0.5" />
    <circle cx="265" cy="100" r="5" fill="#b5ffef" opacity="0.6" />
    <circle cx="100" cy="155" r="3" fill="#9BE9FA" opacity="0.4" />
    <circle cx="220" cy="158" r="4" fill="#fff9af" opacity="0.7" />
    {/* AI scan ring */}
    <circle cx="160" cy="85" r="68" stroke="#9BE9FA" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.5" />
  </svg>
);

const IllustrationSkinType = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="120" rx="140" ry="55" fill="#E2F4FC" />
    {/* 3 face silhouettes with different skin textures */}
    {/* Oily face */}
    <ellipse cx="80" cy="85" rx="36" ry="42" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <circle cx="72" cy="72" r="3" fill="#b5ffef" opacity="0.8" />
    <circle cx="88" cy="70" r="3" fill="#b5ffef" opacity="0.8" />
    <circle cx="80" cy="82" r="2.5" fill="#9BE9FA" opacity="0.6" />
    <text x="62" y="108" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Oily</text>
    {/* Sensor ring on middle face */}
    <ellipse cx="160" cy="82" rx="42" ry="48" fill="#FFFFFF" stroke="#2D9CCA" strokeWidth="2" />
    <circle cx="160" cy="82" r="52" stroke="#9BE9FA" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    {/* scan lines */}
    <line x1="118" y1="75" x2="202" y2="75" stroke="#9BE9FA" strokeWidth="0.8" opacity="0.5" />
    <line x1="118" y1="82" x2="202" y2="82" stroke="#9BE9FA" strokeWidth="0.8" opacity="0.5" />
    <line x1="118" y1="89" x2="202" y2="89" stroke="#9BE9FA" strokeWidth="0.8" opacity="0.5" />
    <text x="138" y="115" fontSize="8" fill="#2D9CCA" fontFamily="DM Sans" fontWeight="700">AI Scan</text>
    {/* Dry face */}
    <ellipse cx="240" cy="85" rx="36" ry="42" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <path d="M228 74 Q234 70 240 74" stroke="#B8DFF0" strokeWidth="1.2" fill="none" />
    <path d="M232 82 Q238 78 244 82" stroke="#B8DFF0" strokeWidth="1.2" fill="none" />
    <text x="224" y="108" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Dry</text>
    {/* AI chip icon */}
    <rect x="148" y="70" width="24" height="24" rx="4" fill="#9BE9FA" opacity="0.3" />
    <rect x="152" y="74" width="16" height="16" rx="2" fill="#2D9CCA" opacity="0.5" />
    <text x="156" y="85" fontSize="9" fill="white" fontWeight="700">AI</text>
    {/* Sparkles */}
    <text x="20" y="45" fontSize="14" fill="#9BE9FA">✦</text>
    <text x="280" y="50" fontSize="12" fill="#fff9af">★</text>
  </svg>
);

const IllustrationGender = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="130" rx="140" ry="45" fill="#E2F4FC" />
    {/* Female */}
    <ellipse cx="95" cy="80" rx="38" ry="44" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="2" />
    <path d="M95 124 L95 148 M80 136 L110 136" stroke="#9BE9FA" strokeWidth="2" strokeLinecap="round" />
    <circle cx="88" cy="73" r="3.5" fill="#0D2A3A" />
    <circle cx="102" cy="73" r="3.5" fill="#0D2A3A" />
    <path d="M88 90 Q95 97 102 90" stroke="#2D9CCA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M76 62 Q95 52 114 62" stroke="#0D2A3A" strokeWidth="2" fill="none" strokeLinecap="round" />
    <text x="76" y="168" fontSize="9" fill="#4A7A8A" fontFamily="DM Sans">Female</text>
    {/* Male */}
    <ellipse cx="225" cy="80" rx="38" ry="44" fill="#FFFFFF" stroke="#b5ffef" strokeWidth="2" />
    <path d="M225 124 L225 148" stroke="#b5ffef" strokeWidth="2" strokeLinecap="round" />
    <path d="M248 57 L263 42 M256 42 L263 42 L263 49" stroke="#b5ffef" strokeWidth="2" strokeLinecap="round" />
    <circle cx="218" cy="73" r="3.5" fill="#0D2A3A" />
    <circle cx="232" cy="73" r="3.5" fill="#0D2A3A" />
    <path d="M218 90 Q225 97 232 90" stroke="#2D9CCA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M210 65 Q217 58 225 63 Q233 58 240 65" stroke="#0D2A3A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <text x="210" y="168" fontSize="9" fill="#4A7A8A" fontFamily="DM Sans">Male</text>
    {/* Non-binary in middle */}
    <ellipse cx="160" cy="78" rx="30" ry="34" fill="#FDFDE8" stroke="#fff9af" strokeWidth="1.5" />
    <circle cx="154" cy="72" r="2.8" fill="#0D2A3A" />
    <circle cx="166" cy="72" r="2.8" fill="#0D2A3A" />
    <path d="M154 85 Q160 90 166 85" stroke="#2D9CCA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <text x="146" y="124" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Non-binary</text>
    <text x="20" y="40" fontSize="14" fill="#9BE9FA">✦</text>
    <text x="285" y="38" fontSize="12" fill="#b5ffef">✦</text>
  </svg>
);

const IllustrationLifestyle = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="140" rx="150" ry="38" fill="#E2F4FC" />
    {/* Office building */}
    <rect x="30" y="60" width="70" height="90" rx="4" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <rect x="40" y="72" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="58" y="72" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="76" y="72" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="40" y="94" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="58" y="94" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="76" y="94" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="52" y="120" width="16" height="30" rx="2" fill="#B8DFF0" />
    <text x="40" y="165" fontSize="8" fill="#2D9CCA" fontFamily="DM Sans" fontWeight="600">Office</text>
    {/* Outdoor / city scene */}
    <rect x="125" y="80" width="50" height="70" rx="4" fill="#FFFFFF" stroke="#fff9af" strokeWidth="1.5" />
    {/* PM2.5 cloud */}
    <ellipse cx="150" cy="48" rx="28" ry="18" fill="#B8DFF0" opacity="0.7" />
    <ellipse cx="136" cy="53" rx="18" ry="14" fill="#D4EEF9" opacity="0.8" />
    <ellipse cx="164" cy="53" rx="18" ry="14" fill="#D4EEF9" opacity="0.8" />
    <text x="138" y="52" fontSize="7" fill="#4A7A8A" fontFamily="DM Sans" fontWeight="700">PM2.5</text>
    <text x="126" y="105" fontSize="20" fill="#9BE9FA">🏙</text>
    <text x="126" y="162" fontSize="8" fill="#2D9CCA" fontFamily="DM Sans" fontWeight="600">City + PM</text>
    {/* Rural / outdoor */}
    <rect x="220" y="80" width="70" height="70" rx="4" fill="#FFFFFF" stroke="#b5ffef" strokeWidth="1.5" />
    <ellipse cx="255" cy="60" rx="22" ry="16" fill="#fff9af" opacity="0.8" />
    {/* sun rays */}
    <line x1="255" y1="38" x2="255" y2="30" stroke="#fff9af" strokeWidth="1.5" />
    <line x1="272" y1="45" x2="278" y2="39" stroke="#fff9af" strokeWidth="1.5" />
    <line x1="238" y1="45" x2="232" y2="39" stroke="#fff9af" strokeWidth="1.5" />
    <text x="228" y="113" fontSize="20" fill="#b5ffef">🌿</text>
    <text x="224" y="162" fontSize="8" fill="#2A9E80" fontFamily="DM Sans" fontWeight="600">Rural / Outdoor</text>
  </svg>
);

const IllustrationAllergy = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="130" rx="140" ry="45" fill="#FDE8E8" opacity="0.5" />
    <ellipse cx="160" cy="130" rx="100" ry="30" fill="#E2F4FC" opacity="0.5" />
    {/* Shield */}
    <path d="M160 30 L200 48 L200 90 Q200 118 160 135 Q120 118 120 90 L120 48 Z" fill="#FFFFFF" stroke="#D44B3A" strokeWidth="2" />
    <path d="M160 42 L192 57 L192 90 Q192 112 160 126 Q128 112 128 90 L128 57 Z" fill="#FDE8E8" opacity="0.5" />
    {/* Warning symbol */}
    <text x="147" y="95" fontSize="30" fill="#D44B3A">!</text>
    {/* Floating ingredient bubbles */}
    <circle cx="62" cy="65" r="22" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <text x="50" y="62" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Fragrance</text>
    <line x1="62" y1="72" x2="62" y2="62" stroke="#D44B3A" strokeWidth="1.5" />
    <line x1="57" y1="67" x2="67" y2="67" stroke="#D44B3A" strokeWidth="1.5" />
    <circle cx="258" cy="65" r="22" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <text x="248" y="62" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Paraben</text>
    <line x1="258" y1="72" x2="258" y2="62" stroke="#D44B3A" strokeWidth="1.5" />
    <line x1="253" y1="67" x2="263" y2="67" stroke="#D44B3A" strokeWidth="1.5" />
    <circle cx="62" cy="130" r="20" fill="#FFFFFF" stroke="#b5ffef" strokeWidth="1.5" />
    <text x="53" y="128" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Sulfate</text>
    <text x="56" y="140" fontSize="8" fill="#2A9E80">✓ Safe</text>
    <circle cx="258" cy="130" r="20" fill="#FFFFFF" stroke="#b5ffef" strokeWidth="1.5" />
    <text x="250" y="128" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Retinol</text>
    <text x="252" y="140" fontSize="8" fill="#2A9E80">✓ Safe</text>
    <text x="20" y="40" fontSize="12" fill="#9BE9FA">✦</text>
    <text x="282" y="44" fontSize="10" fill="#fff9af">★</text>
  </svg>
);

const IllustrationGoals = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="140" rx="150" ry="38" fill="#E2F4FC" />
    {/* Central face glow */}
    <ellipse cx="160" cy="82" rx="50" ry="56" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="2" />
    <circle cx="160" cy="82" r="65" stroke="#9BE9FA" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.5" />
    <circle cx="160" cy="82" r="75" stroke="#E2F4FC" strokeWidth="8" fill="none" />
    {/* Eyes */}
    <ellipse cx="146" cy="75" rx="6" ry="7" fill="#E2F4FC" stroke="#2D9CCA" strokeWidth="1.2" />
    <ellipse cx="174" cy="75" rx="6" ry="7" fill="#E2F4FC" stroke="#2D9CCA" strokeWidth="1.2" />
    <circle cx="147" cy="76" r="3" fill="#0D2A3A" />
    <circle cx="175" cy="76" r="3" fill="#0D2A3A" />
    <circle cx="148" cy="75" r="1" fill="white" />
    <circle cx="176" cy="75" r="1" fill="white" />
    {/* Smile */}
    <path d="M148 93 Q160 104 172 93" stroke="#2D9CCA" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Goal tags orbiting */}
    <rect x="8" y="55" width="60" height="18" rx="9" fill="#9BE9FA" opacity="0.8" />
    <text x="14" y="67" fontSize="8" fill="#0D2A3A" fontFamily="DM Sans" fontWeight="600">✦ Hydration</text>
    <rect x="8" y="90" width="64" height="18" rx="9" fill="#b5ffef" opacity="0.8" />
    <text x="14" y="102" fontSize="8" fill="#0D2A3A" fontFamily="DM Sans" fontWeight="600">✦ Anti-aging</text>
    <rect x="252" y="55" width="60" height="18" rx="9" fill="#9BE9FA" opacity="0.8" />
    <text x="258" y="67" fontSize="8" fill="#0D2A3A" fontFamily="DM Sans" fontWeight="600">✦ Clarity</text>
    <rect x="248" y="90" width="66" height="18" rx="9" fill="#fff9af" opacity="0.9" />
    <text x="254" y="102" fontSize="8" fill="#0D2A3A" fontFamily="DM Sans" fontWeight="600">★ Brightening</text>
    {/* Sparkles */}
    <text x="140" y="28" fontSize="14" fill="#fff9af">★</text>
    <text x="85" y="145" fontSize="10" fill="#9BE9FA">✦</text>
    <text x="225" y="148" fontSize="10" fill="#b5ffef">✦</text>
  </svg>
);

// ─── Reusable chip selector ───────────────────────────────
function ChipSelector({ options, selected, onToggle, single }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(o => {
        const isSelected = Array.isArray(selected) ? selected.includes(o) : selected === o;
        return (
          <div
            key={o}
            onClick={() => onToggle(o)}
            style={{
              padding: "8px 14px", borderRadius: 99, cursor: "pointer",
              border: `1.5px solid ${isSelected ? C.accent : C.border}`,
              background: isSelected ? C.accentMid : C.surface,
              fontSize: 12, color: isSelected ? "#0D2A3A" : C.text,
              fontWeight: isSelected ? 700 : 400,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s",
              boxShadow: isSelected ? "0 2px 10px #9BE9FA66" : "none",
            }}
          >
            {o}
          </div>
        );
      })}
    </div>
  );
}

function OnboardingScreen({ onNav }) {
  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState(null);
  const [gender, setGender] = useState(null);
  const [workEnv, setWorkEnv] = useState(null);
  const [surrounding, setSurrounding] = useState(null);
  const [goals, setGoals] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [pastAllergy, setPastAllergy] = useState("");

  const TOTAL_STEPS = 7;

  const toggleGoal = (g) => setGoals(gs => gs.includes(g) ? gs.filter(x => x !== g) : [...gs, g]);
  const toggleAllergy = (a) => setAllergies(as => as.includes(a) ? as.filter(x => x !== a) : [...as, a]);

  const illustrations = [
    <IllustrationWelcome />,
    <IllustrationGender />,
    <IllustrationSkinType />,
    <IllustrationGoals />,
    <IllustrationLifestyle />,
    <IllustrationLifestyle />,
    <IllustrationAllergy />,
  ];

  const canProceed = () => {
    if (step === 1) return gender !== null;
    if (step === 2) return skinType !== null;
    if (step === 3) return goals.length > 0;
    if (step === 4) return workEnv !== null;
    if (step === 5) return surrounding !== null;
    return true;
  };

  return (
    <Box style={{ height: "100%", background: "linear-gradient(160deg, #D4F0FB 0%, #EEF8FD 60%, #E2F4FC 100%)", display: "flex", flexDirection: "column" }}>
      <StatusBar />

      {/* Progress bar */}
      <div style={{ padding: "0 24px", marginTop: 4, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <Text size={10} color={C.sub} weight={600} style={{ letterSpacing: "0.08em" }}>STEP {step + 1} OF {TOTAL_STEPS}</Text>
          <Text size={10} color={C.muted}>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</Text>
        </div>
        <div style={{ height: 4, borderRadius: 99, background: C.border }}>
          <div style={{ height: "100%", width: `${((step + 1) / TOTAL_STEPS) * 100}%`, borderRadius: 99, background: C.accentMid, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Illustration */}
      <div style={{ width: "100%", height: 160, padding: "0 20px", marginBottom: 12, flexShrink: 0 }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 20, overflow: "hidden", background: "linear-gradient(135deg, #D4F0FB, #E8FFFB)" }}>
          {illustrations[step]}
        </div>
      </div>

      {/* Content */}
      <Box style={{ flex: 1, overflowY: "auto", padding: "0 24px 16px" }}>

        {/* ── Step 0: Welcome ── */}
        {step === 0 && (
          <>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: C.accentMid, marginBottom: 14 }}>
              <Text size={10} weight={700} color="#0D2A3A" style={{ letterSpacing: "0.08em" }}>✦ POWERED BY AI + SENSOR</Text>
            </div>
            <Text size={30} weight={800} style={{ lineHeight: 1.15, fontFamily: "Syne, sans-serif", marginBottom: 10 }}>
              Meet <span style={{ color: C.accent }}>PhewPhew</span> —<br />your skin's<br />best friend.
            </Text>
            <Text size={14} color={C.sub} style={{ lineHeight: 1.7, marginBottom: 20 }}>
              Personalised skincare powered by AI + sensor technology. We'll learn your skin, build your routine, and help it glow.
            </Text>
            <div style={{ display: "flex", gap: 10 }}>
              {[["◎", "Scan Ingredients"], ["◈", "AI Analysis"], ["◆", "Earn Rewards"]].map(([icon, label]) => (
                <div key={label} style={{ flex: 1, padding: "10px 8px", borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <Text size={18}>{icon}</Text>
                  <Text size={9} color={C.sub} style={{ marginTop: 4, lineHeight: 1.3 }}>{label}</Text>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 1: Gender ── */}
        {step === 1 && (
          <>
            <Text size={24} weight={800} style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.2, marginBottom: 8 }}>What's your<br />biological sex?</Text>
            <Text size={13} color={C.sub} style={{ lineHeight: 1.6, marginBottom: 20 }}>
              Hormones affect skin behaviour — oil production, sensitivity, and aging patterns differ. This helps us calibrate your analysis accurately.
            </Text>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { val: "Female", desc: "Higher estrogen — tends toward dryness, hormonal acne", icon: "♀" },
                { val: "Male", desc: "Higher androgens — oilier, thicker skin, larger pores", icon: "♂" },
                { val: "Non-binary / Prefer not to say", desc: "We'll use general skin data for your analysis", icon: "◈" },
              ].map(opt => (
                <div
                  key={opt.val}
                  onClick={() => setGender(opt.val)}
                  style={{
                    padding: "14px 16px", borderRadius: 14, cursor: "pointer",
                    border: `2px solid ${gender === opt.val ? C.accent : C.border}`,
                    background: gender === opt.val ? C.accentLight : C.surface,
                    display: "flex", alignItems: "center", gap: 14,
                    transition: "all 0.15s",
                    boxShadow: gender === opt.val ? "0 2px 12px #9BE9FA44" : "none",
                  }}
                >
                  <Text size={22}>{opt.icon}</Text>
                  <div>
                    <Text size={13} weight={700} color={gender === opt.val ? "#0D4A6A" : C.text}>{opt.val}</Text>
                    <Text size={11} color={C.sub} style={{ marginTop: 2 }}>{opt.desc}</Text>
                  </div>
                  {gender === opt.val && <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Text size={10} color="white">✓</Text></div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 2: Skin type ── */}
        {step === 2 && (
          <>
            <Text size={24} weight={800} style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.2, marginBottom: 6 }}>What do you think<br />your skin type is?</Text>
            <div style={{ padding: "10px 14px", borderRadius: 12, background: C.accentMid + "44", border: `1px solid ${C.accentMid}`, marginBottom: 16 }}>
              <Text size={12} color="#1A5A78" weight={600}>💡 Just your best guess is perfect.</Text>
              <Text size={11} color={C.sub} style={{ marginTop: 3 }}>Our AI + sensor will run a real analysis later to confirm and fine-tune — this just gives us a starting point.</Text>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { val: "Oily", desc: "Shiny by midday, enlarged pores, prone to acne", emoji: "💧" },
                { val: "Dry", desc: "Feels tight, flaky patches, dull appearance", emoji: "🌵" },
                { val: "Combination", desc: "Oily T-zone, normal or dry cheeks", emoji: "⚖️" },
                { val: "Sensitive", desc: "Reacts easily, redness, stinging or itching", emoji: "🌸" },
                { val: "Normal", desc: "Balanced, rarely breaks out, minimal issues", emoji: "✨" },
              ].map(opt => (
                <div
                  key={opt.val}
                  onClick={() => setSkinType(opt.val)}
                  style={{
                    padding: "12px 16px", borderRadius: 14, cursor: "pointer",
                    border: `2px solid ${skinType === opt.val ? C.accent : C.border}`,
                    background: skinType === opt.val ? C.accentLight : C.surface,
                    display: "flex", alignItems: "center", gap: 12,
                    transition: "all 0.15s",
                  }}
                >
                  <Text size={20}>{opt.emoji}</Text>
                  <div>
                    <Text size={13} weight={700} color={skinType === opt.val ? "#0D4A6A" : C.text}>{opt.val}</Text>
                    <Text size={11} color={C.sub}>{opt.desc}</Text>
                  </div>
                  {skinType === opt.val && <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Text size={10} color="white">✓</Text></div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 3: Goals ── */}
        {step === 3 && (
          <>
            <Text size={24} weight={800} style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.2, marginBottom: 8 }}>What are your<br />skin goals?</Text>
            <Text size={13} color={C.sub} style={{ marginBottom: 18, lineHeight: 1.6 }}>Pick everything that matters to you. We'll build your routine around these.</Text>
            <ChipSelector
              options={["Reduce acne", "Anti-aging", "Even skin tone", "Deep hydration", "Brightening", "Pore minimising", "Barrier repair", "Reduce redness", "Firming"]}
              selected={goals}
              onToggle={toggleGoal}
            />
          </>
        )}

        {/* ── Step 4: Work environment ── */}
        {step === 4 && (
          <>
            <Text size={24} weight={800} style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.2, marginBottom: 8 }}>Where do you<br />spend your days?</Text>
            <Text size={13} color={C.sub} style={{ marginBottom: 18, lineHeight: 1.6 }}>Your work environment affects sweat, oil, UV exposure, and air quality — all of which impact your skin daily.</Text>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { val: "Office / Indoors", desc: "AC environments cause dehydration + blue light exposure", icon: "🏢" },
                { val: "Mixed (Office + Field)", desc: "Variable conditions — skin needs adaptability", icon: "🔄" },
                { val: "Outdoor / Field Work", desc: "High UV, heat, sweat, and environmental exposure", icon: "🌤" },
                { val: "Work from Home", desc: "Controlled climate but sedentary — hydration often neglected", icon: "🏠" },
              ].map(opt => (
                <div
                  key={opt.val}
                  onClick={() => setWorkEnv(opt.val)}
                  style={{
                    padding: "12px 16px", borderRadius: 14, cursor: "pointer",
                    border: `2px solid ${workEnv === opt.val ? C.accent : C.border}`,
                    background: workEnv === opt.val ? C.accentLight : C.surface,
                    display: "flex", alignItems: "center", gap: 12,
                    transition: "all 0.15s",
                  }}
                >
                  <Text size={20}>{opt.icon}</Text>
                  <div>
                    <Text size={13} weight={700} color={workEnv === opt.val ? "#0D4A6A" : C.text}>{opt.val}</Text>
                    <Text size={11} color={C.sub}>{opt.desc}</Text>
                  </div>
                  {workEnv === opt.val && <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Text size={10} color="white">✓</Text></div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 5: Surrounding / environment ── */}
        {step === 5 && (
          <>
            <Text size={24} weight={800} style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.2, marginBottom: 8 }}>What's your<br />living environment?</Text>
            <Text size={13} color={C.sub} style={{ marginBottom: 18, lineHeight: 1.6 }}>Pollution, humidity, and UV index in your area directly affect which products and ingredients your skin needs.</Text>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { val: "City with High Pollution", desc: "PM2.5, smog — needs antioxidants + barrier protection", icon: "🏙", tag: "PM2.5 Risk" },
                { val: "City, Low Pollution", desc: "Urban but cleaner air — focus on hydration + UV", icon: "🌆", tag: null },
                { val: "Suburban", desc: "Moderate exposure — balanced routine works well", icon: "🏘", tag: null },
                { val: "Rural / Nature", desc: "Fresh air, high UV outdoors — SPF is key", icon: "🌿", tag: null },
                { val: "Coastal / Humid", desc: "Salt air + high humidity — oiliness and breakouts common", icon: "🌊", tag: null },
              ].map(opt => (
                <div
                  key={opt.val}
                  onClick={() => setSurrounding(opt.val)}
                  style={{
                    padding: "12px 16px", borderRadius: 14, cursor: "pointer",
                    border: `2px solid ${surrounding === opt.val ? C.accent : C.border}`,
                    background: surrounding === opt.val ? C.accentLight : C.surface,
                    display: "flex", alignItems: "center", gap: 12,
                    transition: "all 0.15s",
                  }}
                >
                  <Text size={20}>{opt.icon}</Text>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Text size={13} weight={700} color={surrounding === opt.val ? "#0D4A6A" : C.text}>{opt.val}</Text>
                      {opt.tag && <div style={{ padding: "2px 8px", borderRadius: 99, background: "#FDE8E8", border: "1px solid #F5AAAA", fontSize: 8, fontWeight: 700, color: C.danger, fontFamily: "'DM Sans', sans-serif" }}>{opt.tag}</div>}
                    </div>
                    <Text size={11} color={C.sub}>{opt.desc}</Text>
                  </div>
                  {surrounding === opt.val && <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Text size={10} color="white">✓</Text></div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 6: Allergies ── */}
        {step === 6 && (
          <>
            <Text size={24} weight={800} style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.2, marginBottom: 8 }}>Any known allergies<br />or sensitivities?</Text>
            <Text size={13} color={C.sub} style={{ lineHeight: 1.6, marginBottom: 18 }}>
              This helps us flag dangerous ingredients in products you scan and exclude them from all recommendations.
            </Text>

            {/* Known allergens */}
            <Text size={11} weight={700} color={C.sub} style={{ letterSpacing: "0.08em", marginBottom: 10 }}>KNOWN ALLERGENS — tap to select</Text>
            <ChipSelector
              options={["Fragrance", "Paraben", "Alcohol", "Sulfate (SLS/SLES)", "Retinol", "AHA / BHA", "Essential Oils", "Lanolin", "Latex", "Nickel"]}
              selected={allergies}
              onToggle={toggleAllergy}
            />

            {/* Past reactions */}
            <Text size={11} weight={700} color={C.sub} style={{ letterSpacing: "0.08em", marginTop: 20, marginBottom: 10 }}>PAST REACTIONS — describe if any</Text>
            <div style={{ padding: "12px 16px", borderRadius: 12, background: C.surface, border: `1.5px solid ${C.border}`, minHeight: 70 }}>
              <Text size={12} color={C.muted} style={{ lineHeight: 1.6 }}>
                e.g. "Broke out from The Ordinary Peeling Solution" or "Redness from fragrance-based toners"
              </Text>
            </div>
            <Text size={10} color={C.muted} style={{ marginTop: 6 }}>You can update this anytime in your profile.</Text>

            {/* Skip option */}
            <Text size={12} color={C.sub} style={{ marginTop: 16, textAlign: "center" }}>No known allergies? That's fine — tap Continue.</Text>
          </>
        )}

      </Box>

      {/* Bottom CTA */}
      <div style={{ padding: "12px 24px 28px", flexShrink: 0 }}>
        <div
          onClick={() => {
            if (!canProceed() && step !== 0 && step !== 6) return;
            if (step === TOTAL_STEPS - 1) onNav("home");
            else setStep(s => s + 1);
          }}
          style={{
            width: "100%", padding: "15px", borderRadius: 14,
            background: (canProceed() || step === 0 || step === 6) ? C.accentMid : C.border,
            color: (canProceed() || step === 0 || step === 6) ? "#0D2A3A" : C.muted,
            textAlign: "center", fontSize: 15, fontWeight: 700, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: (canProceed() || step === 0 || step === 6) ? "0 4px 18px #9BE9FA55" : "none",
            transition: "all 0.2s",
          }}
        >
          {step === 0 ? "Let's begin →" : step === TOTAL_STEPS - 1 ? "Start My Journey ✦" : "Continue →"}
        </div>
        {step > 0 && (
          <div onClick={() => setStep(s => s - 1)} style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: C.sub, cursor: "pointer" }}>← Back</div>
        )}
      </div>
    </Box>
  );
}

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
        <Box style={{ background: "#FFFDE8", border: `1px solid #E8E060`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }} onClick={() => onNav("weather")}>
          <Text size={22}>⚠️</Text>
          <div>
            <Text size={12} weight={700} color="#7A6A00">PM2.5 Alert — Today</Text>
            <Text size={11} color="#9A8800">AQI 142 · Apply extra SPF, skip actives</Text>
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
            <div style={{ width: "100%", height: 260, borderRadius: 20, background: "#0D2A3A", position: "relative", overflow: "hidden", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, #0f3347 0px, #0f3347 10px, #0D2A3A 10px, #0D2A3A 20px)", opacity: 0.4 }} />
              <div style={{ width: 180, height: 120, border: `2px dashed ${C.accentMid}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                <Text size={11} color={C.accentMid} style={{ textAlign: "center" }}>Point camera at\ningredient label</Text>
              </div>
              <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#9BE9FA99", fontFamily: "'DM Sans', sans-serif" }}>AUTO-DETECT · LIVE</div>
            </div>

            <Box style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <div onClick={() => setPhase("result")} style={{ flex: 1, padding: "14px", borderRadius: 14, background: C.accentMid, color: C.text, textAlign: "center", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px #9BE9FA55" }}>
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
            <Box style={{ background: "#E8FFFB", border: `1px solid #7ADFC8`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
              <Box style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Text size={22}>✓</Text>
                <Text size={15} weight={700} color={C.mintDark}>Compatible with your skin</Text>
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
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ing.safe ? C.accentMid : C.danger, flexShrink: 0 }} />
                  <Text size={13}>{ing.name}</Text>
                  <div style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: 99, background: ing.safe ? C.accentLight : "#FDE8E8", fontSize: 9, fontWeight: 700, color: ing.safe ? "#1A6A88" : C.danger, fontFamily: "'DM Sans', sans-serif" }}>{ing.tag}</div>
                </Box>
              ))}
            </Box>

            <Box style={{ display: "flex", gap: 10 }}>
              <div onClick={() => setPhase("idle")} style={{ flex: 1, padding: "14px", borderRadius: 14, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                ← Scan Again
              </div>
              <div style={{ flex: 1, padding: "14px", borderRadius: 14, background: C.accentMid, color: C.text, textAlign: "center", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
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
        <Box style={{ background: "#0D2A3A", borderRadius: 20, padding: "20px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 30%, #9BE9FA22, transparent 60%)" }} />
          <Text size={10} color={C.accentMid} weight={700} style={{ letterSpacing: "0.12em", marginBottom: 12 }}>SENSOR + AI ACTIVE</Text>
          <Box style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 120, borderRadius: 12, background: "#0f3347", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
              <Text size={28} color={C.accentMid}>◎</Text>
              <Text size={10} color="#6b7280">Camera Feed</Text>
            </div>
            <div style={{ flex: 1, height: 120, borderRadius: 12, background: "#0f3347", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4, border: `1px solid ${C.accentMid}` }}>
              <Text size={28} color={C.premiumMid}>◈</Text>
              <Text size={10} color="#6b7280">Sensor Data</Text>
              <Text size={9} color={C.accentMid}>Hydration: 62%</Text>
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
        <Box onClick={() => onNav("derm")} style={{ background: "#E8FFFB", border: `1px solid #7ADFC8`, borderRadius: 16, padding: "16px", marginBottom: 16, cursor: "pointer" }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Text size={28}>✚</Text>
            <div>
              <Text size={13} weight={700} color={C.mintDark}>Consult a Dermatologist</Text>
              <Text size={11} color="#3A8A70">Discuss your results with a pro · ฿300/session</Text>
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
          <Box style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: C.mint }}>
            <Text size={12} color={C.mintDark} weight={600}>🎉 Skin clarity improved 18% over 30 days!</Text>
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
        <Box style={{ background: "#E8FFFB", border: `1px solid #7ADFC8`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={12} color={C.mintDark} weight={700} style={{ marginBottom: 4 }}>PRE-LOADED FROM YOUR ANALYSIS</Text>
          <Text size={13} color="#2A7A60">Your Skin Score, sensor data, and ingredient conflicts will be shared with your dermatologist before the session.</Text>
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
              <div style={{ padding: "8px 18px", borderRadius: 10, background: C.accentMid, fontSize: 12, fontWeight: 700, color: C.text, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Book Now</div>
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
        <Box style={{ background: "linear-gradient(135deg, #1A7AAA, #0D5A88)", borderRadius: 20, padding: "24px", marginBottom: 20 }}>
          <Text size={11} color={C.accentMid} weight={600} style={{ letterSpacing: "0.1em", marginBottom: 6 }}>TOTAL POINTS</Text>
          <Text size={42} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif", marginBottom: 4 }}>1,240</Text>
          <Text size={12} color={C.accentMid}>Gold Tier · 260 pts to Platinum</Text>
          <div style={{ marginTop: 14, height: 6, borderRadius: 99, background: "#ffffff22" }}>
            <div style={{ height: "100%", width: "82%", borderRadius: 99, background: C.accentMid }} />
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
            <div style={{ marginLeft: "auto", padding: "3px 10px", borderRadius: 99, background: C.accentLight, fontSize: 11, fontWeight: 700, color: "#1A6A88", fontFamily: "'DM Sans', sans-serif" }}>{e.pts}</div>
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
            <div style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: 10, background: C.accentMid, fontSize: 11, fontWeight: 700, color: C.text, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Redeem</div>
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

        <Box style={{ background: C.accentLight, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 16px", marginBottom: 16 }}>
          <Text size={12} weight={700} color="#1A6A88">✦ Personalised for Combination Skin</Text>
          <Text size={11} color={C.sub}>Based on your AI analysis + scan history</Text>
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
                <Text size={12} weight={700} color="#1A6A88">{p.price}</Text>
                <div style={{ marginTop: 6, padding: "2px 8px", borderRadius: 99, background: C.accentLight, display: "inline-block", fontSize: 9, fontWeight: 700, color: "#1A6A88", fontFamily: "'DM Sans', sans-serif" }}>✓ {p.compat}</div>
              </div>
            </Box>
          ))}
        </Box>

        {/* Use points banner */}
        <Box style={{ background: C.premiumMid, border: `1px solid #D4C840`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }} onClick={() => onNav("loyalty")}>
          <Text size={22}>◆</Text>
          <div>
            <Text size={13} weight={700} color="#5A5000">Use 1,240 Loyalty Points</Text>
            <Text size={11} color="#7A6A00">Apply towards your next purchase</Text>
          </div>
          <Text size={18} color={C.sub} style={{ marginLeft: "auto" }}>›</Text>
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
        <Box style={{ background: "linear-gradient(135deg, #0D2A3A, #1A5A88)", borderRadius: 20, padding: "24px", marginBottom: 16 }}>
          <Text size={10} color={C.accentMid} weight={600} style={{ letterSpacing: "0.12em", marginBottom: 8 }}>BANGKOK · TODAY</Text>
          <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Text size={48} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif" }}>34°C</Text>
              <Text size={13} color={C.accentMid}>Hazy Sunshine</Text>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ padding: "6px 14px", borderRadius: 99, background: "#C0392B33", border: "1px solid #C0392B66", marginBottom: 8 }}>
                <Text size={12} color="#ff6b5b" weight={700}>AQI 142 · Unhealthy</Text>
              </div>
              <Text size={11} color={C.accentMid}>UV Index: 10 (Very High)</Text>
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
            <div style={{ flex: 1, padding: "10px", borderRadius: 10, background: C.accentMid, textAlign: "center" }}>
              <Text size={12} color={C.text} weight={600}>View Adjusted AM</Text>
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
                <div style={{ height: "100%", width: `${t.progress}%`, borderRadius: 99, background: t.progress === 100 ? C.accentMid : C.premiumMid }} />
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
      background: "#0D1F2D",
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
        <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "#9BE9FA", fontWeight: 700, marginBottom: 6 }}>WIREFRAME PROTOTYPE · PHEWPHEW MVP</div>
        <div style={{ fontSize: 13, color: "#4A7A8A", marginBottom: 14 }}>Current screen: <span style={{ color: "#9BE9FA", fontWeight: 600 }}>{SCREEN_LABELS[screen]}</span></div>

        {/* Screen navigator */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
          {Object.entries(SCREEN_LABELS).map(([id, label]) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              style={{
                padding: "5px 12px", borderRadius: 99, fontSize: 11, fontWeight: 600,
                background: screen === id ? "#9BE9FA" : "#0f2a3a",
                color: screen === id ? "#0D1F2D" : "#4A7A8A",
                border: screen === id ? "1px solid #9BE9FA" : "1px solid #1A3A4A",
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
        boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px #1A3A4A, inset 0 0 0 1px #222",
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

      <div style={{ marginTop: 16, fontSize: 11, color: "#1A3A4A", letterSpacing: "0.08em" }}>
        Click any node above or interact with the screen — navigation is live
      </div>
    </div>
  );
}
