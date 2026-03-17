import React, { useState } from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box, Text, StatusBar, NavBar, PremiumTag } from "../ui/PhewphewAtoms";

interface LoyaltyScreenProps {
  onNav: (screen: string) => void;
}

export const LoyaltyScreen: React.FC<LoyaltyScreenProps> = ({ onNav }) => {
  const rewards = [
    { label: "฿50 Shop Voucher", pts: 500, icon: "🛍️", desc: "Valid on any product in the PhewPhew shop" },
    { label: "1 Free Derm Session", pts: 1000, icon: "👩‍⚕️", desc: "Book a 10–20 min consult with any available doctor" },
    { label: "Premium Month Free", pts: 2000, icon: "⭐", desc: "Extends your Premium subscription by 30 days" },
  ];

  const currentPts = 1240;

  return (
    <Box style={{ height: "100dvh", maxWidth: "600px", margin: "0 auto", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "12px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>My Rewards</Text>
        <div style={{ marginLeft: "auto" }}><PremiumTag /></div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
        {/* Points Hero */}
        <Box style={{ background: "linear-gradient(135deg, #0D2A3A, #1A6A88)", borderRadius: 20, padding: "24px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <Text color="rgba(255,255,255,0.7)" size={12} weight={600} style={{ letterSpacing: "0.05em" }}>AVAILABLE BALANCE</Text>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
            <Text color="#fff" size={36} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>{currentPts}</Text>
            <Text color={C.accentMid} size={14} weight={700}>POINTS</Text>
          </div>
          <div style={{ marginTop: 20, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 99 }}>
            <div style={{ width: "82%", height: "100%", background: C.accentMid, borderRadius: 99 }} />
          </div>
          <Text color="rgba(255,255,255,0.6)" size={10} style={{ marginTop: 8 }}>260 pts until Platinum Tier</Text>
        </Box>

        <Text size={14} weight={800} style={{ marginBottom: 12 }}>Redeem Rewards</Text>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rewards.map(r => (
            <Box key={r.label} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                {r.icon}
              </div>
              <div style={{ flex: 1 }}>
                <Text size={13} weight={700}>{r.label}</Text>
                <Text size={11} color={C.sub}>{r.pts} pts</Text>
              </div>
              <div style={{ padding: "8px 12px", borderRadius: 10, background: currentPts >= r.pts ? C.accentMid : C.card, fontSize: 11, fontWeight: 700, color: "#0D2A3A", cursor: currentPts >= r.pts ? "pointer" : "default" }}>
                Redeem
              </div>
            </Box>
          ))}
        </div>
      </Box>
      <NavBar active="loyalty" onNav={onNav} />
    </Box>
  );
};
