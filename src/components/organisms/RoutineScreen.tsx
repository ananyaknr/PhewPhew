"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box } from "@/components/atoms/Layout";
import { Text } from "@/components/atoms/Text";

export const RoutineScreen: React.FC = () => {
  const router = useRouter();
  const routines = {
    "AM Routine": [
      { name: "Gentle Cleanser", brand: "CeraVe Hydrating", exp: "Apr '26", emoji: "🧴" },
      { name: "Hydrating Toner", brand: "COSRX", exp: "Jan '27", emoji: "💧" },
    ],
    "PM Routine": [
      { name: "Oil Cleanser", brand: "Banila Co", exp: "Jun '26", emoji: "🫧" },
      { name: "BHA Toner", brand: "Paula's Choice 2%", exp: "Aug '26", emoji: "⚗️" },
    ],
  };

  return (
    <Box style={{ height: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => router.push("/home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>My Routine</Text>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
        {Object.entries(routines).map(([name, steps]) => (
          <Box key={name} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
            <Text size={14} weight={700} style={{ marginBottom: 12 }}>{name}</Text>
            {steps.map(s => (
              <Box key={s.name} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.emoji}</div>
                <div style={{ flex: 1 }}>
                  <Text size={12} weight={700}>{s.name}</Text>
                  <Text size={10} color={C.muted}>{s.brand}</Text>
                </div>
                <Text size={10} color={C.sub}>Exp: {s.exp}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
