import { useState, useEffect } from "react";

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

const Badge = ({ label, premium }) => {
  if (!premium) return null; // Only render premium badges
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 10px", borderRadius: 99,
      background: C.premiumMid, border: `1px solid #D4C840`,
      fontSize: 10, fontWeight: 700, color: "#5A5000",
      letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif",
    }}>
      ★ PREMIUM{label ? ` · ${label}` : ""}
    </div>
  );
};

const NavBar = ({ active, onNav }) => {
  // IA rationale:
  // Home    — dashboard, routines, daily life overview
  // Analyse — AI skin analysis + progress tracker (insight tools)
  // [FAB]   — Ingredient Scanner (primary daily action, most-used feature)
  // Derm    — dermatologist consult + community (people / advice)
  // Me      — loyalty, shop, profile

  const items = [
    {
      id: "home", label: "Home",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 11L12 3l9 8v9a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-9z"
            fill={on ? C.accentLight : "none"}
            stroke={on ? C.accent : C.muted} strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "analysis", label: "Analyse",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="10" r="6" stroke={on ? C.accent : C.muted} strokeWidth="1.8"/>
          <path d="M8 10c0-2.2 1.8-4 4-4" stroke={on ? C.accent : C.muted} strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M5 19l2.5-2.5M19 19l-2.5-2.5" stroke={on ? C.accent : C.muted} strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="12" cy="10" r="2" fill={on ? C.accent : C.muted} opacity={on ? 1 : 0.4}/>
        </svg>
      ),
    },
    null, // center FAB placeholder
    {
      id: "community", label: "Community",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="3" fill={on ? C.accentLight : "none"} stroke={on ? C.accent : C.muted} strokeWidth="1.8"/>
          <path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" stroke={on ? C.accent : C.muted} strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="18" cy="9" r="2.5" stroke={on ? C.accent : C.muted} strokeWidth="1.6"/>
          <path d="M16 19c0-2 0.9-3.8 2.5-4.5" stroke={on ? C.accent : C.muted} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "loyalty", label: "Me",
      icon: (on) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill={on ? C.accentLight : "none"} stroke={on ? C.accent : C.muted} strokeWidth="1.8"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={on ? C.accent : C.muted} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 70,
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      display: "flex", alignItems: "center",
      boxShadow: "0 -2px 16px rgba(13,42,58,0.06)",
    }}>
      {items.map((it, idx) => {
        // Center FAB
        if (it === null) {
          const scanActive = active === "scan";
          return (
            <div key="scan-fab" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div
                onClick={() => onNav("scan")}
                style={{
                  width: 52, height: 52,
                  borderRadius: "50%",
                  background: scanActive
                    ? `linear-gradient(135deg, ${C.accent}, #1A88B8)`
                    : `linear-gradient(135deg, ${C.accentMid}, ${C.accent})`,
                  boxShadow: scanActive
                    ? `0 4px 18px ${C.accent}66`
                    : `0 4px 14px ${C.accentMid}88`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  transform: "translateY(-10px)",
                  border: `3px solid ${C.surface}`,
                  transition: "all 0.2s",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#0D2A3A" strokeWidth="1.8"/>
                  <rect x="15" y="3" width="6" height="6" rx="1.5" stroke="#0D2A3A" strokeWidth="1.8"/>
                  <rect x="3" y="15" width="6" height="6" rx="1.5" stroke="#0D2A3A" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="17.5" r="2.5" stroke="#0D2A3A" strokeWidth="1.8"/>
                  <line x1="19.3" y1="19.3" x2="21.5" y2="21.5" stroke="#0D2A3A" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          );
        }

        const on = active === it.id;
        return (
          <div key={it.id} onClick={() => onNav(it.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            cursor: "pointer", paddingBottom: 4,
          }}>
            <div style={{
              width: 40, height: 32, borderRadius: 12,
              background: on ? C.accentLight : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s",
            }}>
              {it.icon(on)}
            </div>
            <div style={{
              fontSize: 9, fontWeight: on ? 700 : 400,
              color: on ? C.accent : C.muted,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.01em",
            }}>{it.label}</div>
          </div>
        );
      })}
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

// ─── Premium Badge (only shown when premium) ─────────────
const PremiumTag = () => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 3,
    padding: "2px 8px", borderRadius: 99,
    background: C.premiumMid, border: `1px solid #D4C840`,
    fontSize: 9, fontWeight: 700, color: "#5A5000",
    letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif",
  }}>★ PREMIUM</div>
);

