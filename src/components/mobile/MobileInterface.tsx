import React from 'react';
import { MobileTopBar } from './MobileTopBar';
import { MobileBottomBar } from './MobileBottomBar';

interface MobileInterfaceProps {
  // View state
  showViewer2D: boolean;
  showViewer3D: boolean;
  
  // View actions
  onToggle2D: () => void;
  onToggle3D: () => void;
  
  // Top bar actions
  onUndo?: () => void;
  onRedo?: () => void;
  onSettings?: () => void;
  
  // Bottom bar actions
  onDraw: () => void;
  onMove: () => void;
  onTransform: () => void;
  onDelete: () => void;
  onMore?: () => void;
}

export const MobileInterface: React.FC<MobileInterfaceProps> = ({
  showViewer2D,
  showViewer3D,
  onToggle2D,
  onToggle3D,
  onUndo,
  onRedo,
  onSettings,
  onDraw,
  onMove,
  onTransform,
  onDelete,
  onMore
}) => {
  return (
    <>
      <MobileTopBar
        showViewer2D={showViewer2D}
        showViewer3D={showViewer3D}
        onToggle2D={onToggle2D}
        onToggle3D={onToggle3D}
        onUndo={onUndo}
        onRedo={onRedo}
        onSettings={onSettings}
      />
      
      <MobileBottomBar
        onDraw={onDraw}
        onMove={onMove}
        onTransform={onTransform}
        onDelete={onDelete}
        onMore={onMore}
      />
    </>
  );
};