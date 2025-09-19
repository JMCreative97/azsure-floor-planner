import React, { ReactNode } from 'react';
import { UIPanelProps } from '../../types/blueprint';

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
              padding: '0 4px',
              lineHeight: '1'
            }}
          >
            ×
          </button>
        )}
      </div>
      <div 
        style={{ 
          padding: '12px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}
        className="ui-panel-content"
      >
        {children}
      </div>
    </div>
  );
};