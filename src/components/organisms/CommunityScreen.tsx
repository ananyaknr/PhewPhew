"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";
import { Box } from "@/components/atoms/Layout";
import { Text } from "@/components/atoms/Text";
import { PremiumBadge } from "../atoms/PremiumBadge";

export const CommunityScreen: React.FC = () => {
  const router = useRouter();
  const posts = [
    {
      user: "Skincare_Junkie",
      score: 82,
      review:
        "Cosrx Snail Essence is 🔥 for combination skin — cleared my texture in 2 weeks! My pores look smaller now.",
      upvotes: 142,
      beforeScore: 64,
      afterScore: 82,
      skinType: "Combination",
      product: {
        name: "COSRX Advanced Snail 96 Mucin",
        price: "฿490",
        match: true,
        matchReason: "Suits combination skin — lightweight, non-comedogenic.",
      },
      week1: { hydration: 60, clarity: 62, texture: 64 },
      week4: { hydration: 78, clarity: 80, texture: 82 },
    },
    {
      user: "DermNerd",
      score: 91,
      review:
        "Reminder: never mix retinol + vitamin C in same AM routine. Use Vit C in AM and retinol only PM.",
      upvotes: 289,
      beforeScore: 75,
      afterScore: 91,
      skinType: "Normal/Dry",
      product: {
        name: "The Ordinary Retinol 0.5%",
        price: "฿350",
        match: true,
        matchReason: "Start slow with 0.5% — ideal for beginners.",
      },
      week1: { hydration: 72, clarity: 74, texture: 70 },
      week4: { hydration: 88, clarity: 90, texture: 86 },
    },
  ];

  return (
    <Box
      style={{
        height: "100dvh",
        maxWidth: "600px",
        margin: "0 auto",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          padding: "12px 20px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text size={18} weight={800} style={{ fontFamily: "Syne, sans-serif" }}>
          Community
        </Text>
        <div style={{ marginLeft: "auto" }}>
          <PremiumBadge />
        </div>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        <Box
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {["#OilyGlassSkin", "#NiacinamideLove", "#SPFDaily", "#Trending"].map(
            (t) => (
              <div
                key={t}
                style={{
                  padding: "6px 14px",
                  borderRadius: 99,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  fontSize: 11,
                  color: C.text,
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </div>
            ),
          )}
        </Box>

        {posts.map((p, i) => (
          <Box
            key={i}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "16px",
              marginBottom: 14,
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  background: `linear-gradient(135deg, ${C.accentMid}, ${C.mint})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>✨</span>
              </div>
              <div style={{ flex: 1 }}>
                <Text size={13} weight={700}>
                  {p.user}
                </Text>
                <Text size={10} color={C.sub}>
                  Skin Score {p.score}/100 · {p.skinType}
                </Text>
              </div>
            </Box>

            <div
              style={{
                background: C.bg,
                borderRadius: 12,
                padding: "10px 12px",
                marginBottom: 10,
                border: `1px solid ${C.border}`,
              }}
            >
              <Text
                size={10}
                weight={700}
                color={C.sub}
                style={{ marginBottom: 8 }}
              >
                Skin Analysis · Before → After
              </Text>
              {[
                ["Hydration", p.week1.hydration, p.week4.hydration],
                ["Clarity", p.week1.clarity, p.week4.clarity],
              ].map(([label, before, after]) => (
                <div key={label as string} style={{ marginBottom: 6 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 3,
                    }}
                  >
                    <Text size={9} color={C.sub}>
                      {label}
                    </Text>
                    <Text size={9} color={C.accent} weight={600}>
                      {before} → {after}
                    </Text>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: 4,
                      borderRadius: 99,
                      background: C.card,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        height: "100%",
                        width: `${after}%`,
                        borderRadius: 99,
                        background: C.accent,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Text
              size={13}
              color={C.text}
              style={{ marginBottom: 10, lineHeight: 1.5 }}
            >
              {p.review}
            </Text>

            <div
              onClick={() => router.push("/shop")}
              style={{
                background: p.product.match ? "#E8FFFB" : "#FFF3E8",
                border: `1px solid ${p.product.match ? "#7ADFC8" : "#F0C080"}`,
                borderRadius: 12,
                padding: "10px 12px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  size={11}
                  weight={700}
                  color={p.product.match ? C.mintDark : "#C05000"}
                >
                  {p.product.name}
                </Text>
                <Text size={11} weight={700}>
                  {p.product.price}
                </Text>
              </div>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
