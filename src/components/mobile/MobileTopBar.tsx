import React from 'react';

interface MobileTopBarProps {
  showViewer2D: boolean;
  showViewer3D: boolean;
  onToggle2D: () => void;
  onToggle3D: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSettings?: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  showViewer2D,
  showViewer3D,
  onToggle2D,
  onToggle3D,
  onUndo,
  onRedo,
  onSettings
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1002,
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '48px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {/* Logo */}
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#3b82f6'
      }}>
        AzPlanner
      </div>

      {/* 2D/3D Toggle */}
      <div style={{
        display: 'flex',
        background: '#f1f5f9',
        borderRadius: '6px',
        padding: '2px'
      }}>
        <button
          onClick={onToggle2D}
          style={{
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: showViewer2D ? '#3b82f6' : 'transparent',
            color: showViewer2D ? 'white' : '#374151',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          2D
        </button>
        <button
          onClick={onToggle3D}
          style={{
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: showViewer3D ? '#3b82f6' : 'transparent',
            color: showViewer3D ? 'white' : '#374151',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          3D
        </button>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <button
          onClick={onUndo}
          style={{
            padding: '6px',
            border: 'none',
            borderRadius: '4px',
            background: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          title="Undo"
        >
          ↶
        </button>
        <button
          onClick={onRedo}
          style={{
            padding: '6px',
            border: 'none',
            borderRadius: '4px',
            background: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          title="Redo"
        >
          ↷
        </button>
        <button
          onClick={onSettings}
          style={{
            padding: '6px',
            border: 'none',
            borderRadius: '4px',
            background: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          title="Settings"
        >
          ⚙️
        </button>
      </div>
    </div>
  );
};