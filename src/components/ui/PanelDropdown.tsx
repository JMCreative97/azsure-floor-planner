import React from 'react';

interface PanelDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const PanelDropdown: React.FC<PanelDropdownProps> = ({ 
  label, 
  options, 
  value, 
  onChange 
}) => (
  <div style={{ margin: '4px 0' }}>
    <label style={{ display: 'block', marginBottom: '2px', fontSize: '11px' }}>
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '4px',
        fontSize: '11px',
        border: '1px solid #ccc',
        borderRadius: '2px'
      }}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);