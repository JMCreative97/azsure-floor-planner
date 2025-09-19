import React from 'react';

interface PanelCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PanelCheckbox: React.FC<PanelCheckboxProps> = ({ 
  label, 
  checked, 
  onChange 
}) => (
  <div style={{ 
    margin: '4px 0', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '6px' 
  }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{
        margin: 0
      }}
    />
    <label style={{ 
      fontSize: '11px', 
      cursor: 'pointer',
      userSelect: 'none'
    }}>
      {label}
    </label>
  </div>
);