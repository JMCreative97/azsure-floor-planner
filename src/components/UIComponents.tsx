import React, { ReactNode } from 'react';
import { UIPanelProps } from '../types/blueprint';

interface PanelProps extends UIPanelProps {
  width?: number;
  height?: number;
  position?: { x: number; y: number };
}

export const UIPanel: React.FC<PanelProps> = ({
  title,
  visible,
  onClose,
  children,
  width = 200,
  height = 'auto',
  position = { x: 0, y: 0 }
}) => {
  if (!visible) return null;

  const style: React.CSSProperties = {
    position: 'absolute',
    top: position.y,
    right: position.x,
    width: width,
    height: height === 'auto' ? 'auto' : height,
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px'
  };

  return (
    <div style={style} className="ui-panel">
      <div 
        style={{
          backgroundColor: '#d0d0d0',
          padding: '8px 12px',
          borderBottom: '1px solid #ccc',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        className="ui-panel-header"
      >
        <span>{title}</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '0',
              color: '#666'
            }}
          >
            ×
          </button>
        )}
      </div>
      <div 
        style={{ padding: '8px' }}
        className="ui-panel-content"
      >
        {children}
      </div>
    </div>
  );
};

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const PanelButton: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: '100%',
      padding: '6px 8px',
      margin: '2px 0',
      backgroundColor: disabled ? '#f5f5f5' : '#e0e0e0',
      border: '1px solid #ccc',
      borderRadius: '2px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '11px'
    }}
    className="panel-button"
  >
    {label}
  </button>
);

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const PanelDropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => (
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
        border: '1px solid #ccc',
        borderRadius: '2px',
        fontSize: '11px'
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

interface RangeProps {
  label: string;
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: (value: number) => void;
}

export const PanelRange: React.FC<RangeProps> = ({ label, min, max, value, step, onChange }) => (
  <div style={{ margin: '4px 0' }}>
    <label style={{ display: 'block', marginBottom: '2px', fontSize: '11px' }}>
      {label}: {value}
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      style={{ width: '100%' }}
    />
  </div>
);

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PanelCheckbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <div style={{ margin: '4px 0' }}>
    <label style={{ display: 'flex', alignItems: 'center', fontSize: '11px', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginRight: '6px' }}
      />
      {label}
    </label>
  </div>
);

interface ColorProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const PanelColor: React.FC<ColorProps> = ({ label, value, onChange }) => (
  <div style={{ margin: '4px 0' }}>
    <label style={{ display: 'block', marginBottom: '2px', fontSize: '11px' }}>
      {label}
    </label>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        height: '24px',
        border: '1px solid #ccc',
        borderRadius: '2px'
      }}
    />
  </div>
);

interface ImageProps {
  label: string;
  src: string;
  alt?: string;
}

export const PanelImage: React.FC<ImageProps> = ({ label, src, alt = '' }) => (
  <div style={{ margin: '4px 0' }}>
    <label style={{ display: 'block', marginBottom: '2px', fontSize: '11px' }}>
      {label}
    </label>
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '60px',
        objectFit: 'cover',
        border: '1px solid #ccc',
        borderRadius: '2px'
      }}
    />
  </div>
);

interface FileChooserProps {
  label: string;
  accept: string;
  onChange: (file: File) => void;
}

export const PanelFileChooser: React.FC<FileChooserProps> = ({ label, accept, onChange }) => (
  <div style={{ margin: '4px 0' }}>
    <label style={{ display: 'block', marginBottom: '2px', fontSize: '11px' }}>
      {label}
    </label>
    <input
      type="file"
      accept={accept}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onChange(file);
      }}
      style={{
        width: '100%',
        padding: '4px',
        border: '1px solid #ccc',
        borderRadius: '2px',
        fontSize: '11px'
      }}
    />
  </div>
);

interface HTMLProps {
  label: string;
  content: string;
}

export const PanelHTML: React.FC<HTMLProps> = ({ label, content }) => (
  <div style={{ margin: '4px 0' }}>
    <label style={{ display: 'block', marginBottom: '2px', fontSize: '11px' }}>
      {label}
    </label>
    <div
      style={{
        fontSize: '10px',
        lineHeight: '1.3',
        color: '#666',
        backgroundColor: '#f9f9f9',
        padding: '6px',
        border: '1px solid #e0e0e0',
        borderRadius: '2px',
        maxHeight: '100px',
        overflowY: 'auto'
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);