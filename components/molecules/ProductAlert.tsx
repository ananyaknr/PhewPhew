import React from 'react';
import { PHEWPHEW_COLORS as C } from '@component/PhewphewConstants';
import { Check, AlertTriangle, XCircle } from 'lucide-react';

interface ProductAlertProps {
  type: 'warn' | 'good' | 'danger';
  text: string;
}

export const ProductAlert: React.FC<ProductAlertProps> = ({ type, text }) => {
  const styles = {
    good: { bg: '#E8FFFB', border: '#7ADFC8', text: C.mintDark, icon: <Check size={14} /> },
    warn: { bg: '#FFFBEB', border: 'rgba(146,64,14,0.2)', text: '#92400E', icon: <AlertTriangle size={14} /> },
    danger: { bg: '#FDE8E8', border: 'rgba(185,28,28,0.2)', text: C.danger, icon: <XCircle size={14} /> },
  };

  const style = styles[type] || styles.warn;

  return (
    <div 
      style={{ background: style.bg, border: `1.5px solid ${style.border}`, color: style.text }}
      className="flex items-start gap-2.5 px-4 py-3 rounded-2xl mb-2.5 font-sans text-[12px] font-semibold leading-relaxed"
    >
      <div className="mt-0.5 flex-shrink-0">{style.icon}</div>
      <span>{text}</span>
    </div>
  );
};
