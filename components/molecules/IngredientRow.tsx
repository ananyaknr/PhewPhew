import React from 'react';
import { Text } from '@component/atoms/Text';
import { PHEWPHEW_COLORS as C } from '@component/PhewphewConstants';
import { getIngredientData } from '@/logic/ProductAnalyzer';

interface IngredientRowProps {
  name: string;
  isLast?: boolean;
}

export const IngredientRow: React.FC<IngredientRowProps> = ({ name, isLast }) => {
  const data = getIngredientData(name);
  const safety = data?.safety || 'safe';
  const func = data?.function || 'Ingredient';
  
  const safetyColors = {
    safe: { dot: C.mintDark, bg: '#E8FFFB', text: C.mintDark, label: 'SAFE' },
    caution: { dot: '#D97706', bg: '#FFFBEB', text: '#92400E', label: 'CAUTION' },
    avoid: { dot: C.danger, bg: '#FDE8E8', text: C.danger, label: 'AVOID' },
    star: { dot: '#B8860B', bg: '#FFF9AF', text: '#856404', label: 'STAR ★' },
  };
  
  const colors = safetyColors[safety as keyof typeof safetyColors] || safetyColors.safe;

  return (
    <div 
      title={data?.note}
      style={{ borderColor: C.border }}
      className={`px-4 py-3 flex items-center gap-3 transition-colors hover:bg-black/[0.02] ${!isLast ? 'border-b' : ''}`}
    >
      <div 
        style={{ background: colors.dot }}
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <Text size={12} weight={700} className="truncate">
          {name}
        </Text>
        <Text size={10} color={C.sub}>
          {func}
        </Text>
      </div>
      <div 
        style={{ background: colors.bg, color: colors.text, borderColor: 'rgba(0,0,0,0.05)' }}
        className="px-2 py-0.5 rounded-full text-[8px] font-bold font-sans border flex-shrink-0"
      >
        {colors.label}
      </div>
    </div>
  );
};
