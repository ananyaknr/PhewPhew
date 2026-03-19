"use client";

import React, { useState } from "react";
import { PHEWPHEW_COLORS as C } from "@component/PhewphewConstants";
import { Box } from "@component/atoms/Layout";
import { Text } from "@component/atoms/Text";
import { ChipSelector } from "@component/molecules/ChipSelector";
import {
  IllustrationWelcome,
  IllustrationGender,
  IllustrationSkinType,
  IllustrationGoals,
  IllustrationLifestyle,
  IllustrationAllergy,
} from "@component/atoms/Illustrations";
import { useRouter } from "next/navigation";

export const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [workEnv, setWorkEnv] = useState<string | null>(null);
  const [surrounding, setSurrounding] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);

  const TOTAL_STEPS = 7;

  const toggleGoal = (g: string) =>
    setGoals((gs) => (gs.includes(g) ? gs.filter((x) => x !== g) : [...gs, g]));
  const toggleAllergy = (a: string) =>
    setAllergies((as) =>
      as.includes(a) ? as.filter((x) => x !== a) : [...as, a],
    );

  const illustrations = [
    <IllustrationWelcome key="0" />,
    <IllustrationGender key="1" />,
    <IllustrationSkinType key="2" />,
    <IllustrationGoals key="3" />,
    <IllustrationLifestyle key="4" />,
    <IllustrationLifestyle key="5" />,
    <IllustrationAllergy key="6" />,
  ];

  const canProceed = () => {
    if (step === 1) return gender !== null;
    if (step === 2) return skinType !== null;
    if (step === 3) return goals.length > 0;
    if (step === 4) return workEnv !== null;
    if (step === 5) return surrounding !== null;
    return true;
  };

  return (
    <Box
      style={{
        height: "100dvh",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        background:
          "linear-gradient(160deg, #D4F0FB 0%, #EEF8FD 60%, #E2F4FC 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          padding: "0 20px",
          marginTop: 4,
          marginBottom: 12,
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <Text
            size={10}
            color={C.sub}
            weight={600}
            style={{ letterSpacing: "0.08em" }}
          >
            STEP {step + 1} OF {TOTAL_STEPS}
          </Text>
          <Text size={10} color={C.muted}>
            {Math.round(((step + 1) / TOTAL_STEPS) * 100)}%
          </Text>
        </div>
        <div style={{ height: 4, borderRadius: 99, background: C.border }}>
          <div
            style={{
              height: "100%",
              width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
              borderRadius: 99,
              background: C.accentMid,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Illustration */}
      <div
        style={{
          width: "100%",
          height: "18vh",
          minHeight: 100,
          maxHeight: 180,
          padding: "0 20px",
          marginBottom: 12,
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
            overflow: "hidden",
            background: "linear-gradient(135deg, #D4F0FB, #E8FFFB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {illustrations[step]}
        </div>
      </div>

      {/* Content */}
      <Box
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 20px 16px",
          minHeight: 0,
          boxSizing: "border-box",
        }}
      >
        {/* ── Step 0: Welcome ── */}
        {step === 0 && (
          <>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 99,
                background: C.accentMid,
                marginBottom: 14,
              }}
            >
              <Text
                size={10}
                weight={700}
                color="#0D2A3A"
                style={{ letterSpacing: "0.08em" }}
              >
                ✦ POWERED BY AI + SENSOR
              </Text>
            </div>
            <Text
              size={28}
              weight={800}
              style={{
                lineHeight: 1.15,
                fontFamily: "Syne, sans-serif",
                marginBottom: 10,
              }}
            >
              Meet <span style={{ color: C.accent }}>PhewPhew</span> —<br />
              your skin&apos;s
              <br />
              best friend.
            </Text>
            <Text
              size={14}
              color={C.sub}
              style={{ lineHeight: 1.5, marginBottom: 20 }}
            >
              Personalised skincare powered by AI + sensor technology.
              We&apos;ll learn your skin, build your routine, and help it glow.
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gap: 8,
              }}
            >
              {[
                ["◎", "Scan Ingredients"],
                ["◈", "AI Analysis"],
                ["◆", "Earn Rewards"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  style={{
                    padding: "10px 4px",
                    borderRadius: 12,
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    textAlign: "center",
                  }}
                >
                  <Text size={18}>{icon}</Text>
                  <Text
                    size={9}
                    color={C.sub}
                    style={{ marginTop: 4, lineHeight: 1.3 }}
                  >
                    {label}
                  </Text>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 1: Gender ── */}
        {step === 1 && (
          <>
            <Text
              size={22}
              weight={800}
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              What&apos;s your
              <br />
              biological sex?
            </Text>
            <Text
              size={13}
              color={C.sub}
              style={{ lineHeight: 1.5, marginBottom: 16 }}
            >
              Hormones affect skin behaviour — oil production, sensitivity, and
              aging patterns differ.
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                gap: 10,
              }}
            >
              {[
                {
                  val: "Female",
                  desc: "Higher estrogen — tends toward dryness",
                  icon: "♀",
                },
                {
                  val: "Male",
                  desc: "Higher androgens — oilier, thicker skin",
                  icon: "♂",
                },
                {
                  val: "Non-binary",
                  desc: "We'll use general skin data",
                  icon: "◈",
                },
              ].map((opt) => (
                <div
                  key={opt.val}
                  onClick={() => setGender(opt.val)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    cursor: "pointer",
                    border: `2px solid ${gender === opt.val ? C.accent : C.border}`,
                    background: gender === opt.val ? C.accentLight : C.surface,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxSizing: "border-box",
                  }}
                >
                  <Text size={20}>{opt.icon}</Text>
                  <div style={{ flex: 1 }}>
                    <Text
                      size={13}
                      weight={700}
                      color={gender === opt.val ? "#0D4A6A" : C.text}
                    >
                      {opt.val}
                    </Text>
                    <Text size={11} color={C.sub} style={{ marginTop: 2 }}>
                      {opt.desc}
                    </Text>
                  </div>
                  {gender === opt.val && (
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: C.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Text size={9} color="white">
                        ✓
                      </Text>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 2: Skin type ── */}
        {step === 2 && (
          <>
            <Text
              size={22}
              weight={800}
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: 1.2,
                marginBottom: 6,
              }}
            >
              What do you think
              <br />
              your skin type is?
            </Text>
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                background: C.accentMid + "44",
                border: `1px solid ${C.accentMid}`,
                marginBottom: 14,
                boxSizing: "border-box",
              }}
            >
              <Text size={11} color="#1A5A78" weight={600}>
                💡 Just your best guess is perfect.
              </Text>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                gap: 10,
              }}
            >
              {[
                {
                  val: "Oily",
                  desc: "Shiny by midday, enlarged pores",
                  emoji: "💧",
                },
                { val: "Dry", desc: "Feels tight, flaky patches", emoji: "🌵" },
                {
                  val: "Combination",
                  desc: "Oily T-zone, normal cheeks",
                  emoji: "⚖️",
                },
                {
                  val: "Sensitive",
                  desc: "Reacts easily, redness",
                  emoji: "🌸",
                },
                {
                  val: "Normal",
                  desc: "Balanced, rarely breaks out",
                  emoji: "✨",
                },
              ].map((opt) => (
                <div
                  key={opt.val}
                  onClick={() => setSkinType(opt.val)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    cursor: "pointer",
                    border: `2px solid ${skinType === opt.val ? C.accent : C.border}`,
                    background:
                      skinType === opt.val ? C.accentLight : C.surface,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxSizing: "border-box",
                  }}
                >
                  <Text size={20}>{opt.emoji}</Text>
                  <div style={{ flex: 1 }}>
                    <Text
                      size={13}
                      weight={700}
                      color={skinType === opt.val ? "#0D4A6A" : C.text}
                    >
                      {opt.val}
                    </Text>
                    <Text size={11} color={C.sub}>
                      {opt.desc}
                    </Text>
                  </div>
                  {skinType === opt.val && (
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: C.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Text size={9} color="white">
                        ✓
                      </Text>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 3: Goals ── */}
        {step === 3 && (
          <>
            <Text
              size={22}
              weight={800}
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              What are your
              <br />
              skin goals?
            </Text>
            <Text
              size={13}
              color={C.sub}
              style={{ marginBottom: 16, lineHeight: 1.5 }}
            >
              Pick everything that matters to you.
            </Text>
            <ChipSelector
              options={[
                "Reduce acne",
                "Anti-aging",
                "Even tone",
                "Hydration",
                "Brightening",
                "Pores",
                "Barrier repair",
                "Reduce redness",
                "Firming",
              ]}
              selected={goals}
              onToggle={toggleGoal}
            />
          </>
        )}

        {/* ── Step 4: Work environment ── */}
        {step === 4 && (
          <>
            <Text
              size={22}
              weight={800}
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              Where do you
              <br />
              spend your days?
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                gap: 10,
              }}
            >
              {[
                {
                  val: "Office / Indoors",
                  desc: "AC environments cause dehydration",
                  icon: "🏢",
                },
                { val: "Mixed", desc: "Variable conditions", icon: "🔄" },
                { val: "Outdoor", desc: "High UV, heat, sweat", icon: "🌤" },
                {
                  val: "Work from Home",
                  desc: "Controlled climate but sedentary",
                  icon: "🏠",
                },
              ].map((opt) => (
                <div
                  key={opt.val}
                  onClick={() => setWorkEnv(opt.val)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    cursor: "pointer",
                    border: `2px solid ${workEnv === opt.val ? C.accent : C.border}`,
                    background: workEnv === opt.val ? C.accentLight : C.surface,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxSizing: "border-box",
                  }}
                >
                  <Text size={20}>{opt.icon}</Text>
                  <div style={{ flex: 1 }}>
                    <Text
                      size={13}
                      weight={700}
                      color={workEnv === opt.val ? "#0D4A6A" : C.text}
                    >
                      {opt.val}
                    </Text>
                    <Text size={11} color={C.sub}>
                      {opt.desc}
                    </Text>
                  </div>
                  {workEnv === opt.val && (
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: C.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Text size={9} color="white">
                        ✓
                      </Text>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 5: Surrounding / environment ── */}
        {step === 5 && (
          <>
            <Text
              size={22}
              weight={800}
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              What&apos;s your
              <br />
              living environment?
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                gap: 10,
              }}
            >
              {[
                {
                  val: "High Pollution",
                  desc: "PM2.5, smog — needs antioxidants",
                  icon: "🏙",
                  tag: "Risk",
                },
                {
                  val: "Low Pollution",
                  desc: "Urban but cleaner air",
                  icon: "🌆",
                  tag: null,
                },
                {
                  val: "Suburban",
                  desc: "Moderate exposure",
                  icon: "🏘",
                  tag: null,
                },
                {
                  val: "Rural / Nature",
                  desc: "Fresh air, high UV",
                  icon: "🌿",
                  tag: null,
                },
                {
                  val: "Coastal",
                  desc: "Salt air + high humidity",
                  icon: "🌊",
                  tag: null,
                },
              ].map((opt) => (
                <div
                  key={opt.val}
                  onClick={() => setSurrounding(opt.val)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    cursor: "pointer",
                    border: `2px solid ${surrounding === opt.val ? C.accent : C.border}`,
                    background:
                      surrounding === opt.val ? C.accentLight : C.surface,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxSizing: "border-box",
                  }}
                >
                  <Text size={20}>{opt.icon}</Text>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        size={13}
                        weight={700}
                        color={surrounding === opt.val ? "#0D4A6A" : C.text}
                      >
                        {opt.val}
                      </Text>
                      {opt.tag && (
                        <div
                          style={{
                            padding: "2px 6px",
                            borderRadius: 99,
                            background: "#FDE8E8",
                            border: "1px solid #F5AAAA",
                            fontSize: 8,
                            fontWeight: 700,
                            color: C.danger,
                          }}
                        >
                          {opt.tag}
                        </div>
                      )}
                    </div>
                    <Text size={11} color={C.sub}>
                      {opt.desc}
                    </Text>
                  </div>
                  {surrounding === opt.val && (
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: C.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Text size={9} color="white">
                        ✓
                      </Text>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Step 6: Allergies ── */}
        {step === 6 && (
          <>
            <Text
              size={22}
              weight={800}
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              Any allergies
              <br />
              or sensitivities?
            </Text>
            <Text
              size={11}
              weight={700}
              color={C.sub}
              style={{ letterSpacing: "0.08em", marginBottom: 10 }}
            >
              KNOWN ALLERGENS
            </Text>
            <ChipSelector
              options={[
                "Fragrance",
                "Paraben",
                "Alcohol",
                "Sulfate",
                "Retinol",
                "AHA / BHA",
                "Essential Oils",
                "Lanolin",
              ]}
              selected={allergies}
              onToggle={toggleAllergy}
            />

            <Text
              size={11}
              weight={700}
              color={C.sub}
              style={{
                letterSpacing: "0.08em",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              PAST REACTIONS
            </Text>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                background: C.surface,
                border: `1.5px solid ${C.border}`,
                minHeight: 60,
                boxSizing: "border-box",
              }}
            >
              <Text size={12} color={C.muted} style={{ lineHeight: 1.5 }}>
                e.g. &quot;Redness from fragrance toners&quot;
              </Text>
            </div>
            <Text
              size={12}
              color={C.sub}
              style={{ marginTop: 16, textAlign: "center", display: "block" }}
            >
              No known allergies? Tap Continue.
            </Text>
          </>
        )}
      </Box>

      {/* Bottom CTA */}
      <div
        style={{
          padding: "12px 20px 24px",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        <div
          onClick={() => {
            if (!canProceed() && step !== 0 && step !== 6) return;
            if (step === TOTAL_STEPS - 1) router.push("/home");
            else setStep((s) => s + 1);
          }}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 14,
            background:
              canProceed() || step === 0 || step === 6 ? C.accentMid : C.border,
            color:
              canProceed() || step === 0 || step === 6 ? "#0D2A3A" : C.muted,
            textAlign: "center",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            boxSizing: "border-box",
          }}
        >
          {step === 0
            ? "Let's begin →"
            : step === TOTAL_STEPS - 1
              ? "Start My Journey ✦"
              : "Continue →"}
        </div>
        {step > 0 && (
          <div
            onClick={() => setStep((s) => s - 1)}
            style={{
              textAlign: "center",
              marginTop: 12,
              fontSize: 13,
              color: C.sub,
              cursor: "pointer",
              padding: "8px",
            }}
          >
            ← Back
          </div>
        )}
      </div>
    </Box>
  );
};
