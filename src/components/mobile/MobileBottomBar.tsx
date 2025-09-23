import React from 'react';
import { PenTool, Move, RotateCw, Trash2, MoreHorizontal, Plus } from 'lucide-react';

interface MobileBottomBarProps {
  onDraw: () => void;
  onMove: () => void;
  onTransform: () => void;
  onDelete: () => void;
  onAdd?: () => void; // Add button handler
  showMore?: boolean;
  onMore?: () => void;
  
  // Active states
  activeTool?: 'draw' | 'move' | 'transform' | 'delete' | 'add' | 'more' | null;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onDraw,
  onMove,
  onTransform,
  onDelete,
  onAdd,
  showMore = false,
  onMore,
  activeTool
}) => {
  const getButtonStyle = (isActive: boolean, isDelete: boolean = false) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '4px 8px',
    border: 'none',
    borderRadius: '6px',
    background: isActive ? '#3b82f6' : 'transparent',
    color: isActive ? '#ffffff' : (isDelete ? '#dc2626' : '#374151'),
    cursor: 'pointer',
    minWidth: '56px',
    fontSize: '12px',
    fontWeight: '500',
    gap: '2px',
    transition: 'all 0.2s ease',
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isActive ? '0 2px 4px rgba(59, 130, 246, 0.3)' : 'none'
  });
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
        onClick={onAdd || (() => console.log('Add elements placeholder'))}
        style={getButtonStyle(activeTool === 'add')}
      >
        <Plus size={18} />
        <span>Add</span>
      </button>

      <button
        onClick={onDraw}
        style={getButtonStyle(activeTool === 'draw')}
      >
        <PenTool size={18} />
        <span>Draw</span>
      </button>

      <button
        onClick={onMove}
        style={getButtonStyle(activeTool === 'move')}
      >
        <Move size={18} />
        <span>Move</span>
      </button>

      <button
        onClick={onTransform}
        style={getButtonStyle(activeTool === 'transform')}
      >
        <RotateCw size={18} />
        <span>Transform</span>
      </button>

      <button
        onClick={onDelete}
        style={getButtonStyle(activeTool === 'delete', true)}
      >
        <Trash2 size={18} />
        <span>Delete</span>
      </button>

      {showMore && (
        <button
          onClick={onMore}
          style={{
            ...getButtonStyle(activeTool === 'more'),
            opacity: onMore ? 1 : 0.5
          }}
          disabled={!onMore}
        >
          <MoreHorizontal size={18} />
          <span>More</span>
        </button>
      )}
    </div>
  );
};