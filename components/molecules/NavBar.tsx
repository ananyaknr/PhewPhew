import React from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { NavBarItem } from "./NavBarItem";
import { NavBarFab } from "./NavBarFab";

export const NavBar: React.FC = () => {
  const items = [
    {
      id: "home",
      label: "Home",
      href: "/home",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 11L12 3l9 8v9a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-9z"
            fill="none"
            stroke={C.muted} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ),
      activeIcon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 11L12 3l9 8v9a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-9z"
            fill={C.accentLight}
            stroke={C.accent} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: "analysis",
      label: "Analyse",
      href: "/analysis",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="10" r="6" stroke={C.muted} strokeWidth="1.8" />
          <path d="M8 10c0-2.2 1.8-4 4-4" stroke={C.muted} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M5 19l2.5-2.5M19 19l-2.5-2.5" stroke={C.muted} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="10" r="2" fill={C.muted} opacity={0.4} />
        </svg>
      ),
      activeIcon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="10" r="6" stroke={C.accent} strokeWidth="1.8" />
          <path d="M8 10c0-2.2 1.8-4 4-4" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M5 19l2.5-2.5M19 19l-2.5-2.5" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="10" r="2" fill={C.accent} opacity={1} />
        </svg>
      )
    },
    null, // center FAB placeholder
    {
      id: "community",
      label: "Community",
      href: "/community",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="3" fill="none" stroke={C.muted} strokeWidth="1.8" />
          <path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="18" cy="9" r="2.5" stroke={C.muted} strokeWidth="1.6" />
          <path d="M16 19c0-2 0.9-3.8 2.5-4.5" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      activeIcon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="3" fill={C.accentLight} stroke={C.accent} strokeWidth="1.8" />
          <path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="18" cy="9" r="2.5" stroke={C.accent} strokeWidth="1.6" />
          <path d="M16 19c0-2 0.9-3.8 2.5-4.5" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "loyalty",
      label: "Me",
      href: "/loyalty",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="none" stroke={C.muted} strokeWidth="1.8" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
      activeIcon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill={C.accentLight} stroke={C.accent} strokeWidth="1.8" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
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
          return <NavBarFab key="scan-fab" />;
        }
        return (
          <NavBarItem
            key={it.id}
            id={it.id}
            label={it.label}
            href={it.href}
            icon={it.icon}
            activeIcon={it.activeIcon}
          />
        );
      })}
    </div>
  );
};
