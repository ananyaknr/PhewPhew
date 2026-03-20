import React from 'react';
import { Text } from '@component/atoms/Text';
import { PHEWPHEW_COLORS as C } from '@component/PhewphewConstants';

interface ProductScoreCardProps {
  label: string;
  value: string;
}

export const ProductScoreCard: React.FC<ProductScoreCardProps> = ({ label, value }) => {
  const getScoreColor = (val: string) => {
    if (val === '—' || val === '?' || val === '') return C.muted;
    if (val.startsWith('A')) return C.mintDark;
    if (val.startsWith('B')) return '#92400E';
    
    const n = parseInt(val);
    if (!isNaN(n)) {
      if (n >= 88) return C.mintDark;
      if (n >= 70) return '#92400E';
      return C.danger;
    }
    return C.text;
  };

  const color = getScoreColor(value);

  return (
    <div 
      style={{ background: C.accentLight, border: `1px solid ${C.border}` }}
      className="flex-1 p-3 rounded-2xl text-center flex flex-col items-center justify-center gap-1"
    >
      <div 
        style={{ color }}
        className="text-[28px] font-extrabold font-sans leading-none"
      >
        {value}
      </div>
      <Text size={10} weight={700} color={C.sub} className="uppercase tracking-wider">
        {label}
      </Text>
    </div>
  );
};
