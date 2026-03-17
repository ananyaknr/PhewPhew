import React, { useState } from "react";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box, Text, StatusBar, NavBar, Badge } from "../ui/PhewphewAtoms";

interface DermScreenProps {
  onNav: (screen: string) => void;
}

export const DermScreen: React.FC<DermScreenProps> = ({ onNav }) => {
  const derms = [
    { name: "Dr. Siriporn K.", spec: "Acne · Pigmentation", avail: "Today 2PM", emoji: "👩‍⚕️" },
    { name: "Dr. Nattapol W.", spec: "Anti-aging · Dehydration", avail: "Tomorrow 10AM", emoji: "👨‍⚕️" },
  ];

  return (
    <Box style={{ height: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <Box style={{ padding: "4px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", fontSize: 20, color: C.sub }}>‹</div>
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>Derm Consult</Text>
        <div style={{ marginLeft: "auto" }}><Badge premium /></div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 80px" }}>
        <Box style={{ background: "#E8FFFB", border: `1px solid #7ADFC8`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <Text size={13} color="#2A7A60">Your Skin Score (74/100) and scan history will be shared with the doctor automatically.</Text>
        </Box>

        {derms.map(d => (
          <Box key={d.name} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 14 }}>
            <Box style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 52, height: 52, borderRadius: 26, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{d.emoji}</div>
              <div style={{ flex: 1 }}>
                <Text size={14} weight={700}>{d.name}</Text>
                <Text size={11} color={C.sub}>{d.spec}</Text>
                <Text size={11} color={C.accent} weight={600} style={{ marginTop: 2 }}>{d.avail}</Text>
              </div>
            </Box>
            <div onClick={() => {}} style={{ width: "100%", padding: "10px", borderRadius: 10, background: C.accentMid, textAlign: "center", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Book Now →</div>
          </Box>
        ))}
      </Box>
      <NavBar active="community" onNav={onNav} />
    </Box>
  );
};
