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
  width = 240,
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
    backgroundColor: '#ffffff',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    zIndex: 1000,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '13px',
    overflow: 'hidden'
  };

  return (
    <div style={style} className="ui-panel">
      <div
        style={{
          backgroundColor: '#fafafa',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          fontWeight: '500',
          fontSize: '14px',
          letterSpacing: '-0.01em',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#1a1a1a'
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
              fontSize: '18px',
              cursor: 'pointer',
              padding: '0',
              color: '#999',
              lineHeight: '1',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#333'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
          >
            ×
          </button>
        )}
      </div>
      <div
        style={{ padding: '16px' }}
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
      padding: '8px 12px',
      margin: '4px 0',
      backgroundColor: disabled ? '#f8f8f8' : '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '6px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '13px',
      fontWeight: '500',
      letterSpacing: '-0.01em',
      color: disabled ? '#999' : '#333',
      transition: 'all 0.15s ease',
      boxShadow: disabled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.04)'
    }}
    onMouseEnter={(e) => {
      if (!disabled) {
        e.currentTarget.style.backgroundColor = '#f8f8f8';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
      }
    }}
    onMouseLeave={(e) => {
      if (!disabled) {
        e.currentTarget.style.backgroundColor = '#ffffff';
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
      }
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
  <div style={{ margin: '8px 0' }}>
    <label style={{
      display: 'block',
      marginBottom: '4px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666',
      letterSpacing: '-0.01em'
    }}>
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '8px 10px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '6px',
        fontSize: '13px',
        backgroundColor: '#ffffff',
        color: '#333',
        cursor: 'pointer',
        transition: 'border-color 0.15s ease',
        appearance: 'none',
        backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 8px center',
        backgroundSize: '16px',
        paddingRight: '32px'
      }}
      onFocus={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.24)'}
      onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.12)'}
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
  <div style={{ margin: '8px 0' }}>
    <label style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '6px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666',
      letterSpacing: '-0.01em'
    }}>
      <span>{label}</span>
      <span style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#333',
        minWidth: '40px',
        textAlign: 'right'
      }}>{value}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      style={{
        width: '100%',
        height: '4px',
        borderRadius: '2px',
        background: '#e5e5e5',
        outline: 'none',
        cursor: 'pointer',
        WebkitAppearance: 'none',
        appearance: 'none'
      }}
      className="modern-range"
    />
  </div>
);

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PanelCheckbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <div style={{ margin: '8px 0' }}>
    <label style={{
      display: 'flex',
      alignItems: 'center',
      fontSize: '13px',
      cursor: 'pointer',
      color: '#333'
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          marginRight: '8px',
          width: '16px',
          height: '16px',
          cursor: 'pointer',
          accentColor: '#333'
        }}
      />
      <span style={{ letterSpacing: '-0.01em' }}>{label}</span>
    </label>
  </div>
);

interface ColorProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const PanelColor: React.FC<ColorProps> = ({ label, value, onChange }) => (
  <div style={{ margin: '8px 0' }}>
    <label style={{
      display: 'block',
      marginBottom: '4px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666',
      letterSpacing: '-0.01em'
    }}>
      {label}
    </label>
    <div style={{
      position: 'relative',
      width: '100%',
      height: '36px',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '6px',
      backgroundColor: '#fff',
      padding: '2px',
      cursor: 'pointer'
    }}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: value
        }}
      />
    </div>
  </div>
);

interface ImageProps {
  label: string;
  src: string;
  alt?: string;
}

export const PanelImage: React.FC<ImageProps> = ({ label, src, alt = '' }) => (
  <div style={{ margin: '8px 0' }}>
    <label style={{
      display: 'block',
      marginBottom: '4px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666',
      letterSpacing: '-0.01em'
    }}>
      {label}
    </label>
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '80px',
        objectFit: 'cover',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '6px',
        backgroundColor: '#fafafa'
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
  <div style={{ margin: '8px 0' }}>
    <label style={{
      display: 'block',
      marginBottom: '4px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666',
      letterSpacing: '-0.01em'
    }}>
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
        padding: '8px 10px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '6px',
        fontSize: '13px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        transition: 'border-color 0.15s ease'
      }}
      onFocus={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.24)'}
      onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.12)'}
    />
  </div>
);

interface HTMLProps {
  label: string;
  content: string;
}

export const PanelHTML: React.FC<HTMLProps> = ({ label, content }) => (
  <div style={{ margin: '8px 0' }}>
    <label style={{
      display: 'block',
      marginBottom: '4px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666',
      letterSpacing: '-0.01em'
    }}>
      {label}
    </label>
    <div
      style={{
        fontSize: '12px',
        lineHeight: '1.5',
        color: '#555',
        backgroundColor: '#fafafa',
        padding: '10px',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        borderRadius: '6px',
        maxHeight: '120px',
        overflowY: 'auto'
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);