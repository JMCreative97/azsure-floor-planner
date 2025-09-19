import React from 'react';

interface MobileBottomBarProps {
  onDraw: () => void;
  onMove: () => void;
  onTransform: () => void;
  onDelete: () => void;
  onMore?: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onDraw,
  onMove,
  onTransform,
  onDelete,
  onMore
}) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1001,
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '8px 16px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '56px',
      boxShadow: '0 -1px 3px rgba(0,0,0,0.1)'
    }}>
      <button
        onClick={onDraw}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4px 8px',
          border: 'none',
          borderRadius: '6px',
          background: 'transparent',
          color: '#374151',
          cursor: 'pointer',
          minWidth: '56px',
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        <span style={{ fontSize: '18px', marginBottom: '2px' }}>✏️</span>
        <span>Draw</span>
      </button>

      <button
        onClick={onMove}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4px 8px',
          border: 'none',
          borderRadius: '6px',
          background: 'transparent',
          color: '#374151',
          cursor: 'pointer',
          minWidth: '56px',
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        <span style={{ fontSize: '18px', marginBottom: '2px' }}>👋</span>
        <span>Move</span>
      </button>

      <button
        onClick={onTransform}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4px 8px',
          border: 'none',
          borderRadius: '6px',
          background: 'transparent',
          color: '#374151',
          cursor: 'pointer',
          minWidth: '56px',
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        <span style={{ fontSize: '18px', marginBottom: '2px' }}>🔄</span>
        <span>Transform</span>
      </button>

      <button
        onClick={onDelete}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4px 8px',
          border: 'none',
          borderRadius: '6px',
          background: 'transparent',
          color: '#dc2626',
          cursor: 'pointer',
          minWidth: '56px',
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        <span style={{ fontSize: '18px', marginBottom: '2px' }}>🗑️</span>
        <span>Delete</span>
      </button>

      <button
        onClick={onMore}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4px 8px',
          border: 'none',
          borderRadius: '6px',
          background: 'transparent',
          color: '#374151',
          cursor: 'pointer',
          minWidth: '56px',
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        <span style={{ fontSize: '18px', marginBottom: '2px' }}>⋯</span>
        <span>More</span>
      </button>
    </div>
  );
};