import React, { useState } from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box, Text, StatusBar, NavBar } from "../ui/PhewphewAtoms";

interface ShopScreenProps {
  onNav: (screen: string) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ onNav }) => {
  const products = [
    { emoji: "🧴", name: "COSRX Snail Mucin", price: "฿490", match: "98% Match" },
    { emoji: "💧", name: "Round Lab Birch Toner", price: "฿480", match: "96% Match" },
    { emoji: "☀️", name: "Beauty of Joseon SPF", price: "฿420", match: "99% Match" },
  ];

  return (
    <Box style={{ height: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>PhewPhew Shop</Text>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
        <Text size={14} weight={700} style={{ marginBottom: 15 }}>AI Recommended for You</Text>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {products.map(p => (
            <Box key={p.name} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{p.emoji}</div>
              <Text size={12} weight={700} style={{ marginBottom: 4 }}>{p.name}</Text>
              <Text size={11} color={C.accent} weight={600}>{p.price}</Text>
              <div style={{ marginTop: 8, padding: "4px", borderRadius: 8, background: "#E8FFFB", fontSize: 9, fontWeight: 700, color: C.mintDark }}>{p.match}</div>
            </Box>
          ))}
        </div>
      </Box>
      <NavBar active="home" onNav={onNav} />
    </Box>
  );
};
