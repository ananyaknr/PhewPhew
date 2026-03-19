"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PHEWPHEW_COLORS as C } from "@component/PhewphewConstants";
import { Box } from "@component/atoms/Layout";
import { Text } from "@component/atoms/Text";
import { PremiumBadge } from "@component/atoms/PremiumBadge";

export const DermScreen: React.FC = () => {
  const router = useRouter();
  const derms = [
    {
      name: "Dr. Siriporn K.",
      spec: "Acne · Pigmentation",
      avail: "Today 2PM",
      emoji: "👩‍⚕️",
    },
    {
      name: "Dr. Nattapol W.",
      spec: "Anti-aging · Dehydration",
      avail: "Tomorrow 10AM",
      emoji: "👨‍⚕️",
    },
  ];

  return (
    <Box
      style={{
        height: "100vh",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          padding: "4px 20px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer", fontSize: 20, color: C.sub }}
        >
          ‹
        </div>
        <Text size={18} weight={700} style={{ fontFamily: "Syne, sans-serif" }}>
          Derm Consult
        </Text>
        <div style={{ marginLeft: "auto" }}>
          <PremiumBadge premium />
        </div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        <Box
          style={{
            background: "#E8FFFB",
            border: `1px solid #7ADFC8`,
            borderRadius: 16,
            padding: "16px",
            marginBottom: 16,
          }}
        >
          <Text size={13} color="#2A7A60">
            Your Skin Score (74/100) and scan history will be shared with the
            doctor automatically.
          </Text>
        </Box>

        {derms.map((d) => (
          <Box
            key={d.name}
            style={{
              background: "#fff",
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "16px",
              marginBottom: 14,
            }}
          >
            <Box style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: C.accentLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                {d.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <Text size={14} weight={700}>
                  {d.name}
                </Text>
                <Text size={11} color={C.sub}>
                  {d.spec}
                </Text>
                <Text
                  size={11}
                  color={C.accent}
                  weight={600}
                  style={{ marginTop: 2 }}
                >
                  {d.avail}
                </Text>
              </div>
            </Box>
            <div
              onClick={() => {}}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 10,
                background: C.accentMid,
                textAlign: "center",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Book Now →
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
