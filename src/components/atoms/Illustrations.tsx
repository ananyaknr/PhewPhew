import React from "react";

export const IllustrationWelcome = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    {/* Background blobs */}
    <ellipse cx="160" cy="110" rx="130" ry="60" fill="#D4F0FB" />
    <ellipse cx="80" cy="90" rx="50" ry="50" fill="#E2F4FC" />
    <ellipse cx="240" cy="85" rx="45" ry="45" fill="#b5ffef" opacity="0.5" />
    {/* Face outline */}
    <ellipse cx="160" cy="85" rx="52" ry="60" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="2" />
    {/* Eyes */}
    <ellipse cx="143" cy="78" rx="7" ry="8" fill="#E2F4FC" stroke="#2D9CCA" strokeWidth="1.5" />
    <ellipse cx="177" cy="78" rx="7" ry="8" fill="#E2F4FC" stroke="#2D9CCA" strokeWidth="1.5" />
    <circle cx="144" cy="79" r="3.5" fill="#0D2A3A" />
    <circle cx="178" cy="79" r="3.5" fill="#0D2A3A" />
    <circle cx="145.5" cy="77.5" r="1.2" fill="white" />
    <circle cx="179.5" cy="77.5" r="1.2" fill="white" />
    {/* Smile */}
    <path d="M148 98 Q160 108 172 98" stroke="#2D9CCA" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Cheek glow */}
    <ellipse cx="132" cy="92" rx="10" ry="6" fill="#9BE9FA" opacity="0.4" />
    <ellipse cx="188" cy="92" rx="10" ry="6" fill="#9BE9FA" opacity="0.4" />
    {/* Sparkles */}
    <text x="44" y="50" fontSize="18" fill="#9BE9FA">✦</text>
    <text x="252" y="44" fontSize="14" fill="#b5ffef">✦</text>
    <text x="30" y="130" fontSize="10" fill="#9BE9FA" opacity="0.6">✦</text>
    <text x="270" y="130" fontSize="12" fill="#fff9af">★</text>
    {/* Floating dots */}
    <circle cx="55" cy="70" r="4" fill="#9BE9FA" opacity="0.5" />
    <circle cx="265" cy="100" r="5" fill="#b5ffef" opacity="0.6" />
    <circle cx="100" cy="155" r="3" fill="#9BE9FA" opacity="0.4" />
    <circle cx="220" cy="158" r="4" fill="#fff9af" opacity="0.7" />
    {/* AI scan ring */}
    <circle cx="160" cy="85" r="68" stroke="#9BE9FA" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.5" />
  </svg>
);

export const IllustrationSkinType = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="120" rx="140" ry="55" fill="#E2F4FC" />
    {/* 3 face silhouettes with different skin textures */}
    {/* Oily face */}
    <ellipse cx="80" cy="85" rx="36" ry="42" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <circle cx="72" cy="72" r="3" fill="#b5ffef" opacity="0.8" />
    <circle cx="88" cy="70" r="3" fill="#b5ffef" opacity="0.8" />
    <circle cx="80" cy="82" r="2.5" fill="#9BE9FA" opacity="0.6" />
    <text x="62" y="108" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Oily</text>
    {/* Sensor ring on middle face */}
    <ellipse cx="160" cy="82" rx="42" ry="48" fill="#FFFFFF" stroke="#2D9CCA" strokeWidth="2" />
    <circle cx="160" cy="82" r="52" stroke="#9BE9FA" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    {/* scan lines */}
    <line x1="118" y1="75" x2="202" y2="75" stroke="#9BE9FA" strokeWidth="0.8" opacity="0.5" />
    <line x1="118" y1="82" x2="202" y2="82" stroke="#9BE9FA" strokeWidth="0.8" opacity="0.5" />
    <line x1="118" y1="89" x2="202" y2="89" stroke="#9BE9FA" strokeWidth="0.8" opacity="0.5" />
    <text x="138" y="115" fontSize="8" fill="#2D9CCA" fontFamily="DM Sans" fontWeight="700">AI Scan</text>
    {/* Dry face */}
    <ellipse cx="240" cy="85" rx="36" ry="42" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <path d="M228 74 Q234 70 240 74" stroke="#B8DFF0" strokeWidth="1.2" fill="none" />
    <path d="M232 82 Q238 78 244 82" stroke="#B8DFF0" strokeWidth="1.2" fill="none" />
    <text x="224" y="108" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Dry</text>
    {/* AI chip icon */}
    <rect x="148" y="70" width="24" height="24" rx="4" fill="#9BE9FA" opacity="0.3" />
    <rect x="152" y="74" width="16" height="16" rx="2" fill="#2D9CCA" opacity="0.5" />
    <text x="156" y="85" fontSize="9" fill="white" fontWeight="700">AI</text>
    {/* Sparkles */}
    <text x="20" y="45" fontSize="14" fill="#9BE9FA">✦</text>
    <text x="280" y="50" fontSize="12" fill="#fff9af">★</text>
  </svg>
);

