import React from 'react';
import { UIPanel, PanelButton, PanelCheckbox, PanelRange, PanelDropdown } from '../ui';

interface Viewer2DPanelProps {
  visible: boolean;
  snapToGrid: boolean;
  directionalDrag: boolean;
  dragOnlyX: boolean;
  dragOnlyY: boolean;
  itemStatistics: boolean;
  snapTolerance: number;
  gridSpacing: number;
  wallTexture: string;
  wallTextureOptions: string[];
  
  onDrawMode: () => void;
  onMoveMode: () => void;
  onTransformMode: () => void;
  onDelete: () => void;
  onSnapToGridChange: (checked: boolean) => void;
  onDirectionalDragChange: (checked: boolean) => void;
  onDragOnlyXChange: (checked: boolean) => void;
  onDragOnlyYChange: (checked: boolean) => void;
  onItemStatisticsChange: (checked: boolean) => void;
  onSnapToleranceChange: (value: number) => void;
  onGridSpacingChange: (value: number) => void;
  onWallTextureChange: (texture: string) => void;
}

export const Viewer2DPanel: React.FC<Viewer2DPanelProps> = ({
  visible,
  snapToGrid,
  directionalDrag,
  dragOnlyX,
  dragOnlyY,
  itemStatistics,
  snapTolerance,
  gridSpacing,
  wallTexture,
  wallTextureOptions,
  onDrawMode,
  onMoveMode,
  onTransformMode,
  onDelete,
  onSnapToGridChange,
  onDirectionalDragChange,
  onDragOnlyXChange,
  onDragOnlyYChange,
  onItemStatisticsChange,
  onSnapToleranceChange,
  onGridSpacingChange,
  onWallTextureChange
}) => {
  return (
    <UIPanel
      title="Viewer 2D"
      visible={visible}
      width={200}
      height={460}
      position={{ x: 20, y: 460 }}
    >
      <PanelButton label="Draw Mode" onClick={onDrawMode} />
      <PanelButton label="Move Mode" onClick={onMoveMode} />
      <PanelButton label="Transform Mode" onClick={onTransformMode} />
      <PanelButton label="Delete" onClick={onDelete} />
      
      <PanelCheckbox
        label="Snap to Grid"
        checked={snapToGrid}
        onChange={onSnapToGridChange}
      />
      <PanelCheckbox
        label="Directional Drag"
        checked={directionalDrag}
        onChange={onDirectionalDragChange}
      />
      <PanelCheckbox
        label="Drag Only X"
        checked={dragOnlyX}
        onChange={onDragOnlyXChange}
      />
      <PanelCheckbox
        label="Drag Only Y"
        checked={dragOnlyY}
        onChange={onDragOnlyYChange}
      />
      <PanelCheckbox
        label="Item Statistics"
        checked={itemStatistics}
        onChange={onItemStatisticsChange}
      />
      
      <PanelRange
        label="Snap Tolerance"
        min={1}
        max={200}
        value={snapTolerance}
        step={1}
        onChange={onSnapToleranceChange}
      />
      <PanelRange
        label="Grid Spacing"
        min={10}
        max={200}
        value={gridSpacing}
        step={1}
        onChange={onGridSpacingChange}
      />
      
      <PanelDropdown
        label="Wall Texture"
        options={wallTextureOptions}
        value={wallTexture}
        onChange={onWallTextureChange}
      />
    </UIPanel>
  );
};