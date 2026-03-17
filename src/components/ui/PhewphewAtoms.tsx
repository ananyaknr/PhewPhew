import React from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";

export const Box: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode; onClick?: () => void; className?: string }> = ({ style, children, onClick, className }) => (
  <div onClick={onClick} className={className} style={{ boxSizing: "border-box", ...style }}>{children}</div>
);

export const Rect: React.FC<{ w: number | string; h: number | string; r?: number; color?: string; style?: React.CSSProperties }> = ({ w, h, r = 8, color = C.card, style }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: color, flexShrink: 0, ...style }} />
);

export const Line: React.FC<{ w?: number | string; h?: number; r?: number; color?: string; style?: React.CSSProperties }> = ({ w = "100%", h = 10, r = 5, color = C.border, style }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: color, ...style }} />
);

export const Text: React.FC<{ size?: number; weight?: number | string; color?: string; children?: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({ size = 13, weight = 400, color = C.text, children, style, className }) => (
  <div className={className} style={{ fontSize: size, fontWeight: weight, color, lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif", ...style }}>{children}</div>
);

export const Badge: React.FC<{ label?: string; premium?: boolean }> = ({ label, premium }) => {
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

export const PremiumTag: React.FC = () => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 3,
    padding: "2px 8px", borderRadius: 99,
    background: C.premiumMid, border: `1px solid #D4C840`,
    fontSize: 9, fontWeight: 700, color: "#5A5000",
    letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif",
  }}>★ PREMIUM</div>
);

export const SectionHead: React.FC<{ label: string; action?: string; onAction?: () => void }> = ({ label, action, onAction }) => (
  <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <Text size={13} weight={800} style={{ letterSpacing: "-0.01em" }}>{label}</Text>
    {action && <div onClick={onAction} style={{ fontSize: 11, color: C.accent, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{action}</div>}
  </Box>
);

export const ChipSelector: React.FC<{ options: string[]; selected: string | string[]; onToggle: (o: string) => void; single?: boolean }> = ({ options, selected, onToggle }) => {
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
};

export const NavBar: React.FC<{ active: string; onNav: (id: string) => void }> = ({ active, onNav }) => {
  const items = [
    {
      id: "home", label: "Home",
      icon: (on: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 11L12 3l9 8v9a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-9z"
            fill={on ? C.accentLight : "none"}
            stroke={on ? C.accent : C.muted} strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "analysis", label: "Analyse",
      icon: (on: boolean) => (
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
      icon: (on: boolean) => (
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
      icon: (on: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill={on ? C.accentLight : "none"} stroke={on ? C.accent : C.muted} strokeWidth="1.8"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={on ? C.accent : C.muted} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", 
      width: "100%", maxWidth: 600, height: 70,
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      display: "flex", alignItems: "center",
      boxShadow: "0 -2px 16px rgba(13,42,58,0.06)",
      zIndex: 1000,
    }}>
      {items.map((it, idx) => {
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

export const StatusBar: React.FC = () => null;