export const IllustrationGender = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="130" rx="140" ry="45" fill="#E2F4FC" />
    {/* Female */}
    <ellipse cx="95" cy="80" rx="38" ry="44" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="2" />
    <path d="M95 124 L95 148 M80 136 L110 136" stroke="#9BE9FA" strokeWidth="2" strokeLinecap="round" />
    <circle cx="88" cy="73" r="3.5" fill="#0D2A3A" />
    <circle cx="102" cy="73" r="3.5" fill="#0D2A3A" />
    <path d="M88 90 Q95 97 102 90" stroke="#2D9CCA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M76 62 Q95 52 114 62" stroke="#0D2A3A" strokeWidth="2" fill="none" strokeLinecap="round" />
    <text x="76" y="168" fontSize="9" fill="#4A7A8A" fontFamily="DM Sans">Female</text>
    {/* Male */}
    <ellipse cx="225" cy="80" rx="38" ry="44" fill="#FFFFFF" stroke="#b5ffef" strokeWidth="2" />
    <path d="M225 124 L225 148" stroke="#b5ffef" strokeWidth="2" strokeLinecap="round" />
    <path d="M248 57 L263 42 M256 42 L263 42 L263 49" stroke="#b5ffef" strokeWidth="2" strokeLinecap="round" />
    <circle cx="218" cy="73" r="3.5" fill="#0D2A3A" />
    <circle cx="232" cy="73" r="3.5" fill="#0D2A3A" />
    <path d="M218 90 Q225 97 232 90" stroke="#2D9CCA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M210 65 Q217 58 225 63 Q233 58 240 65" stroke="#0D2A3A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <text x="210" y="168" fontSize="9" fill="#4A7A8A" fontFamily="DM Sans">Male</text>
    {/* Non-binary in middle */}
    <ellipse cx="160" cy="78" rx="30" ry="34" fill="#FDFDE8" stroke="#fff9af" strokeWidth="1.5" />
    <circle cx="154" cy="72" r="2.8" fill="#0D2A3A" />
    <circle cx="166" cy="72" r="2.8" fill="#0D2A3A" />
    <path d="M154 85 Q160 90 166 85" stroke="#2D9CCA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <text x="146" y="124" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Non-binary</text>
    <text x="20" y="40" fontSize="14" fill="#9BE9FA">✦</text>
    <text x="285" y="38" fontSize="12" fill="#b5ffef">✦</text>
  </svg>
);

export const IllustrationLifestyle = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="140" rx="150" ry="38" fill="#E2F4FC" />
    {/* Office building */}
    <rect x="30" y="60" width="70" height="90" rx="4" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <rect x="40" y="72" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="58" y="72" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="76" y="72" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="40" y="94" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="58" y="94" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="76" y="94" width="12" height="14" rx="2" fill="#9BE9FA" opacity="0.5" />
    <rect x="52" y="120" width="16" height="30" rx="2" fill="#B8DFF0" />
    <text x="40" y="165" fontSize="8" fill="#2D9CCA" fontFamily="DM Sans" fontWeight="600">Office</text>
    {/* Outdoor / city scene */}
    <rect x="125" y="80" width="50" height="70" rx="4" fill="#FFFFFF" stroke="#fff9af" strokeWidth="1.5" />
    {/* PM2.5 cloud */}
    <ellipse cx="150" cy="48" rx="28" ry="18" fill="#B8DFF0" opacity="0.7" />
    <ellipse cx="136" cy="53" rx="18" ry="14" fill="#D4EEF9" opacity="0.8" />
    <ellipse cx="164" cy="53" rx="18" ry="14" fill="#D4EEF9" opacity="0.8" />
    <text x="138" y="52" fontSize="7" fill="#4A7A8A" fontFamily="DM Sans" fontWeight="700">PM2.5</text>
    <text x="126" y="105" fontSize="20" fill="#9BE9FA">🏙</text>
    <text x="126" y="162" fontSize="8" fill="#2D9CCA" fontFamily="DM Sans" fontWeight="600">City + PM</text>
    {/* Rural / outdoor */}
    <rect x="220" y="80" width="70" height="70" rx="4" fill="#FFFFFF" stroke="#b5ffef" strokeWidth="1.5" />
    <ellipse cx="255" cy="60" rx="22" ry="16" fill="#fff9af" opacity="0.8" />
    {/* sun rays */}
    <line x1="255" y1="38" x2="255" y2="30" stroke="#fff9af" strokeWidth="1.5" />
    <line x1="272" y1="45" x2="278" y2="39" stroke="#fff9af" strokeWidth="1.5" />
    <line x1="238" y1="45" x2="232" y2="39" stroke="#fff9af" strokeWidth="1.5" />
    <text x="228" y="113" fontSize="20" fill="#b5ffef">🌿</text>
    <text x="224" y="162" fontSize="8" fill="#2A9E80" fontFamily="DM Sans" fontWeight="600">Rural / Outdoor</text>
  </svg>
);