// ─── Section header ───────────────────────────────────────
const SectionHead = ({ label, action, onAction }) => (
  <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <Text size={13} weight={800} style={{ letterSpacing: "-0.01em" }}>{label}</Text>
    {action && <div onClick={onAction} style={{ fontSize: 11, color: C.accent, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{action}</div>}
  </Box>
);

function HomeScreen({ onNav }) {
  const [routineTab, setRoutineTab] = useState("AM");
  const [expandedStep, setExpandedStep] = useState(null);

  // Separate AM and PM step data — both toggleable
  const allSteps = {
    AM: [
      { name: "Gentle Cleanser", brand: "CeraVe Hydrating", done: true,  emoji: "🫧", why: "Removes overnight sebum without stripping your barrier — essential first step every AM.", tag: "Barrier Safe",     tagColor: C.mintDark,  tagBg: "#E8FFFB" },
      { name: "Hydrating Toner",  brand: "COSRX AHA/BHA",   done: true,  emoji: "💧", why: "Preps skin pH before serums so actives absorb 40% better. Choose alcohol-free.",          tag: "Prep Step",       tagColor: "#1A6A88",   tagBg: C.accentLight },
      { name: "Vitamin C Serum",  brand: "Timeless 20% C+E",done: true,  emoji: "🍊", why: "AM antioxidant that neutralises free radicals from PM2.5 — boosts SPF effectiveness.",    tag: "✦ New",           tagColor: C.premium,   tagBg: C.premiumMid },
      { name: "Moisturiser",      brand: "Round Lab Birch",  done: false, emoji: "🧴", why: "Seals in serum actives and maintains hydration throughout the day.",                       tag: "Locks In",        tagColor: "#1A6A88",   tagBg: C.accentLight },
      { name: "SPF 50 Sunscreen", brand: "Beauty of Joseon", done: false, emoji: "☀️", why: "Non-negotiable last step — UV is the #1 cause of aging. Reapply every 2h outdoors.",      tag: "⚠ Required",      tagColor: "#7A6A00",   tagBg: "#FFFDE8" },
    ],
    PM: [
      { name: "Oil Cleanser",     brand: "Banila Co Clean It", done: false, emoji: "🫧", why: "First cleanse dissolves sunscreen and makeup. Essential for double-cleanse method.",      tag: "Double Cleanse",  tagColor: C.mintDark,  tagBg: "#E8FFFB" },
      { name: "Foaming Cleanser", brand: "CeraVe Foaming",     done: false, emoji: "🧼", why: "Second cleanse clears remaining impurities — sets clean canvas for PM actives.",          tag: "Deep Clean",      tagColor: "#1A6A88",   tagBg: C.accentLight },
      { name: "BHA Toner",        brand: "Paula's Choice 2%",  done: false, emoji: "⚗️", why: "Unclogs pores and exfoliates dead skin while you sleep. Use 2–3x per week.",              tag: "✦ New",           tagColor: C.premium,   tagBg: C.premiumMid },
      { name: "Retinol 0.3%",     brand: "The Ordinary",       done: false, emoji: "🔬", why: "Stimulates collagen overnight — the gold standard anti-aging ingredient. Start slow.",    tag: "Anti-aging",      tagColor: "#5A5000",   tagBg: "#FFFDE8" },
      { name: "Night Moisturiser",brand: "Laneige Water Bank",  done: false, emoji: "🌙", why: "Heavier PM formula that repairs and locks in moisture during sleep — your skin works hardest at night.", tag: "Repair Mode", tagColor: "#1A6A88", tagBg: C.accentLight },
    ],
  };

  const [stepStates, setStepStates] = useState({ AM: [true,true,true,false,false], PM: [false,false,false,false,false] });

  const currentSteps = allSteps[routineTab].map((s, i) => ({ ...s, done: stepStates[routineTab][i] }));
  const doneCount = currentSteps.filter(s => s.done).length;

  const toggleStep = (e, i) => {
    e.stopPropagation();
    setStepStates(prev => {
      const updated = [...prev[routineTab]];
      updated[i] = !updated[i];
      return { ...prev, [routineTab]: updated };
    });
  };

  return (
    <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>

        {/* ── HERO HEADER — LIGHT ─────────────────────── */}
        <div style={{
          background: "linear-gradient(150deg, #D4F0FB 0%, #E8F8FF 50%, #E2F4FC 100%)",
          padding: "0 20px 18px",
          borderBottom: `1px solid ${C.border}`,
          position: "relative", overflow: "hidden",
        }}>
          {/* Soft orbs */}
          <div style={{ position: "absolute", top: -30, right: -20, width: 130, height: 130, borderRadius: "50%", background: C.accentMid, opacity: 0.18 }} />
          <div style={{ position: "absolute", bottom: -20, left: -30, width: 110, height: 110, borderRadius: "50%", background: C.mint, opacity: 0.25 }} />

          {/* Top bar — brand + actions */}
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
              {/* Notification bell */}
              <div onClick={() => onNav("daily")} style={{ position: "relative", cursor: "pointer", padding: 4 }}>
                <span style={{ fontSize: 20 }}>🔔</span>
                <div style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: C.danger, border: `1.5px solid ${C.bg}` }} />
              </div>
              {/* Avatar */}
              <div onClick={() => onNav("loyalty")} style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accentMid}, ${C.mint})`, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.surface}`, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                <span style={{ fontSize: 16 }}>👤</span>
              </div>
            </div>
          </div>

          {/* Greeting + headline */}
          <div style={{ position: "relative", zIndex: 1, marginBottom: 14 }}>
            <Text size={11} color={C.sub} style={{ letterSpacing: "0.04em", marginBottom: 3 }}>Good morning, Nida ✦</Text>
            <Text size={21} weight={800} style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.2, color: C.text }}>
              Your skin is getting<br />
              <span style={{ color: C.accent }}>smarter every day.</span>
            </Text>
          </div>

          {/* Skin Score card — light version */}
          <div onClick={() => onNav("tracker")} style={{
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
                  <div key={label} style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span style={{ fontSize: 7, color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                      <span style={{ fontSize: 7, color: C.sub, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{val}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, background: C.card }}>
                      <div style={{ height: "100%", width: `${val}%`, borderRadius: 99, background: barColor }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span style={{ color: C.muted, fontSize: 16 }}>›</span>
          </div>
        </div>

        {/* ── REAL-TIME ENVIRONMENT BANNER — merged, standout ── */}
        <div style={{ padding: "14px 20px 0" }}>
          <div onClick={() => onNav("weather")} style={{
            borderRadius: 16, overflow: "hidden", cursor: "pointer",
            background: "linear-gradient(120deg, #0D3A50 0%, #1A6A7A 55%, #1A5040 100%)",
            boxShadow: "0 4px 20px rgba(13,58,80,0.18)",
            position: "relative",
          }}>
            {/* Subtle texture ring */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 130, height: 130, borderRadius: "50%", background: C.accentMid, opacity: 0.12, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -30, left: -20, width: 100, height: 100, borderRadius: "50%", background: C.mint, opacity: 0.10, pointerEvents: "none" }} />

            <div style={{ padding: "14px 16px", position: "relative", zIndex: 1 }}>
              {/* Top row: label + live badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a7 7 0 017 7c0 4-7 13-7 13S5 13 5 9a7 7 0 017-7z" stroke={C.accentMid} strokeWidth="1.8"/>
                    <circle cx="12" cy="9" r="2.5" stroke={C.accentMid} strokeWidth="1.8"/>
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Bangkok · Real-Time Environment</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 99, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }} />
                  <span style={{ fontSize: 8, fontWeight: 700, color: "#9BE9FA", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>LIVE</span>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { icon: "🌡️", label: "Temp",    value: "34°C",   note: "Humid" },
                  { icon: "☁️", label: "PM2.5",   value: "AQI 142", note: "Unhealthy", alert: true },
                  { icon: "☀️", label: "UV Index", value: "9 Very High", note: "SPF required", alert: true },
                ].map(s => (
                  <div key={s.label} style={{
                    flex: 1, background: s.alert ? "rgba(220,100,50,0.18)" : "rgba(255,255,255,0.08)",
                    border: `1px solid ${s.alert ? "rgba(220,100,50,0.4)" : "rgba(255,255,255,0.12)"}`,
                    borderRadius: 10, padding: "8px 8px 7px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 14, marginBottom: 3 }}>{s.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: s.alert ? "#FFB380" : "#9BE9FA", fontFamily: "Syne, sans-serif", lineHeight: 1.1 }}>{s.value}</div>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{s.note}</div>
                  </div>
                ))}
              </div>

              {/* Routine impact pill */}
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,180,60,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 9 }}>⚠</span>
                </div>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif" }}>
                  Routine auto-adjusted — skip AHA/BHA today · extra SPF layer added
                </span>
                <span style={{ fontSize: 13, color: "rgba(155,233,250,0.6)", marginLeft: "auto" }}>›</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TODAY'S ROUTINE ─────────────────────────── */}
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <Text size={13} weight={800}>Today's Routine</Text>
            {/* AM / PM toggle */}
            <div style={{ display: "flex", background: C.card, borderRadius: 10, padding: 2, border: `1px solid ${C.border}` }}>
              {["AM", "PM"].map(tab => (
                <div key={tab} onClick={() => { setRoutineTab(tab); setExpandedStep(null); }} style={{
                  padding: "5px 16px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer",
                  background: routineTab === tab ? C.surface : "transparent",
                  color: routineTab === tab ? C.accent : C.muted,
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: routineTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                }}>{tab}</div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <Text size={10} color={C.sub}>{doneCount} of {currentSteps.length} done</Text>
              <Text size={10} color={C.accent} weight={700}>{Math.round((doneCount / currentSteps.length) * 100)}%</Text>
            </div>
            <div style={{ height: 5, borderRadius: 99, background: C.card, border: `1px solid ${C.border}` }}>
              <div style={{ height: "100%", width: `${(doneCount / currentSteps.length) * 100}%`, borderRadius: 99, background: C.accentMid, transition: "width 0.3s" }} />
            </div>
          </div>

          {/* Step list */}
          <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {currentSteps.map((step, i) => {
              const isExp = expandedStep === i;
              return (
                <div key={step.name} style={{ borderBottom: i < currentSteps.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                  <div
                    onClick={() => setExpandedStep(isExp ? null : i)}
                    style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", background: isExp ? "#F0F8FF" : "transparent", cursor: "pointer" }}
                  >
                    {/* Tappable checkbox */}
                    <div
                      onClick={(e) => toggleStep(e, i)}
                      style={{
                        width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                        border: `2px solid ${step.done ? C.accent : C.border}`,
                        background: step.done ? C.accentMid : C.surface,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                    >
                      {step.done && <span style={{ fontSize: 10, color: "#0D2A3A", fontWeight: 800 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 17, flexShrink: 0 }}>{step.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                        <Text size={12} weight={700} color={step.done ? C.muted : C.text} style={{ textDecoration: step.done ? "line-through" : "none" }}>{step.name}</Text>
                        <div style={{ padding: "1px 6px", borderRadius: 99, background: step.tagBg, fontSize: 8, fontWeight: 700, color: step.tagColor, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{step.tag}</div>
                      </div>
                      <Text size={10} color={C.muted}>{step.brand}</Text>
                    </div>
                    <span style={{ fontSize: 12, color: C.muted, transform: isExp ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>›</span>
                  </div>
                  {isExp && (
                    <div style={{ padding: "8px 13px 12px 46px", background: "#F0F8FF" }}>
                      <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 12 }}>💡</span>
                        <Text size={11} color="#1A5A78" style={{ lineHeight: 1.65 }}>{step.why}</Text>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div onClick={() => onNav("routine")} style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: C.accent, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            Manage routine + expiry tracker →
          </div>
        </div>

        {/* ── CORE TOOLS ──────────────────────────────── */}
        {/*
          Color logic:
          • Mint (#E8FFFB) = safe / scan — green means "go, check compatibility"
          • Blue (#E2F4FC) = intelligence / AI — brand primary = PhewPhew AI
          • Yellow (#FFFDE8) = premium / caution — matches PremiumTag colour, signals paid
          Each pair uses the same hue family so premium tools are instantly grouped.
        */}
        <div style={{ padding: "16px 20px 0" }}>
          <SectionHead label="Core Tools" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "◎", label: "Ingredient Scanner", sub: "Photo scan · conflict check",   screen: "scan",     bg: "#E8FFFB", border: "#7ADFC8", iconColor: C.mintDark, premium: false },
              { icon: "◈", label: "AI Skin Analysis",   sub: "Sensor + AI · deep insights",   screen: "analysis", bg: C.accentLight, border: C.border, iconColor: C.accent, premium: false },
              { icon: "◉", label: "Progress Tracker",   sub: "Before/After · score trend",    screen: "tracker",  bg: C.accentLight, border: C.border, iconColor: C.accent, premium: true },
              { icon: "✚", label: "Derm Consult",       sub: "Video call · ฿300–500/session", screen: "derm",     bg: "#FFFDE8",  border: "#E0D840", iconColor: "#5A5000", premium: true },
            ].map(a => (
              <div key={a.label} onClick={() => onNav(a.screen)} style={{ background: a.bg, border: `1.5px solid ${a.border}`, borderRadius: 14, padding: "13px 13px 12px", cursor: "pointer", position: "relative" }}>
                {a.premium && <div style={{ position: "absolute", top: 9, right: 9 }}><PremiumTag /></div>}
                <span style={{ fontSize: 22, color: a.iconColor }}>{a.icon}</span>
                <Text size={12} weight={700} style={{ marginTop: 8, lineHeight: 1.3 }}>{a.label}</Text>
                <Text size={10} color={C.sub} style={{ marginTop: 3, lineHeight: 1.4 }}>{a.sub}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* ── DAILY LIFE ──────────────────────────────── */}
        <div style={{ padding: "16px 20px 0" }}>
          <SectionHead label="Daily Life" />

          {/* Daily Wellness — advanced tips with nutritional specifics */}
          <div onClick={() => onNav("daily")} style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
            padding: "14px 16px", cursor: "pointer", position: "relative",
          }}>
            <div style={{ position: "absolute", top: 12, right: 12 }}><PremiumTag /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FFFDE8", border: `1px solid #E0D840`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 18 }}>✿</span>
              </div>
              <div>
                <Text size={12} weight={700}>Daily Wellness Tips</Text>
                <Text size={10} color={C.sub}>AI-matched to your skin profile today</Text>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                {
                  icon: "🥦",
                  title: "Eat broccoli or kale today",
                  desc: "Sulforaphane in cruciferous veg activates Nrf2 — boosts your skin's own UV defence by ~30%",
                  tag: "Antioxidant",
                  tagColor: C.mintDark, tagBg: "#E8FFFB",
                  progress: 0,
                },
                {
                  icon: "🐟",
                  title: "Add omega-3 (salmon / flaxseed)",
                  desc: "EPA reduces prostaglandin E2 — directly lowers the inflammatory response behind your breakouts",
                  tag: "Anti-inflammatory",
                  tagColor: C.accent, tagBg: C.accentLight,
                  progress: 100,
                },
                {
                  icon: "💧",
                  title: "Hydration — 3 of 8 glasses done",
                  desc: "Dehydration thickens ceramide layers — aim 500ml before noon to maintain transepidermal water loss",
                  tag: "Barrier",
                  tagColor: "#1A6A88", tagBg: C.accentLight,
                  progress: 38,
                },
              ].map(tip => (
                <div key={tip.title} style={{
                  background: C.card, borderRadius: 10, padding: "9px 11px",
                  display: "flex", gap: 10, alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{tip.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <Text size={11} weight={700}>{tip.title}</Text>
                      <div style={{ padding: "1px 6px", borderRadius: 99, background: tip.tagBg, fontSize: 7, fontWeight: 700, color: tip.tagColor, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>{tip.tag}</div>
                    </div>
                    <Text size={9} color={C.sub} style={{ lineHeight: 1.55 }}>{tip.desc}</Text>
                    {tip.progress > 0 && (
                      <div style={{ marginTop: 5, height: 3, borderRadius: 99, background: C.border }}>
                        <div style={{ height: "100%", width: `${tip.progress}%`, borderRadius: 99, background: tip.progress === 100 ? C.mint : C.accentMid }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 10, color: C.accent, fontWeight: 600, textAlign: "right", fontFamily: "'DM Sans', sans-serif" }}>See all 7 tips today →</div>
          </div>
        </div>

        {/* ── COMMUNITY & LOYALTY ─────────────────────── */}
        <div style={{ padding: "16px 20px 0" }}>
          <SectionHead label="Community & Rewards" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

            {/* Community — with SVG icon */}
            <div onClick={() => onNav("community")} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px", cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "#EEF4FF", border: "1px solid #C8D8F8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="7" r="4" stroke="#4A6CF7" strokeWidth="1.8"/>
                  <path d="M2 21c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#4A6CF7" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="19" cy="8" r="3" stroke="#4A6CF7" strokeWidth="1.6"/>
                  <path d="M22 21c0-2.76-1.34-5-3-6" stroke="#4A6CF7" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <Text size={12} weight={700}>Community</Text>
              <Text size={10} color={C.sub} style={{ marginTop: 2 }}>Reviews · Routines</Text>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 3 }}>
                {["🙂","😊","🙂"].map((e, i) => <span key={i} style={{ fontSize: 11 }}>{e}</span>)}
                <Text size={9} color={C.muted} style={{ marginLeft: 4 }}>2.4k active</Text>
              </div>
            </div>

            {/* Loyalty */}
            <div onClick={() => onNav("loyalty")} style={{
              background: C.accentLight, border: `1.5px solid ${C.accentMid}`, borderRadius: 14, padding: "14px", cursor: "pointer",
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: C.accentMid, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="#0D2A3A" strokeWidth="1.8" strokeLinejoin="round" fill="#0D2A3A" fillOpacity="0.15"/>
                </svg>
              </div>
              <Text size={12} weight={700} color={C.text}>Loyalty Points</Text>
              <Text size={20} weight={800} color={C.accent} style={{ marginTop: 2, fontFamily: "Syne, sans-serif", lineHeight: 1 }}>1,240</Text>
              <Text size={9} color={C.sub} style={{ marginTop: 2 }}>Gold · 260 pts to Platinum</Text>
              <div style={{ marginTop: 6, height: 4, borderRadius: 99, background: C.border }}>
                <div style={{ height: "100%", width: "82%", borderRadius: 99, background: C.accentMid }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── SHOP ─────────────────────────────────────── */}
        <div style={{ padding: "16px 20px 0" }}>
          <SectionHead label="Shop" action="See all →" onAction={() => onNav("shop")} />
          <div onClick={() => onNav("shop")} style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
            padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
          }}>
            <div style={{ display: "flex" }}>
              {["🧴","💊","🌿"].map((e, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i > 0 ? -8 : 0, border: `2px solid ${C.surface}` }}>
                  <span style={{ fontSize: 18 }}>{e}</span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <Text size={12} weight={700}>Personalised Picks for You</Text>
              <Text size={10} color={C.sub}>4 products matched to your skin · AI-curated</Text>
            </div>
            <span style={{ color: C.muted, fontSize: 16 }}>›</span>
          </div>
        </div>

        <div style={{ height: 10 }} />
      </Box>
      <NavBar active="home" onNav={onNav} />
    </Box>
  );
}

function ScanScreen({ onNav }) {
  // phase: "camera" | "scanning" | "result" | "manual" | "recent-detail"
  const [phase, setPhase] = useState("camera");
  const [scanProgress, setScanProgress] = useState(0);
  const [inputMode, setInputMode] = useState("camera"); // "camera" | "text"
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [selectedRecent, setSelectedRecent] = useState(null);
  const [frame, setFrame] = useState(0); // simulated live camera frame counter

  // Simulate live camera feed with frame counter
  useEffect(() => {
    const interval = setInterval(() => setFrame(f => (f + 1) % 60), 100);
    return () => clearInterval(interval);
  }, []);

  const recentScans = [
    { id: 1, name: "COSRX AHA/BHA Clarifying Toner", brand: "COSRX", date: "Today, 9:14 AM", safe: true, conflict: false, emoji: "🧴",
      ingredients: [
        { name: "Glycolic Acid 0.1%", tag: "EXFOLIANT", safe: true },
        { name: "BHA 0.1%", tag: "PORE CARE", safe: true },
        { name: "Niacinamide 3%", tag: "BRIGHTENING", safe: true },
      ],
      summary: "Safe for your combination skin. Low concentration actives — no conflicts with your current routine.",
    },
    { id: 2, name: "The Ordinary Niacinamide 10%", brand: "The Ordinary", date: "Yesterday", safe: true, conflict: false, emoji: "💧",
      ingredients: [
        { name: "Niacinamide 10%", tag: "BRIGHTENING", safe: true },
        { name: "Zinc PCA 1%", tag: "OIL CONTROL", safe: true },
        { name: "Aqua / Water", tag: "BASE", safe: true },
      ],
      summary: "Compatible. Niacinamide at 10% is well-tolerated — avoid combining with Vitamin C serum at the same step.",
    },
    { id: 3, name: "Paula's Choice 2% BHA Exfoliant", brand: "Paula's Choice", date: "Mar 10", safe: false, conflict: true, emoji: "⚗️",
      ingredients: [
        { name: "Salicylic Acid 2%", tag: "EXFOLIANT", safe: true },
        { name: "Methylpropanediol", tag: "PENETRATION", safe: true },
        { name: "Fragrance", tag: "⚠ IRRITANT", safe: false },
      ],
      summary: "⚠ Conflict detected: Fragrance listed. Your profile flags fragrance sensitivity. Use with caution.",
    },
  ];

  // Trigger scan animation then show result
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

  // Simulated live camera noise pattern based on frame
  const camNoise = Array.from({ length: 6 }, (_, i) => ({
    x: 10 + ((frame * 7 + i * 43) % 80),
    y: 10 + ((frame * 11 + i * 29) % 60),
    op: 0.04 + (Math.sin((frame + i * 10) * 0.3) * 0.02),
  }));

  if (phase === "recent-detail" && selectedRecent) {
    const r = selectedRecent;
    return (
      <Box style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
        <StatusBar />
        <Box style={{ padding: "4px 20px 14px", display: "flex", alignItems: "center", gap: 12 }}>
          <div onClick={() => { setPhase("camera"); setSelectedRecent(null); }} style={{ cursor: "pointer", color: C.sub, fontSize: 20 }}>‹</div>
          <Text size={17} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Scan Result</Text>
          <Text size={10} color={C.muted} style={{ marginLeft: "auto" }}>{r.date}</Text>
        </Box>
        <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
          {/* Header card */}
          <div style={{ background: r.safe ? "#E8FFFB" : "#FFF3E8", border: `1.5px solid ${r.safe ? "#7ADFC8" : "#F0A060"}`, borderRadius: 16, padding: "16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{r.emoji}</div>
            <div style={{ flex: 1 }}>
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
            {r.ingredients.map(ing => (
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
        <NavBar active="scan" onNav={onNav} />
      </Box>
    );
  }

  return (
    <Box style={{ height: "100%", background: "#0D1F2A", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0D1F2A" }}><StatusBar /></div>

      {/* ── Header ── */}
      <div style={{ padding: "2px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", color: "#9BE9FA", fontSize: 20, lineHeight: 1 }}>‹</div>
        <Text size={17} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif" }}>Ingredient Scanner</Text>
        {/* Mode toggle */}
        <div style={{ marginLeft: "auto", display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 2 }}>
          {[["camera","📷"],["text","✏️"]].map(([m, ico]) => (
            <div key={m} onClick={() => { setInputMode(m); if (phase !== "result") setPhase(m === "text" ? "manual" : "camera"); }} style={{
              padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer",
              background: inputMode === m ? "rgba(155,233,250,0.2)" : "transparent",
              color: inputMode === m ? C.accentMid : "rgba(255,255,255,0.45)",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: 4,
            }}><span>{ico}</span><span style={{ textTransform: "capitalize" }}>{m}</span></div>
          ))}
        </div>
      </div>

      {/* ── CAMERA PHASE — full-bleed live viewport ── */}
      {(phase === "camera" || phase === "scanning") && inputMode === "camera" && (
        <>
          {/* Live camera fill — takes most of the screen */}
          <div style={{ position: "relative", flex: "0 0 auto", height: 320, overflow: "hidden" }}>
            {/* Simulated live feed background */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #0D2A3A, #0A1A24, #0D3240)" }} />
            {/* Moving noise blobs that simulate live video */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              {camNoise.map((n, i) => (
                <ellipse key={i} cx={n.x} cy={n.y} rx={12 + i * 3} ry={8 + i * 2}
                  fill={i % 2 === 0 ? "#9BE9FA" : "#b5ffef"} opacity={n.op} />
              ))}
              {/* Shelf/label simulation lines */}
              <rect x="15" y="38" width="70" height="28" rx="2" fill="none" stroke="rgba(155,233,250,0.06)" strokeWidth="0.5"/>
              <line x1="15" y1="48" x2="85" y2="48" stroke="rgba(155,233,250,0.04)" strokeWidth="0.3"/>
              <line x1="15" y1="55" x2="72" y2="55" stroke="rgba(155,233,250,0.04)" strokeWidth="0.3"/>
            </svg>

            {/* Scan frame overlay */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 220, height: 130 }}>
                {/* Corner brackets */}
                {[["0,0","row"],["100%,0","row-reverse"],["0,100%","row"],["100%,100%","row-reverse"]].map(([pos, dir], ci) => {
                  const [x, y] = pos.split(",");
                  return (
                    <div key={ci} style={{ position: "absolute", left: x, top: y, width: 20, height: 20, transform: `translate(${x === "0" ? "0" : "-100%"}, ${y === "0" ? "0" : "-100%"})` }}>
                      <div style={{ width: 20, height: 3, background: C.accentMid, borderRadius: 2, transform: `${x !== "0" ? "scaleX(-1)" : ""}` }} />
                      <div style={{ width: 3, height: 20, background: C.accentMid, borderRadius: 2, marginTop: -3, transform: `${y !== "0" ? "scaleY(-1) translateY(17px)" : ""}` }} />
                    </div>
                  );
                })}
                {/* Scan line animation */}
                {phase === "scanning" && (
                  <div style={{ position: "absolute", left: 0, right: 0, top: `${scanProgress}%`, height: 2, background: `linear-gradient(90deg, transparent, ${C.accentMid}, transparent)`, transition: "top 0.06s linear", borderRadius: 99 }} />
                )}
                {/* Instruction / detected text */}
                <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: 10, color: phase === "scanning" ? C.accentMid : "rgba(155,233,250,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                    {phase === "scanning" ? `Analysing... ${scanProgress}%` : "Point at ingredient label"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom overlay: live badge + torch */}
            <div style={{ position: "absolute", top: 12, left: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: 9, color: "rgba(155,233,250,0.8)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>LIVE</span>
            </div>
            <div style={{ position: "absolute", top: 10, right: 16, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 16 }}>🔦</span>
            </div>

            {/* Progress bar at very bottom of camera */}
            {phase === "scanning" && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.1)" }}>
                <div style={{ height: "100%", width: `${scanProgress}%`, background: C.accentMid, transition: "width 0.06s" }} />
              </div>
            )}
          </div>

          {/* ── Bottom sheet (light) ── */}
          <div style={{ flex: 1, background: C.bg, borderRadius: "20px 20px 0 0", padding: "16px 20px 0", overflowY: "auto" }}>
            {/* Drag handle */}
            <div style={{ width: 36, height: 4, borderRadius: 99, background: C.border, margin: "0 auto 14px" }} />

            {/* Primary action */}
            {phase === "camera" && (
              <div onClick={triggerScan} style={{ width: "100%", padding: "15px", borderRadius: 16, background: `linear-gradient(120deg, ${C.accentMid}, ${C.accent})`, textAlign: "center", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#0D2A3A", boxShadow: `0 6px 20px ${C.accentMid}66`, marginBottom: 12 }}>
                ◎  Scan Ingredients
              </div>
            )}
            {phase === "scanning" && (
              <div style={{ width: "100%", padding: "15px", borderRadius: 16, background: C.card, textAlign: "center", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", color: C.muted, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ fontSize: 12 }}>⟳</span> Scanning... {scanProgress}%
              </div>
            )}

            {/* Upload alternative */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              <div style={{ flex: 1, padding: "10px", borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 12, fontWeight: 600, cursor: "pointer", color: C.text, fontFamily: "'DM Sans', sans-serif" }}>
                📁 Upload Photo
              </div>
              <div onClick={() => { setInputMode("text"); setPhase("manual"); }} style={{ flex: 1, padding: "10px", borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 12, fontWeight: 600, cursor: "pointer", color: C.text, fontFamily: "'DM Sans', sans-serif" }}>
                ✏️ Type Manually
              </div>
            </div>

            {/* Recent scans */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Text size={12} weight={800}>Recent Scans</Text>
              <Text size={10} color={C.accent} weight={600} style={{ cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>See all</Text>
            </div>
            {recentScans.map(s => (
              <div key={s.id} onClick={() => { setSelectedRecent(s); setPhase("recent-detail"); }} style={{ background: C.surface, border: `1px solid ${s.conflict ? "#F0C080" : C.border}`, borderRadius: 12, padding: "11px 14px", marginBottom: 9, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: s.safe ? "#E8FFFB" : "#FFF3E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text size={12} weight={700} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</Text>
                  <Text size={10} color={C.muted}>{s.date}</Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ padding: "2px 8px", borderRadius: 99, background: s.safe ? "#E8FFFB" : "#FFF3E8", fontSize: 9, fontWeight: 700, color: s.safe ? C.mintDark : "#C05000", fontFamily: "'DM Sans', sans-serif", border: `1px solid ${s.safe ? "#7ADFC8" : "#F0A060"}` }}>
                    {s.safe ? "✓ Safe" : "⚠ Conflict"}
                  </span>
                  <span style={{ color: C.muted, fontSize: 14 }}>›</span>
                </div>
              </div>
            ))}
            <div style={{ height: 80 }} />
          </div>
        </>
      )}

      {/* ── MANUAL TEXT INPUT ── */}
      {phase === "manual" && inputMode === "text" && (
        <div style={{ flex: 1, background: C.bg, borderRadius: "20px 20px 0 0", marginTop: 0, overflowY: "auto", padding: "20px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: C.accentLight, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>✏️</span>
            </div>
            <div>
              <Text size={13} weight={800}>Enter Product Details</Text>
              <Text size={10} color={C.sub}>No photo? Describe it and we'll analyse.</Text>
            </div>
          </div>

          {/* Product name input */}
          <div style={{ marginBottom: 14 }}>
            <Text size={11} weight={700} color={C.sub} style={{ letterSpacing: "0.05em", marginBottom: 5 }}>PRODUCT NAME</Text>
            <div style={{ background: C.surface, border: `1.5px solid ${productName ? C.accent : C.border}`, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>🧴</span>
              <input
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="e.g. COSRX Advanced Snail Mucin"
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: C.text }}
              />
              {productName && <span onClick={() => setProductName("")} style={{ fontSize: 14, color: C.muted, cursor: "pointer" }}>×</span>}
            </div>
          </div>

          {/* Ingredients / description */}
          <div style={{ marginBottom: 20 }}>
            <Text size={11} weight={700} color={C.sub} style={{ letterSpacing: "0.05em", marginBottom: 5 }}>INGREDIENTS OR DESCRIPTION <span style={{ fontWeight: 400, textTransform: "none", fontSize: 10 }}>(optional)</span></Text>
            <div style={{ background: C.surface, border: `1.5px solid ${productDesc ? C.accent : C.border}`, borderRadius: 12, padding: "12px 14px" }}>
              <textarea
                value={productDesc}
                onChange={e => setProductDesc(e.target.value)}
                placeholder={"Paste ingredient list or describe the product...\ne.g. Niacinamide, Zinc PCA, Hyaluronic Acid, Fragrance"}
                rows={4}
                style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: C.text, resize: "none", lineHeight: 1.6 }}
              />
            </div>
            <Text size={9} color={C.muted} style={{ marginTop: 5, fontFamily: "'DM Sans', sans-serif" }}>Tip: Copy directly from the product label or brand website for best results</Text>
          </div>

          <div onClick={triggerManualScan} style={{ width: "100%", padding: "15px", borderRadius: 16, background: productName ? `linear-gradient(120deg, ${C.accentMid}, ${C.accent})` : C.card, textAlign: "center", fontSize: 14, fontWeight: 800, cursor: productName ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", color: productName ? "#0D2A3A" : C.muted, boxShadow: productName ? `0 6px 20px ${C.accentMid}55` : "none", transition: "all 0.2s" }}>
            {productName ? "◎  Analyse Product" : "Enter product name above"}
          </div>

          {/* Recent scans compact */}
          <div style={{ marginTop: 20 }}>
            <Text size={12} weight={800} style={{ marginBottom: 10 }}>Recent Scans</Text>
            {recentScans.map(s => (
              <div key={s.id} onClick={() => { setSelectedRecent(s); setPhase("recent-detail"); }} style={{ background: C.surface, border: `1px solid ${s.conflict ? "#F0C080" : C.border}`, borderRadius: 12, padding: "11px 14px", marginBottom: 9, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: s.safe ? "#E8FFFB" : "#FFF3E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text size={12} weight={700} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</Text>
                  <Text size={10} color={C.muted}>{s.date}</Text>
                </div>
                <span style={{ color: C.muted, fontSize: 14 }}>›</span>
              </div>
            ))}
            <div style={{ height: 80 }} />
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {phase === "result" && (
        <div style={{ flex: 1, background: C.bg, overflowY: "auto" }}>

          {/* ── Hero verdict — full bleed colour block ── */}
          <div style={{
            background: "linear-gradient(145deg, #0A2E20, #0D4A30)",
            padding: "20px 20px 28px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "#b5ffef", opacity: 0.08 }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 90, height: 90, borderRadius: "50%", background: C.mint, opacity: 0.1 }} />

            {/* Product identity row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, position: "relative", zIndex: 1 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🧴</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "Syne, sans-serif", lineHeight: 1.3 }}>
                  {productName || "COSRX Niacinamide Serum"}
                </div>
                <div style={{ fontSize: 10, color: "rgba(181,255,239,0.7)", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>
                  {inputMode === "text" ? "✏️ Entered manually" : "📷 Camera scan · COSRX"}
                </div>
              </div>
            </div>

            {/* Score + verdict side by side */}
            <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative", zIndex: 1 }}>
              {/* Compatibility score ring */}
              <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
                  <circle cx="36" cy="36" r="30" fill="none" stroke="#4ade80" strokeWidth="6"
                    strokeDasharray={`${0.88 * 188.5} ${188.5}`}
                    strokeLinecap="round" strokeDashoffset="47"
                    transform="rotate(-90 36 36)"/>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "Syne, sans-serif", lineHeight: 1 }}>88</span>
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>/100</span>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#4ade80", fontFamily: "Syne, sans-serif", lineHeight: 1.2, marginBottom: 5 }}>
                  Great match for<br />your skin
                </div>
                <div style={{ fontSize: 10, color: "rgba(181,255,239,0.75)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}>
                  3 actives work well together · 1 minor flag (fragrance) — safe to use with caution
                </div>
              </div>
            </div>

            {/* 3 quick stat pills */}
            <div style={{ display: "flex", gap: 7, marginTop: 16, position: "relative", zIndex: 1 }}>
              {[
                { label: "4 ingredients", sub: "detected", color: "rgba(155,233,250,0.15)", border: "rgba(155,233,250,0.25)", text: C.accentMid },
                { label: "3 compatible", sub: "with your skin", color: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.3)", text: "#4ade80" },
                { label: "1 flag", sub: "fragrance", color: "rgba(255,180,60,0.12)", border: "rgba(255,180,60,0.3)", text: "#FFB43A" },
              ].map(p => (
                <div key={p.label} style={{ flex: 1, padding: "8px 8px 6px", borderRadius: 10, background: p.color, border: `1px solid ${p.border}`, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: p.text, fontFamily: "Syne, sans-serif" }}>{p.label}</div>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", marginTop: 1 }}>{p.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Body — light scrollable content ── */}
          <div style={{ padding: "16px 20px 0" }}>

            {/* Ingredient breakdown */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 14, overflow: "hidden" }}>
              <div style={{ padding: "13px 16px 10px", borderBottom: `1px solid ${C.border}` }}>
                <Text size={12} weight={800}>Ingredient Breakdown</Text>
              </div>
              {[
                { name: "Niacinamide 10%",  tag: "BRIGHTENING",  safe: true,  note: "Reduces pores + pigmentation. Works well with your Zinc toner." },
                { name: "Zinc PCA 1%",       tag: "OIL CONTROL",  safe: true,  note: "Balances sebum — ideal for your combination skin type." },
                { name: "Hyaluronic Acid",   tag: "HYDRATION",    safe: true,  note: "Draws moisture into skin. Layer before moisturiser for best effect." },
                { name: "Fragrance",         tag: "⚠ IRRITANT",   safe: false, note: "Your profile flags fragrance sensitivity. Watch for redness or itching." },
              ].map((ing, i, arr) => (
                <div key={ing.name} style={{ padding: "11px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", background: ing.safe ? "transparent" : "#FFFAF5" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: ing.note ? 5 : 0 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: ing.safe ? "#4ade80" : C.danger, flexShrink: 0 }} />
                    <Text size={12} weight={700}>{ing.name}</Text>
                    <div style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: 99, background: ing.safe ? C.accentLight : "#FDE8E8", fontSize: 8, fontWeight: 700, color: ing.safe ? "#1A6A88" : C.danger, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>{ing.tag}</div>
                  </div>
                  {ing.note && <Text size={10} color={ing.safe ? C.sub : "#B05000"} style={{ paddingLeft: 19, lineHeight: 1.55 }}>{ing.note}</Text>}
                </div>
              ))}
            </div>

            {/* Routine conflict check */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 14, overflow: "hidden" }}>
              <div style={{ padding: "13px 16px 10px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Text size={12} weight={800}>Routine Compatibility</Text>
                <span style={{ padding: "2px 8px", borderRadius: 99, background: "#E8FFFB", fontSize: 9, fontWeight: 700, color: C.mintDark, fontFamily: "'DM Sans', sans-serif", border: `1px solid #7ADFC8` }}>✓ No conflicts</span>
              </div>
              {[
                { step: "Vitamin C Serum", icon: "🍊", ok: true,  note: "Use Niacinamide at a different time — alternating AM/PM is ideal." },
                { step: "BHA Toner",       icon: "⚗️", ok: true,  note: "No conflict. BHA + Niacinamide complement each other." },
                { step: "SPF 50",          icon: "☀️", ok: true,  note: "Apply this before SPF for best absorption." },
              ].map((r, i, arr) => (
                <div key={r.step} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <Text size={11} weight={700}>{r.step}</Text>
                    <Text size={10} color={C.sub} style={{ marginTop: 2, lineHeight: 1.5 }}>{r.note}</Text>
                  </div>
                  <span style={{ fontSize: 13, color: "#4ade80", flexShrink: 0 }}>✓</span>
                </div>
              ))}
            </div>

            {/* Where to use pill */}
            <div style={{ background: C.accentLight, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <div>
                <Text size={11} weight={700} color={C.accent}>Best used in your AM routine</Text>
                <Text size={10} color={C.sub} style={{ marginTop: 2, lineHeight: 1.5 }}>After toner, before moisturiser. Pat gently — do not rub.</Text>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div
                onClick={() => { setPhase("camera"); setInputMode("camera"); setProductName(""); setProductDesc(""); setScanProgress(0); }}
                style={{ flex: 1, padding: "13px", borderRadius: 14, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: C.text }}
              >
                ← Scan Again
              </div>
              <div style={{ flex: 2, padding: "13px", borderRadius: 14, background: `linear-gradient(120deg, ${C.accentMid}, ${C.accent})`, textAlign: "center", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#0D2A3A", boxShadow: `0 4px 16px ${C.accentMid}55` }}>
                + Add to AM Routine
              </div>
            </div>

            {/* Secondary action: share / derm */}
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1, padding: "11px", borderRadius: 14, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: C.sub }}>
                🔗 Share Result
              </div>
              <div onClick={() => onNav("derm")} style={{ flex: 1, padding: "11px", borderRadius: 14, background: "#FFFDE8", border: `1px solid #E0D840`, textAlign: "center", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#5A5000" }}>
                ✚ Ask Derm
              </div>
            </div>

            <div style={{ height: 90 }} />
          </div>
        </div>
      )}

      <NavBar active="scan" onNav={onNav} />
    </Box>
  );
}

function AnalysisScreen({ onNav }) {
  const [phase, setPhase] = useState("capture"); // capture | analysing | result
  const [progress, setProgress] = useState(0);
  const [captureMode, setCaptureMode] = useState("camera"); // camera | upload
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % 80), 120);
    return () => clearInterval(t);
  }, []);

  const triggerAnalysis = () => {
    setPhase("analysing");
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) { clearInterval(t); setTimeout(() => setPhase("result"), 400); }
    }, 55);
  };

  // Simulated face blob for live viewfinder
  const faceBlobs = Array.from({ length: 5 }, (_, i) => ({
    cx: 50 + Math.sin((frame + i * 16) * 0.05) * 1.5,
    cy: 50 + Math.cos((frame + i * 12) * 0.04) * 1,
    r: 22 + i * 1.5 + Math.sin((frame + i * 8) * 0.08) * 0.8,
    op: 0.03 + i * 0.006,
  }));

  const analysisStages = ["Mapping facial zones", "Detecting skin texture", "Measuring pore density", "Analysing pigmentation", "Cross-referencing profile"];

  const currentStage = Math.floor((progress / 100) * analysisStages.length);

  return (
    <Box style={{ height: "100%", background: "#0D1F2A", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0D1F2A" }}><StatusBar /></div>

      {/* Header */}
      <div style={{ padding: "2px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", color: "#9BE9FA", fontSize: 20, lineHeight: 1 }}>‹</div>
        <Text size={17} weight={800} color="#fff" style={{ fontFamily: "Syne, sans-serif" }}>AI Skin Analysis</Text>
        {/* capture mode toggle — only visible in capture phase */}
        {phase === "capture" && (
          <div style={{ marginLeft: "auto", display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 2 }}>
            {[["camera","📷"],["upload","📁"]].map(([m, ico]) => (
              <div key={m} onClick={() => setCaptureMode(m)} style={{
                padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer",
                background: captureMode === m ? "rgba(155,233,250,0.2)" : "transparent",
                color: captureMode === m ? C.accentMid : "rgba(255,255,255,0.4)",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 4,
              }}><span>{ico}</span><span style={{ textTransform: "capitalize" }}>{m}</span></div>
            ))}
          </div>
        )}
      </div>

      {/* ── CAPTURE PHASE ── */}
      {phase === "capture" && (
        <>
          {/* Live camera viewfinder */}
          <div style={{ position: "relative", height: 300, overflow: "hidden", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #0D2A3A, #0A1820, #0D2840)" }} />

            {/* Animated face zone blobs */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              {faceBlobs.map((b, i) => (
                <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.r * 0.7} ry={b.r} fill={C.accentMid} opacity={b.op} />
              ))}
            </svg>

            {/* Face oval guide */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <svg width="140" height="185" viewBox="0 0 140 185" fill="none">
                  <ellipse cx="70" cy="92" rx="62" ry="85"
                    stroke={C.accentMid} strokeWidth="1.5" strokeDasharray="6 3" opacity="0.7"/>
                  {/* Zone scan lines */}
                  {[30, 70, 110, 150].map(y => (
                    <line key={y} x1="16" y1={y} x2="124" y2={y}
                      stroke={C.accentMid} strokeWidth="0.4" opacity="0.15"/>
                  ))}
                  {/* Corner ticks */}
                  {[[8, 7],[132, 7],[8, 178],[132, 178]].map(([x, y], i) => (
                    <g key={i} transform={`rotate(${[0,90,270,180][i]}, ${x}, ${y})`}>
                      <line x1={x} y1={y} x2={x+10} y2={y} stroke={C.accentMid} strokeWidth="2" strokeLinecap="round"/>
                      <line x1={x} y1={y} x2={x} y2={y+10} stroke={C.accentMid} strokeWidth="2" strokeLinecap="round"/>
                    </g>
                  ))}
                </svg>
                <div style={{ position: "absolute", bottom: -24, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: 9, color: "rgba(155,233,250,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Align face within oval</span>
                </div>
              </div>
            </div>

            {/* Live dot */}
            <div style={{ position: "absolute", top: 12, left: 16, display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: 9, color: "rgba(155,233,250,0.8)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>LIVE</span>
            </div>
            {/* Torch */}
            <div style={{ position: "absolute", top: 10, right: 16, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 15 }}>🔦</span>
            </div>

            {/* Upload overlay (when upload mode selected) */}
            {captureMode === "upload" && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(13,26,32,0.88)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(155,233,250,0.12)", border: `1.5px dashed ${C.accentMid}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 28 }}>📁</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Upload a clear selfie</span>
                <span style={{ fontSize: 10, color: "rgba(155,233,250,0.6)", fontFamily: "'DM Sans', sans-serif", textAlign: "center", maxWidth: 200, lineHeight: 1.5 }}>Use natural lighting, no filters. Face front-on for best accuracy.</span>
              </div>
            )}
          </div>

          {/* Bottom sheet */}
          <div style={{ flex: 1, background: C.bg, borderRadius: "20px 20px 0 0", padding: "14px 20px 0", overflowY: "auto" }}>
            <div style={{ width: 36, height: 4, borderRadius: 99, background: C.border, margin: "0 auto 14px" }} />

            {/* Tips row */}
            <div style={{ display: "flex", gap: 7, marginBottom: 16 }}>
              {[
                { icon: "💡", text: "Good lighting" },
                { icon: "😐", text: "Neutral expression" },
                { icon: "🧼", text: "Clean, bare skin" },
              ].map(t => (
                <div key={t.text} style={{ flex: 1, padding: "8px 6px", borderRadius: 11, background: C.card, border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <div style={{ fontSize: 16, marginBottom: 3 }}>{t.icon}</div>
                  <Text size={9} color={C.sub}>{t.text}</Text>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <div onClick={triggerAnalysis} style={{ width: "100%", padding: "15px", borderRadius: 16, background: `linear-gradient(120deg, ${C.accentMid}, ${C.accent})`, textAlign: "center", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#0D2A3A", boxShadow: `0 6px 20px ${C.accentMid}55`, marginBottom: 14 }}>
              {captureMode === "camera" ? "◈  Analyse My Skin" : "📁  Upload & Analyse"}
            </div>

            {/* Physical indicator — Coming Soon banner */}
            <div style={{ background: "linear-gradient(120deg, #1A1A2E, #16213E)", border: "1px solid rgba(155,233,250,0.2)", borderRadius: 16, padding: "14px 16px", marginBottom: 8, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -15, right: -15, width: 70, height: 70, borderRadius: "50%", background: C.accentMid, opacity: 0.06 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(155,233,250,0.1)", border: "1px solid rgba(155,233,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 20 }}>🔬</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <Text size={12} weight={700} color="#9BE9FA">Physical Skin Indicator</Text>
                    <div style={{ padding: "2px 7px", borderRadius: 99, background: "rgba(255,249,175,0.15)", border: "1px solid rgba(255,249,175,0.3)", fontSize: 8, fontWeight: 700, color: "#fff9af", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>COMING SOON</div>
                  </div>
                  <Text size={10} color="rgba(155,233,250,0.55)" style={{ lineHeight: 1.5 }}>Pair a skin sensor for real-time hydration, sebum & pH readings — 3× more accurate than photo alone</Text>
                </div>
              </div>
              <div onClick={() => {}} style={{ marginTop: 10, padding: "8px 14px", borderRadius: 10, background: "rgba(155,233,250,0.08)", border: "1px solid rgba(155,233,250,0.15)", textAlign: "center", cursor: "pointer" }}>
                <Text size={11} weight={600} color={C.accentMid}>🔔 Notify me when available</Text>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── ANALYSING PHASE ── */}
      {phase === "analysing" && (
        <>
          <div style={{ height: 300, position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #0D2A3A, #0A1820)" }} />
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              {faceBlobs.map((b, i) => (
                <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.r * 0.7} ry={b.r} fill={C.accentMid} opacity={b.op * 1.5} />
              ))}
            </svg>
            {/* Scanning sweep */}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              <svg width="140" height="185" viewBox="0 0 140 185" fill="none">
                <ellipse cx="70" cy="92" rx="62" ry="85" stroke={C.accentMid} strokeWidth="1.5" opacity="0.5"/>
              </svg>
            </div>
            {/* Moving scan line over face */}
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 124, top: `${20 + (progress / 100) * 55}%`, height: 2, background: `linear-gradient(90deg, transparent, ${C.accentMid}, transparent)`, transition: "top 0.06s linear", borderRadius: 99 }} />
            {/* Zone highlight dots */}
            {[["40%","35%"],["60%","35%"],["50%","55%"],["38%","65%"],["62%","65%"]].map(([l, t], i) => (
              progress > i * 20 && (
                <div key={i} style={{ position: "absolute", left: l, top: t, width: 8, height: 8, borderRadius: "50%", background: C.accentMid, opacity: 0.7, boxShadow: `0 0 6px ${C.accentMid}` }} />
              )
            ))}
            {/* Bottom progress bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.08)" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: C.accentMid, transition: "width 0.06s" }} />
            </div>
          </div>

          <div style={{ flex: 1, background: C.bg, borderRadius: "20px 20px 0 0", padding: "20px 20px 0" }}>
            <div style={{ width: 36, height: 4, borderRadius: 99, background: C.border, margin: "0 auto 18px" }} />
            <Text size={16} weight={800} style={{ fontFamily: "Syne, sans-serif", marginBottom: 6 }}>Analysing your skin…</Text>
            <Text size={11} color={C.sub} style={{ marginBottom: 20 }}>{progress < 100 ? analysisStages[Math.min(currentStage, analysisStages.length - 1)] : "Finalising results…"}</Text>

            {/* Stage checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {analysisStages.map((s, i) => {
                const done = progress > (i + 1) * (100 / analysisStages.length);
                const active = !done && progress > i * (100 / analysisStages.length);
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: done ? C.accentMid : active ? "rgba(155,233,250,0.15)" : C.card, border: `1.5px solid ${done ? C.accentMid : active ? C.accentMid : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
                      {done && <span style={{ fontSize: 10, color: "#0D2A3A", fontWeight: 800 }}>✓</span>}
                      {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accentMid }} />}
                    </div>
                    <Text size={12} weight={active || done ? 600 : 400} color={done ? C.accent : active ? C.text : C.muted}>{s}</Text>
                    {done && <Text size={10} color={C.accentMid} style={{ marginLeft: "auto" }}>✓</Text>}
                  </div>
                );
              })}
            </div>

            {/* Progress percentage */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <Text size={10} color={C.sub}>Processing…</Text>
                <Text size={10} color={C.accent} weight={700}>{progress}%</Text>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: C.card }}>
                <div style={{ height: "100%", width: `${progress}%`, borderRadius: 99, background: `linear-gradient(90deg, ${C.accentMid}, ${C.accent})`, transition: "width 0.06s" }} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── RESULT PHASE ── */}
      {phase === "result" && (
        <div style={{ flex: 1, background: C.bg, overflowY: "auto" }}>

          {/* Hero score banner */}
          <div style={{ background: "linear-gradient(145deg, #0A2840, #0D3A5A, #0A3040)", padding: "20px 20px 26px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: C.accentMid, opacity: 0.1 }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 90, height: 90, borderRadius: "50%", background: C.mint, opacity: 0.08 }} />

            <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative", zIndex: 1, marginBottom: 18 }}>
              {/* Overall score ring */}
              <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
                  <circle cx="40" cy="40" r="34" fill="none" stroke={C.accentMid} strokeWidth="6"
                    strokeDasharray={`${0.74 * 213.6} ${213.6}`} strokeLinecap="round"
                    strokeDashoffset="53" transform="rotate(-90 40 40)"/>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "Syne, sans-serif", lineHeight: 1 }}>74</span>
                  <span style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>/ 100</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.accentMid, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", marginBottom: 4 }}>OVERALL SKIN SCORE</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "Syne, sans-serif", lineHeight: 1.2, marginBottom: 4 }}>Good — <span style={{ color: C.accentMid }}>Keep it up</span></div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>📷 Photo analysis · March 13</div>
              </div>
            </div>

            {/* 4 quick metric pills */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, position: "relative", zIndex: 1 }}>
              {[
                { label: "Hydration", val: "62%", status: "Low", color: "#FFB43A", bg: "rgba(255,180,58,0.12)", border: "rgba(255,180,58,0.3)" },
                { label: "Clarity",   val: "78%", status: "Good", color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)" },
                { label: "Oiliness",  val: "55%", status: "Moderate", color: C.accentMid, bg: "rgba(155,233,250,0.1)", border: "rgba(155,233,250,0.25)" },
                { label: "Texture",   val: "81%", status: "Smooth", color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)" },
              ].map(m => (
                <div key={m.label} style={{ padding: "9px 12px", borderRadius: 12, background: m.bg, border: `1px solid ${m.border}` }}>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", marginBottom: 3 }}>{m.label}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "Syne, sans-serif", lineHeight: 1 }}>{m.val}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: m.color, fontFamily: "'DM Sans', sans-serif" }}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Body content */}
          <div style={{ padding: "16px 20px 0" }}>

            {/* Detailed metric breakdown */}
            <Text size={13} weight={800} style={{ marginBottom: 12 }}>Detailed Analysis</Text>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 14, overflow: "hidden" }}>
              {[
                {
                  label: "Hydration", val: 62, icon: "💧", status: "Below Optimal",
                  statusColor: "#C07000", statusBg: "#FFF3DC",
                  explain: "Your skin's surface moisture is 14% below the healthy threshold (75%). Likely cause: insufficient water intake and PM2.5 exposure today.",
                  action: "Try Round Lab Birch Toner + heavier night cream tonight",
                  barColor: "#FFB43A",
                },
                {
                  label: "Sebum / Oiliness", val: 55, icon: "✨", status: "Moderate",
                  statusColor: "#1A6A88", statusBg: C.accentLight,
                  explain: "T-zone shows moderate oil activity. Combination skin pattern — slightly oilier on forehead and nose.",
                  action: "Use BHA toner 2x/week to manage pore congestion",
                  barColor: C.accentMid,
                },
                {
                  label: "Clarity & Tone", val: 78, icon: "🌟", status: "Good",
                  statusColor: "#1A7A40", statusBg: "#E8FFFB",
                  explain: "Skin tone is relatively even. Minor pigmentation visible on left cheek — likely UV exposure or post-acne marks.",
                  action: "Vitamin C serum is working — keep daily AM application",
                  barColor: "#4ade80",
                },
                {
                  label: "Texture & Pores", val: 81, icon: "🎯", status: "Smooth",
                  statusColor: "#1A7A40", statusBg: "#E8FFFB",
                  explain: "Surface texture is smooth with minimal visible pores. No active congestion detected. Niacinamide is showing visible effect.",
                  action: "Current routine is working well — maintain consistency",
                  barColor: "#4ade80",
                },
                {
                  label: "UV / Oxidative Stress", val: 42, icon: "☀️", status: "Elevated",
                  statusColor: "#C05000", statusBg: "#FFF3E8",
                  explain: "Oxidative markers elevated — consistent with today's high UV (index 9) and AQI 142. Your antioxidant barrier needs a boost.",
                  action: "Apply extra SPF layer this afternoon + take Vitamin C supplement",
                  barColor: "#FF8A3A",
                },
              ].map((r, i, arr) => (
                <div key={r.label} style={{ padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 17, flexShrink: 0 }}>{r.icon}</span>
                    <Text size={12} weight={700}>{r.label}</Text>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ padding: "2px 8px", borderRadius: 99, background: r.statusBg, fontSize: 9, fontWeight: 700, color: r.statusColor, fontFamily: "'DM Sans', sans-serif" }}>{r.status}</span>
                      <Text size={12} weight={800} color={r.barColor}>{r.val}%</Text>
                    </div>
                  </div>
                  {/* Bar */}
                  <div style={{ height: 6, borderRadius: 99, background: C.card, marginBottom: 8 }}>
                    <div style={{ height: "100%", width: `${r.val}%`, borderRadius: 99, background: r.barColor }} />
                  </div>
                  {/* Explain */}
                  <Text size={10} color={C.sub} style={{ lineHeight: 1.6, marginBottom: 5 }}>{r.explain}</Text>
                  {/* Actionable */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "7px 10px", borderRadius: 9, background: C.card }}>
                    <span style={{ fontSize: 11, flexShrink: 0 }}>→</span>
                    <Text size={10} color={C.accent} weight={600} style={{ lineHeight: 1.5 }}>{r.action}</Text>
                  </div>
                </div>
              ))}
            </div>

            {/* Skin type summary */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 18 }}>🧬</span>
                </div>
                <div>
                  <Text size={12} weight={800}>Detected: Combination Skin</Text>
                  <Text size={10} color={C.sub}>Oily T-zone · Normal to dry cheeks</Text>
                </div>
              </div>
              <Text size={10} color={C.sub} style={{ lineHeight: 1.6 }}>
                Confirmed by hydration variance (±18%) between T-zone and cheek zones. Your current routine is well-matched — avoid heavy occlusives on forehead.
              </Text>
            </div>

            {/* AI Routine recommendation */}
            <div style={{ background: `linear-gradient(120deg, #E2F4FC, #E8FFFB)`, border: `1px solid ${C.accentMid}`, borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
              <Text size={11} weight={800} color={C.accent} style={{ marginBottom: 8 }}>✦ AI Routine Recommendation</Text>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  "🌅 AM: Add a lightweight hydrating toner before Vitamin C — your hydration is low",
                  "🌙 PM: Use a ceramide-rich moisturiser tonight to address barrier weakness",
                  "⚡ This week: Reduce BHA frequency from daily to 2x — slight over-exfoliation detected",
                ].map(tip => (
                  <div key={tip} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <Text size={10} color={C.text} style={{ lineHeight: 1.6 }}>{tip}</Text>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div onClick={() => setPhase("capture")} style={{ flex: 1, padding: "13px", borderRadius: 14, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                ← Retake
              </div>
              <div onClick={() => onNav("tracker")} style={{ flex: 2, padding: "13px", borderRadius: 14, background: `linear-gradient(120deg, ${C.accentMid}, ${C.accent})`, textAlign: "center", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#0D2A3A", boxShadow: `0 4px 16px ${C.accentMid}44` }}>
                📊 Save to Progress
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1, padding: "11px", borderRadius: 14, background: C.surface, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: C.sub }}>
                🔗 Share Report
              </div>
              <div onClick={() => onNav("derm")} style={{ flex: 1, padding: "11px", borderRadius: 14, background: "#FFFDE8", border: `1px solid #E0D840`, textAlign: "center", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", color: "#5A5000" }}>
                ✚ Ask a Derm
              </div>
            </div>

            {/* Physical indicator teaser at bottom of results too */}
            <div style={{ background: "linear-gradient(120deg, #1A1A2E, #16213E)", border: "1px solid rgba(155,233,250,0.15)", borderRadius: 14, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🔬</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Text size={11} weight={700} color="#9BE9FA">More accurate with Physical Indicator</Text>
                    <div style={{ padding: "1px 6px", borderRadius: 99, background: "rgba(255,249,175,0.15)", border: "1px solid rgba(255,249,175,0.25)", fontSize: 7, fontWeight: 700, color: "#fff9af", fontFamily: "'DM Sans', sans-serif" }}>SOON</div>
                  </div>
                  <Text size={9} color="rgba(155,233,250,0.5)" style={{ marginTop: 2 }}>Real-time hydration + sebum sensor — 3× precision</Text>
                </div>
              </div>
            </div>

            <div style={{ height: 80 }} />
          </div>
        </div>
      )}

      <NavBar active="analysis" onNav={onNav} />
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
      <NavBar active="analysis" onNav={onNav} />
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
      <NavBar active="community" onNav={onNav} />
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
      <NavBar active="loyalty" onNav={onNav} />
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
