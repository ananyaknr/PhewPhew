export const ZONES = [
  { name: 'Forehead', color: 'rgba(96,224,144,',
    pts: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109] },
  { name: 'T-Zone', color: 'rgba(224,96,96,',
    pts: [168, 6, 197, 195, 5, 4, 1, 19, 94, 2, 164, 0, 11, 12, 13, 14, 15, 16, 17, 18, 200, 199, 175] },
  { name: 'Left Cheek', color: 'rgba(96,160,224,',
    pts: [234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397, 288, 361, 323, 454] },
  { name: 'Chin/Jaw', color: 'rgba(224,192,96,',
    pts: [152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377] },
  { name: 'Left Eye', color: 'rgba(192,96,224,', pts: [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246] },
  { name: 'Right Eye', color: 'rgba(192,96,224,', pts: [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398] },
];

export const PROMPT = `You are PhewPhew's AI skin analysis engine. Analyse the facial skin image carefully.
Respond ONLY with valid JSON — no markdown, no extra text.

{
  "overall_summary": "2-sentence overall skin assessment",
  "conditions": [
    {
      "name": "condition name",
      "icon": "emoji",
      "severity": "None|Low|Medium|High",
      "confidence": 0-100,
      "zone": "Forehead|T-Zone|Left cheek|Right cheek|Chin|Eye area|Full face",
      "description": "1-2 sentences of what you observe"
    }
  ],
  "recommendations": ["rec 1", "rec 2", "rec 3"],
  "limitations": "one sentence about photo-only analysis limits"
}

Assess: Acne/breakouts, Hyperpigmentation, Redness/inflammation, Pore visibility, Oiliness, Skin texture, Signs of dehydration, Uneven tone.
Only flag conditions with clear visual evidence.`;
