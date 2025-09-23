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
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitToView?: () => void;
  
  // Bottom bar actions
  onDraw: () => void;
  onMove: () => void;
  onTransform: () => void;
  onDelete: () => void;
  onAdd?: () => void; // Add button handler
  showMore?: boolean;
  onMore?: () => void;
  
  // Active tool state
  activeTool?: 'draw' | 'move' | 'transform' | 'delete' | 'add' | 'more' | null;
}

export const MobileInterface: React.FC<MobileInterfaceProps> = ({
  showViewer2D,
  showViewer3D,
  onToggle2D,
  onToggle3D,
  onUndo,
  onRedo,
  onSettings,
  onZoomIn,
  onZoomOut,
  onFitToView,
  onDraw,
  onMove,
  onTransform,
  onDelete,
  onAdd,
  showMore = false,
  onMore,
  activeTool
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
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onFitToView={onFitToView}
      />
      
      <MobileBottomBar
        onDraw={onDraw}
        onMove={onMove}
        onTransform={onTransform}
        onDelete={onDelete}
        onAdd={onAdd}
        showMore={showMore}
        onMore={onMore}
        activeTool={activeTool}
      />
    </>
  );
};