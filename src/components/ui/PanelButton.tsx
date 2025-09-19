import React from 'react';

interface PanelButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'tertiary';
}

export const PanelButton: React.FC<PanelButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false,
  variant = 'secondary'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#3b82f6',
          color: 'white',
          border: '1px solid #3b82f6'
        };
      case 'danger':
        return {
          backgroundColor: '#dc2626',
          color: 'white',
          border: '1px solid #dc2626'
        };
      case 'tertiary':
        return {
          backgroundColor: '#f1f5f9',
          color: '#374151',
          border: '1px solid #d1d5db'
        };
      default: // secondary
        return {
          backgroundColor: '#f9fafb',
          color: '#374151',
          border: '1px solid #d1d5db'
        };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...getVariantStyles(),
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '12px',
        fontWeight: '500',
        margin: '2px 0',
        width: '100%',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        ...(!disabled && {
          ':hover': {
            opacity: 0.8
          }
        })
      }}
    >
      {label}
    </button>
  );
};