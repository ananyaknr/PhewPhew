// ─── INGREDIENT DATABASE ───────────────────────────────────────────────────
export interface IngredientData {
  safety: 'safe' | 'caution' | 'avoid' | 'star';
  function: string;
  note: string;
}

export const INGREDIENT_DB: Record<string, IngredientData> = {
  'cyclopentasiloxane': { safety: 'caution', function: 'Emollient', note: 'Silicone with smooth feel; potential environmental concern, banned in EU rinse-off products' },
  'trehalose': { safety: 'safe', function: 'Humectant', note: 'Natural sugar; excellent moisture protection and barrier support' },
  'dipotassium glycyrrhizate': { safety: 'star', function: 'Soothing', note: 'Licorice-derived; potent anti-inflammatory, brightening, and soothing properties' },
  'c12-14 pareth-12': { safety: 'safe', function: 'Emulsifier', note: 'Surfactant/emulsifier; well-tolerated at standard concentrations' },
  'ammonium dimethicone': { safety: 'safe', function: 'Conditioning', note: 'Silicone that softens and smooths skin texture' },
  'dimethicone/vinyl dimethicone crosspolymer': { safety: 'safe', function: 'Texture agent', note: 'Creates silky, powdery skin feel; non-irritating' },
  'sodium hyaluronate': { safety: 'star', function: 'Hydration', note: 'Salt form of HA — smaller molecule, penetrates deeper into dermis' },
  'disodium edta': { safety: 'safe', function: 'Chelating', note: 'Stabilizes formula by binding metal ions; well-tolerated' },
  'glycyrrhiza glabra root extract': { safety: 'star', function: 'Brightening', note: 'Licorice root extract — inhibits melanin, anti-inflammatory' },
  'citrus aurantifolia extract': { safety: 'caution', function: 'Brightening', note: 'Lime extract with Vit C; can be photosensitizing' },
  'nelumbo nucifera extract': { safety: 'safe', function: 'Antioxidant', note: 'Lotus extract; antioxidant and skin-brightening' },
  'camellia sinensis leaf extract': { safety: 'star', function: 'Antioxidant', note: 'Green tea — EGCG-rich, anti-aging, anti-inflammatory' },
  'jasminum officinale extract': { safety: 'caution', function: 'Fragrance/Botanical', note: 'Jasmine extract; aromatic, potential sensitizer for reactive skin' },
  'rosa damascena flower extract': { safety: 'caution', function: 'Fragrance/Botanical', note: 'Rose extract; soothing but potential allergen for sensitive skin' },
  'iris versicolor extract': { safety: 'safe', function: 'Brightening', note: 'Blue flag iris; brightening and antioxidant' },
  'lilium candidum bulb extract': { safety: 'safe', function: 'Brightening', note: 'White lily extract; brightens and conditions skin' },
  'freesia refracta extract': { safety: 'caution', function: 'Fragrance/Botanical', note: 'Freesia flower; aromatic, may sensitize reactive skin' },
  'propanediol': { safety: 'safe', function: 'Humectant', note: 'Plant-derived glycol; hydrating and gentle penetration enhancer' },
  '1,2-hexanediol': { safety: 'safe', function: 'Preservative aid', note: 'Multifunctional humectant and preservation booster' },
  'glycereth-26': { safety: 'safe', function: 'Humectant', note: 'PEG-free glycerin derivative; excellent moisturizer' },
  'diethoxyethyl succinate': { safety: 'safe', function: 'Emollient', note: 'Skin-conditioning ester; smooth feel' },
  'sodium dna': { safety: 'star', function: 'Regeneration (PDRN)', note: 'Polydeoxyribonucleotide (PDRN) — DNA-derived, stimulates cell regeneration and wound healing' },
  'polyacrylate crosspolymer-6': { safety: 'safe', function: 'Thickener', note: 'Modern texture agent; provides gel-like consistency' },
  'ethylhexylglycerin': { safety: 'safe', function: 'Preservative', note: 'Gentle antimicrobial and skin-conditioning agent' },
  'glycogen': { safety: 'safe', function: 'Energizing', note: 'Skin energy source; enhances cellular metabolism' },
  'glyceryl polyacrylate': { safety: 'safe', function: 'Hydration', note: 'Forms moisture-retaining film on skin' },
  'polyglyceryl-10 laurate': { safety: 'safe', function: 'Emulsifier', note: 'Gentle plant-derived emulsifier' },
  'poly-sodium glyceryl-4 laurate': { safety: 'safe', function: 'Emulsifier', note: 'Mild surfactant; gentle cleansing action' },
  'adenosine': { safety: 'star', function: 'Anti-aging', note: 'Proven wrinkle reduction; natural nucleoside, FDA-approved efficacy' },
  'sodium phytate': { safety: 'safe', function: 'Chelating', note: 'Natural antioxidant chelator; stabilizes formula' },
  'sodium citrate': { safety: 'safe', function: 'pH adjuster', note: 'Buffering agent; maintains optimal pH' },
  't-butyl alcohol': { safety: 'caution', function: 'Solvent', note: 'Alcohol solvent; can be drying — concentration matters' },
  'hydrolyzed collagen': { safety: 'safe', function: 'Conditioning', note: 'Topical collagen peptides; film-forming, surface hydration' },
  'hamamelis virginiana extract': { safety: 'safe', function: 'Soothing', note: 'Witch hazel — antioxidant and astringent; alcohol-free version is gentle' },
  'dipropylene glycol': { safety: 'safe', function: 'Humectant', note: 'Solvent and humectant; well-tolerated' },
  'citric acid': { safety: 'safe', function: 'pH adjuster', note: 'AHA at low concentrations; primarily used as pH adjuster here' },
  'methylpropanediol': { safety: 'safe', function: 'Penetration enhancer', note: 'Helps actives absorb deeper; humectant' },
  'lactobacillus ferment': { safety: 'star', function: 'Postbiotic', note: 'Probiotic-derived — balances skin microbiome, anti-inflammatory, barrier-strengthening' },
  'salicylic acid': { safety: 'caution', function: 'Exfoliant (BHA)', note: 'Penetrates pores; highly effective for acne but avoid with retinol' },
  'bisabolol': { safety: 'star', function: 'Soothing', note: 'From chamomile; potent anti-irritant, anti-inflammatory, supports wound healing' },
  'melaleuca alternifolia leaf oil': { safety: 'caution', function: 'Antimicrobial', note: 'Tea tree oil; antibacterial/antifungal but can irritate sensitive skin at high %' },
  'acetyl hexapeptide-8': { safety: 'star', function: 'Anti-aging peptide', note: 'Argireline — relaxes micro-contractions, reduces expression lines' },
  'laminaria digitata extract': { safety: 'safe', function: 'Antioxidant', note: 'Brown algae; rich in minerals, antioxidants, and skin-strengthening polysaccharides' },
  'salix alba bark extract': { safety: 'caution', function: 'Exfoliant', note: 'Natural source of salicylic acid from willow bark; gentle BHA action' },
  'cetyl-pg hydroxyethyl palmitamide': { safety: 'safe', function: 'Ceramide precursor', note: 'Sphingolipid that supports ceramide synthesis and barrier repair' },
  'ceramide eop': { safety: 'star', function: 'Barrier repair', note: 'Omega-type ceramide — most critical for barrier integrity and moisture lock' },
  'ceramide ng': { safety: 'star', function: 'Barrier repair', note: 'Non-hydroxy ceramide; replenishes depleted barrier lipids' },
  'ceramide np': { safety: 'star', function: 'Barrier repair', note: 'Most abundant ceramide in skin; essential for barrier function' },
  'ceramide as': { safety: 'star', function: 'Barrier repair', note: 'Alpha-hydroxy ceramide; enhances barrier cohesion' },
  'ceramide ap': { safety: 'star', function: 'Barrier repair', note: 'Phyto-ceramide analog; strengthens and repairs damaged barrier' },
  'ammonium acryloyldimethyltaurate/vp copolymer': { safety: 'safe', function: 'Stabilizer', note: 'High-performance texture and suspension agent' },
  'polysorbate 20': { safety: 'safe', function: 'Emulsifier', note: 'Mild emulsifier; helps solubilize fragrance and oils' },
  'chlorphenesin': { safety: 'caution', function: 'Preservative', note: 'Effective preservative; use below 0.3% — watch for concentration' },
  'hydroxyethylcellulose': { safety: 'safe', function: 'Thickener', note: 'Natural cellulose derivative; non-irritating texture agent' },
  'hydrogenated lecithin': { safety: 'safe', function: 'Emollient', note: 'Phospholipid similar to skin\'s own lipids; repairs and softens barrier' },
  'cholesterol': { safety: 'safe', function: 'Barrier lipid', note: 'Essential skin lipid; works synergistically with ceramides for barrier repair' },
  'potassium hydroxide': { safety: 'safe', function: 'pH adjuster', note: 'Alkaline pH adjuster; neutralized in formula' },
  'carbomer': { safety: 'safe', function: 'Thickener', note: 'Gel texture agent; very well tolerated' },
  'sodium hydroxide': { safety: 'safe', function: 'pH adjuster', note: 'pH stabilizer; neutralized in finished product' },
  'niacinamide': { safety: 'star', function: 'Brightening', note: 'Superstar ingredient — reduces pores, brightens, anti-inflammatory' },
  'hyaluronic acid': { safety: 'star', function: 'Hydration', note: 'Deeply hydrates, plumps skin, binds 1000x its weight in water' },
  'retinol': { safety: 'caution', function: 'Anti-aging', note: 'Highly effective but can irritate — start slow, avoid with AHAs' },
  'vitamin c': { safety: 'star', function: 'Antioxidant', note: 'Brightens and protects; avoid mixing with retinol' },
  'ascorbic acid': { safety: 'star', function: 'Antioxidant', note: 'Active form of Vitamin C — highly effective, pH-sensitive' },
  'glycolic acid': { safety: 'caution', function: 'Exfoliant (AHA)', note: 'Resurfaces skin; photosensitizing — use SPF' },
  'ceramide': { safety: 'safe', function: 'Barrier repair', note: 'Strengthens skin barrier; ideal for dry/sensitive skin' },
  'peptides': { safety: 'safe', function: 'Anti-aging', note: 'Signals skin to produce collagen; universally tolerated' },
  'glycerin': { safety: 'safe', function: 'Humectant', note: 'Draws moisture into skin; great for all skin types' },
  'panthenol': { safety: 'safe', function: 'Humectant', note: 'Pro-vitamin B5; heals and hydrates skin barrier' },
  'allantoin': { safety: 'safe', function: 'Soothing', note: 'Softens skin, promotes healing; excellent for sensitive skin' },
  'phenoxyethanol': { safety: 'safe', function: 'Preservative', note: 'Common, effective preservative at correct concentration' },
  'caprylyl glycol': { safety: 'safe', function: 'Preservative aid', note: 'Skin-conditioning antimicrobial booster' },
  'butylene glycol': { safety: 'safe', function: 'Humectant', note: 'Lightweight moisturizer; well-tolerated' },
  'xanthan gum': { safety: 'safe', function: 'Stabilizer', note: 'Natural thickener; non-irritating' },
  'water': { safety: 'safe', function: 'Solvent', note: 'Base ingredient; no concerns' },
  'aqua': { safety: 'safe', function: 'Solvent', note: 'Water — base ingredient' },
  'fragrance': { safety: 'caution', function: 'Fragrance', note: 'Sensitizer; not recommended for reactive skin types' },
  'parfum': { safety: 'caution', function: 'Fragrance', note: 'Common allergen; avoid if sensitive or reactive skin' },
};

