import React from 'react';
import { Text } from '@component/atoms/Text';
import { PHEWPHEW_COLORS as C } from '@component/PhewphewConstants';

interface CompatibilityCardProps {
  title: string;
  desc: string;
}

export const CompatibilityCard: React.FC<CompatibilityCardProps> = ({ title, desc }) => {
  return (
    <div 
      style={{ background: C.surface, border: `1px solid ${C.border}` }}
      className="p-3.5 rounded-2xl flex flex-col gap-1.5"
    >
      <Text size={11} weight={800} className="font-sans leading-snug">
        {title}
      </Text>
      <Text size={10} color={C.sub} className="leading-relaxed">
        {desc}
      </Text>
    </div>
  );
};