export const IllustrationAllergy = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="130" rx="140" ry="45" fill="#FDE8E8" opacity="0.5" />
    <ellipse cx="160" cy="130" rx="100" ry="30" fill="#E2F4FC" opacity="0.5" />
    {/* Shield */}
    <path d="M160 30 L200 48 L200 90 Q200 118 160 135 Q120 118 120 90 L120 48 Z" fill="#FFFFFF" stroke="#D44B3A" strokeWidth="2" />
    <path d="M160 42 L192 57 L192 90 Q192 112 160 126 Q128 112 128 90 L128 57 Z" fill="#FDE8E8" opacity="0.5" />
    {/* Warning symbol */}
    <text x="147" y="95" fontSize="30" fill="#D44B3A">!</text>
    {/* Floating ingredient bubbles */}
    <circle cx="62" cy="65" r="22" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <text x="50" y="62" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Fragrance</text>
    <line x1="62" y1="72" x2="62" y2="62" stroke="#D44B3A" strokeWidth="1.5" />
    <line x1="57" y1="67" x2="67" y2="67" stroke="#D44B3A" strokeWidth="1.5" />
    <circle cx="258" cy="65" r="22" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="1.5" />
    <text x="248" y="62" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Paraben</text>
    <line x1="258" y1="72" x2="258" y2="62" stroke="#D44B3A" strokeWidth="1.5" />
    <line x1="253" y1="67" x2="263" y2="67" stroke="#D44B3A" strokeWidth="1.5" />
    <circle cx="62" cy="130" r="20" fill="#FFFFFF" stroke="#b5ffef" strokeWidth="1.5" />
    <text x="53" y="128" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Sulfate</text>
    <text x="56" y="140" fontSize="8" fill="#2A9E80">✓ Safe</text>
    <circle cx="258" cy="130" r="20" fill="#FFFFFF" stroke="#b5ffef" strokeWidth="1.5" />
    <text x="250" y="128" fontSize="8" fill="#4A7A8A" fontFamily="DM Sans">Retinol</text>
    <text x="252" y="140" fontSize="8" fill="#2A9E80">✓ Safe</text>
    <text x="20" y="40" fontSize="12" fill="#9BE9FA">✦</text>
    <text x="282" y="44" fontSize="10" fill="#fff9af">★</text>
  </svg>
);

export const IllustrationGoals = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="160" cy="140" rx="150" ry="38" fill="#E2F4FC" />
    {/* Central face glow */}
    <ellipse cx="160" cy="82" rx="50" ry="56" fill="#FFFFFF" stroke="#9BE9FA" strokeWidth="2" />
    <circle cx="160" cy="82" r="65" stroke="#9BE9FA" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.5" />
    <circle cx="160" cy="82" r="75" stroke="#E2F4FC" strokeWidth="8" fill="none" />
    {/* Eyes */}
    <ellipse cx="146" cy="75" rx="6" ry="7" fill="#E2F4FC" stroke="#2D9CCA" strokeWidth="1.2" />
    <ellipse cx="174" cy="75" rx="6" ry="7" fill="#E2F4FC" stroke="#2D9CCA" strokeWidth="1.2" />
    <circle cx="147" cy="76" r="3" fill="#0D2A3A" />
    <circle cx="175" cy="76" r="3" fill="#0D2A3A" />
    <circle cx="148" cy="75" r="1" fill="white" />
    <circle cx="176" cy="75" r="1" fill="white" />
    {/* Smile */}
    <path d="M148 93 Q160 104 172 93" stroke="#2D9CCA" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Goal tags orbiting */}
    <rect x="8" y="55" width="60" height="18" rx="9" fill="#9BE9FA" opacity="0.8" />
    <text x="14" y="67" fontSize="8" fill="#0D2A3A" fontFamily="DM Sans" fontWeight="600">✦ Hydration</text>
    <rect x="8" y="90" width="64" height="18" rx="9" fill="#b5ffef" opacity="0.8" />
    <text x="14" y="102" fontSize="8" fill="#0D2A3A" fontFamily="DM Sans" fontWeight="600">✦ Anti-aging</text>
    <rect x="252" y="55" width="60" height="18" rx="9" fill="#9BE9FA" opacity="0.8" />
    <text x="258" y="67" fontSize="8" fill="#0D2A3A" fontFamily="DM Sans" fontWeight="600">✦ Clarity</text>
    <rect x="248" y="90" width="66" height="18" rx="9" fill="#fff9af" opacity="0.9" />
    <text x="254" y="102" fontSize="8" fill="#0D2A3A" fontFamily="DM Sans" fontWeight="600">★ Brightening</text>
    {/* Sparkles */}
    <text x="140" y="28" fontSize="14" fill="#fff9af">★</text>
    <text x="85" y="145" fontSize="10" fill="#9BE9FA">✦</text>
    <text x="225" y="148" fontSize="10" fill="#b5ffef">✦</text>
  </svg>
);