export interface ProductAlert {
  type: 'warn' | 'good' | 'danger';
  text: string;
}

export interface ProductCompatibility {
  title: string;
  desc: string;
}

export interface ProductScores {
  overall: string;
  safety: string;
  hydration: string;
}

export interface Product {
  name: string;
  brand: string;
  type: string;
  icon: string;
  skinTypes: string[];
  scores: ProductScores;
  ingredients: string[];
  alerts: ProductAlert[];
  compatibility: ProductCompatibility[];
}

export const PRODUCTS: Record<string, Product> = {
  a: {
    name: '1 Night Brightening Overnight Mask',
    brand: 'Cute Press',
    type: 'Overnight Brightening Mask · 10g',
    icon: '🌙',
    skinTypes: ['Normal', 'Combination', 'Dull skin', 'Hyperpigmentation'],
    scores: { overall: 'B+', safety: '78', hydration: '88' },
    ingredients: [
      'Water', 'Propanediol', 'Cyclopentasiloxane', 'Niacinamide',
      '1,2-Hexanediol', 'Carbomer', 'Phenoxyethanol', 'Trehalose',
      'Caprylyl Glycol', 'Allantoin', 'Potassium Hydroxide',
      'Ammonium Dimethicone', 'Dipotassium Glycyrrhizate', 'C12-14 Pareth-12',
      'Dimethicone/Vinyl Dimethicone Crosspolymer', 'Disodium EDTA',
      'Sodium Hyaluronate', 'Butylene Glycol', 'Fragrance (Parfum)',
      'Citrus Aurantifolia Extract', 'Glycyrrhiza Glabra Root Extract',
      'Jasminum Officinale Extract', 'Camellia Sinensis Leaf Extract',
      'Nelumbo Nucifera Flower Extract', 'Iris Versicolor Extract',
      'Lilium Candidum Bulb Extract', 'Freesia Refracta Extract',
      'Rosa Damascena Flower Extract'
    ],
    alerts: [
      { type: 'warn', text: '⚠ Contains Fragrance (Parfum) + multiple floral extracts — not ideal for sensitive or reactive skin' },
      { type: 'warn', text: '⚠ Cyclopentasiloxane — silicone under EU environmental review; effective but controversial' },
      { type: 'good', text: '✓ 5-FREE: No parabens, alcohol, mineral oil, PEG sulfate, or synthetic color' },
      { type: 'good', text: '✓ Brightening stack: Niacinamide + Dipotassium Glycyrrhizate + Licorice Root + Sodium Hyaluronate' }
    ],
    compatibility: [
      { title: '✓ With HA Serums', desc: 'Apply as final leave-on step to lock in hydration from underneath' },
      { title: '⚠ With Retinol', desc: 'Fragrance + citrus extracts may amplify retinol irritation — use separately' },
      { title: '⚠ With Vitamin C', desc: 'Use Vit C in AM, this mask at night to avoid pH conflicts' },
      { title: '✓ After AHA/BHA', desc: 'Allantoin and HA calm skin post-exfoliation overnight' }
    ]
  },
  b: {
    name: 'Reju-PDRN Treatment Ampoule Serum',
    brand: 'Rojukiss',
    type: 'Regenerating Ampoule Serum · 10ml',
    icon: '🧬',
    skinTypes: ['All skin types', 'Aging skin', 'Post-procedure', 'Dull skin'],
    scores: { overall: 'A', safety: '94', hydration: '91' },
    ingredients: [
      'Water', 'Propanediol', 'Glycerin', 'Niacinamide', 'Glycereth-26',
      '1,2-Hexanediol', 'Dipropylene Glycol', 'Butylene Glycol',
      'Diethoxyethyl Succinate', 'Sodium DNA', 'Polyacrylate Crosspolymer-6',
      'Caprylyl Glycol', 'Ethylhexylglycerin', 'Panthenol', 'Glycogen',
      'Sodium Hyaluronate', 'Glyceryl Polyacrylate', 'Polyglyceryl-10 Laurate',
      'Poly-Sodium Glyceryl-4 Laurate', 'Adenosine', 'Xanthan Gum',
      'Citric Acid', 'Sodium Phytate', 'Sodium Citrate', 'T-Butyl Alcohol',
      'Hydrolyzed Collagen', 'Hamamelis Virginiana (Witch Hazel) Extract',
      'Ascorbic Acid'
    ],
    alerts: [
      { type: 'good', text: '✓ No alcohol, no fragrance, no parabens — dermatologically tested' },
      { type: 'good', text: '✓ PDRN (Sodium DNA) — DNA-fragment tech used in clinical skin regeneration treatments' },
      { type: 'good', text: '✓ Multi-active brightening: Niacinamide + Adenosine + Ascorbic Acid + Glycogen' },
      { type: 'warn', text: '⚠ T-Butyl Alcohol present — minor concern; well within safe limits at ampoule concentration' }
    ],
    compatibility: [
      { title: '✓ With Retinol', desc: 'PDRN + Panthenol buffer and enhance retinol recovery overnight' },
      { title: '✓ With Vitamin C', desc: 'Ascorbic Acid already included; pairs well with Ferulic Acid externally' },
      { title: '✓ With Ceramide creams', desc: 'Apply serum first, seal with ceramide moisturizer on top' },
      { title: '✓ Post-laser / procedure', desc: 'PDRN is gold-standard post-procedure ingredient — ideal use case' }
    ]
  },
  c: {
    name: '28D Biome+ Acne Defense Serum',
    brand: 'Dr.PONG',
    type: 'Postbiotic Acne Defense Serum · 7g',
    icon: '🔬',
    skinTypes: ['Oily', 'Acne-prone', 'Combination', 'Microbiome-sensitive'],
    scores: { overall: 'A', safety: '91', hydration: '82' },
    ingredients: [
      'Aqua', 'Butylene Glycol', 'Propanediol', 'Methylpropanediol',
      'Niacinamide', 'Lactobacillus Ferment', 'Salicylic Acid', 'Allantoin',
      'Bisabolol', 'Melaleuca Alternifolia Leaf Oil', 'Acetyl Hexapeptide-8',
      'Laminaria Digitata Extract', 'Salix Alba Bark Extract',
      'Cetyl-PG Hydroxyethyl Palmitamide',
      'Ceramide EOP', 'Ceramide NG', 'Ceramide NP', 'Ceramide AS', 'Ceramide AP',
      'Ammonium Acryloyldimethyltaurate/VP Copolymer', 'Phenoxyethanol',
      'Polysorbate 20', '1,2-Hexanediol', 'Sodium Hydroxide', 'Chlorphenesin',
      'Disodium EDTA', 'Glycerin', 'Caprylyl Glycol',
      'Hydroxyethylcellulose', 'Hydrogenated Lecithin', 'Cholesterol'
    ],
    alerts: [
      { type: 'good', text: '✓ 6-FREE: No mineral oil, fragrance, alcohol, parabens, silicone, or synthetic color' },
      { type: 'good', text: '✓ Full 5-ceramide complex (EOP+NG+NP+AS+AP) — clinical barrier repair alongside acne treatment' },
      { type: 'good', text: '✓ Postbiotic (Lactobacillus Ferment) — rebalances microbiome while fighting acne causatives' },
      { type: 'warn', text: '⚠ Salicylic Acid + Tea Tree Oil combo — potent; patch test for very sensitive skin' }
    ],
    compatibility: [
      { title: '⚠ With Retinol', desc: 'Salicylic Acid + retinol = high irritation risk — strictly alternate nights' },
      { title: '⚠ With AHAs', desc: 'Avoid layering BHA with AHA same routine — over-exfoliation risk' },
      { title: '✓ Standalone moisturizer', desc: 'Ceramide complex inside is sufficient; light gel moisturizer only' },
      { title: '✓ With SPF', desc: 'Essential daily — salicylic acid significantly increases UV sensitivity' }
    ]
  },
  u: {
    name: 'Unrecognized Product',
    brand: 'Unknown Brand',
    type: 'Product Not in Database',
    icon: '❓',
    skinTypes: ['N/A'],
    scores: { overall: '?', safety: '—', hydration: '—' },
    ingredients: [],
    alerts: [
      { type: 'warn', text: '⚠ Product not recognized. OCR will attempt to read ingredients directly from label.' }
    ],
    compatibility: []
  }
};
