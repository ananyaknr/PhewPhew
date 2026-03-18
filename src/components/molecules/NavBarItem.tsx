"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHEWPHEW_COLORS as C } from "@/components/PhewphewConstants";

interface NavBarItemProps {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

export const NavBarItem: React.FC<NavBarItemProps> = ({ id, label, href, icon, activeIcon }) => {
  const pathname = usePathname();
  const currentId = pathname.split("/")[1] || "home";
  const isActive = currentId === id;

  return (
    <Link href={href} style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      cursor: "pointer", paddingBottom: 4, textDecoration: "none"
    }}>
      <div style={{
        width: 40, height: 32, borderRadius: 12,
        background: isActive ? C.accentLight : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.15s",
      }}>
        {isActive ? activeIcon : icon}
      </div>
      <div style={{
        fontSize: 9, fontWeight: isActive ? 700 : 400,
        color: isActive ? C.accent : C.muted,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.01em",
      }}>{label}</div>
    </Link>
  );
};
