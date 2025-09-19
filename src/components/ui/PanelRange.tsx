import React from 'react';

interface PanelRangeProps {
  label: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
}

export const PanelRange: React.FC<PanelRangeProps> = ({ 
  label, 
  min, 
  max, 
  value, 
  step = 1, 
  onChange 
}) => (
  <div style={{ margin: '4px 0' }}>
    <label style={{ display: 'block', marginBottom: '2px', fontSize: '11px' }}>
      {label}: {value}
    </label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: '100%',
        margin: '4px 0'
      }}
    />
  </div>
);