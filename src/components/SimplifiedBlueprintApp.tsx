// Example of how to use the separated components
import React, { useState, useEffect } from 'react';
import { BlueprintViewer } from './BlueprintViewer';
import { MobileInterface } from './mobile';
import { MainPanel, Viewer2DPanel } from './panels';
import { useMobileDetection } from '../hooks/useMobileDetection';

// This is a simplified example showing how to structure BlueprintApp with separated components
export default function SimplifiedBlueprintApp() {
  const isMobile = useMobileDetection();
  
  // View states
  const [showViewer2D, setShowViewer2D] = useState(true);
  const [showViewer3D, setShowViewer3D] = useState(false);
  const [currentView, setCurrentView] = useState<'Floor Planning' | 'Room Planning'>('Floor Planning');
  
  // 2D Configuration states
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [directionalDrag, setDirectionalDrag] = useState(false);
  const [dragOnlyX, setDragOnlyX] = useState(false);
  const [dragOnlyY, setDragOnlyY] = useState(false);
  const [itemStatistics, setItemStatistics] = useState(false);
  const [snapTolerance, setSnapTolerance] = useState(50);
  const [gridSpacing, setGridSpacing] = useState(25);
  const [wallTexture, setWallTexture] = useState('');
  
  // Sample wall texture options
  const wallTextureOptions = ['Wood', 'Brick', 'Stone', 'Metal'];
  
  // Action handlers (simplified)
  const handleSwitchViewer = () => {
    setCurrentView(currentView === 'Floor Planning' ? 'Room Planning' : 'Floor Planning');
  };
  
  const handleToggle2D = () => {
    setShowViewer2D(true);
    setShowViewer3D(false);
  };
  
  const handleToggle3D = () => {
    setShowViewer2D(false);
    setShowViewer3D(true);
  };
  
  const handleLoadDesign = (file: File) => {
    console.log('Loading design:', file.name);
  };
  
  const handleSaveDesign = () => {
    console.log('Saving design');
  };
  
  const handleExportGLTF = () => {
    console.log('Exporting GLTF');
  };
  
  const handleReset = () => {
    console.log('Resetting blueprint');
  };
  
  // Mobile action handlers
  const handleDraw = () => {
    console.log('Draw mode');
  };
  
  const handleMove = () => {
    console.log('Move mode');
  };
  
  const handleTransform = () => {
    console.log('Transform mode');
  };
  
  const handleDelete = () => {
    console.log('Delete item');
  };

  return (
    <div>
      {/* Blueprint Viewer */}
      <BlueprintViewer 
        /* viewer props would go here */
      />
      
      {/* Mobile Interface */}
      {isMobile && (
        <MobileInterface
          showViewer2D={showViewer2D}
          showViewer3D={showViewer3D}
          onToggle2D={handleToggle2D}
          onToggle3D={handleToggle3D}
          onDraw={handleDraw}
          onMove={handleMove}
          onTransform={handleTransform}
          onDelete={handleDelete}
        />
      )}
      
      {/* Desktop Panels */}
      {!isMobile && (
        <>
          <MainPanel
            visible={true}
            currentView={currentView}
            onSwitchViewer={handleSwitchViewer}
            onLoadDesign={handleLoadDesign}
            onSaveDesign={handleSaveDesign}
            onExportGLTF={handleExportGLTF}
            onReset={handleReset}
          />
          
          <Viewer2DPanel
            visible={showViewer2D}
            snapToGrid={snapToGrid}
            directionalDrag={directionalDrag}
            dragOnlyX={dragOnlyX}
            dragOnlyY={dragOnlyY}
            itemStatistics={itemStatistics}
            snapTolerance={snapTolerance}
            gridSpacing={gridSpacing}
            wallTexture={wallTexture}
            wallTextureOptions={wallTextureOptions}
            onDrawMode={handleDraw}
            onMoveMode={handleMove}
            onTransformMode={handleTransform}
            onDelete={handleDelete}
            onSnapToGridChange={setSnapToGrid}
            onDirectionalDragChange={setDirectionalDrag}
            onDragOnlyXChange={setDragOnlyX}
            onDragOnlyYChange={setDragOnlyY}
            onItemStatisticsChange={setItemStatistics}
            onSnapToleranceChange={setSnapTolerance}
            onGridSpacingChange={setGridSpacing}
            onWallTextureChange={setWallTexture}
          />
        </>
      )}
    </div>
  );
}