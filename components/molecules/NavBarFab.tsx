"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHEWPHEW_COLORS as C } from "@component/PhewphewConstants";

export const NavBarFab: React.FC = () => {
  const pathname = usePathname();
  const currentId = pathname.split("/")[1] || "home";
  const isActive = currentId === "scan";

  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Link href="/scan">
        <div
          style={{
            width: 52, height: 52,
            borderRadius: "50%",
            background: isActive
              ? `linear-gradient(135deg, ${C.accent}, #1A88B8)`
              : `linear-gradient(135deg, ${C.accentMid}, ${C.accent})`,
            boxShadow: isActive
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
      </Link>
    </div>
  );
};
