import React, { useState, useEffect, useCallback } from 'react';
import { BlueprintViewer } from './BlueprintViewer';
import { 
  UIPanel, 
  PanelButton, 
  PanelDropdown, 
  PanelRange, 
  PanelCheckbox, 
  PanelColor, 
  PanelImage, 
  PanelFileChooser,
  PanelHTML 
} from './UIComponents';
import { BlueprintJS, FloorTextures, WallTextures, DoorsData } from '../types/blueprint';

// Import JSON data
import floor_textures_json from '../floor_textures.json';
import wall_textures_json from '../wall_textures.json';
import default_room_json from '../design.json';

// Constants
const DOORS_DATA: DoorsData = {
  'Door Type 1': { src: '/assets/doors/DoorType1.png', type: 1 },
  'Door Type 2': { src: '/assets/doors/DoorType2.png', type: 2 },
  'Door Type 3': { src: '/assets/doors/DoorType3.png', type: 3 },
  'Door Type 4': { src: '/assets/doors/DoorType4.png', type: 4 },
  'Door Type 5': { src: '/assets/doors/DoorType5.png', type: 5 },
  'Door Type 6': { src: '/assets/doors/DoorType6.png', type: 6 },
};

export default function BlueprintApp() {
  // State for Blueprint3D instance
  const [blueprint3d, setBlueprint3d] = useState<BlueprintJS | null>(null);
  const [currentView, setCurrentView] = useState<'Floor Planning' | 'Room Planning'>('Floor Planning');
  
  // UI Panel visibility states
  const [showViewer2D, setShowViewer2D] = useState(true);
  const [showViewer3D, setShowViewer3D] = useState(false);
  const [showSelectedCorner, setShowSelectedCorner] = useState(false);
  const [showSelectedWall, setShowSelectedWall] = useState(false);
  const [showSelectedRoom, setShowSelectedRoom] = useState(false);
  const [showSelectedWall3D, setShowSelectedWall3D] = useState(false);
  const [showSelectedRoom3D, setShowSelectedRoom3D] = useState(false);
  
  // 2D Configuration states
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [directionalDrag, setDirectionalDrag] = useState(false);
  const [dragOnlyX, setDragOnlyX] = useState(false);
  const [dragOnlyY, setDragOnlyY] = useState(false);
  const [itemStatistics, setItemStatistics] = useState(false);
  const [snapTolerance, setSnapTolerance] = useState(50);
  const [gridSpacing, setGridSpacing] = useState(100);
  const [boundsX, setBoundsX] = useState(100);
  const [boundsY, setBoundsY] = useState(100);
  
  // Selected item properties
  const [cornerElevation, setCornerElevation] = useState(0);
  const [wallThickness, setWallThickness] = useState(0.2);
  const [roomName, setRoomName] = useState('');
  
  // Texture and material states
  const [selectedFloorTexture, setSelectedFloorTexture] = useState('');
  const [selectedWallTexture, setSelectedWallTexture] = useState('');
  const [selectedDoor, setSelectedDoor] = useState('');
  const [floorTextureColor, setFloorTextureColor] = useState('#FFFFFF');
  const [wallTextureColor, setWallTextureColor] = useState('#FFFFFF');

  // Data
  const floor_textures = floor_textures_json as FloorTextures;
  const wall_textures = wall_textures_json as WallTextures;
  const floor_texture_keys = Object.keys(floor_textures);
  const wall_texture_keys = Object.keys(wall_textures);
  const doorTypes = Object.keys(DOORS_DATA);

  // Initialize default values
  useEffect(() => {
    if (floor_texture_keys.length > 0) {
      setSelectedFloorTexture(floor_texture_keys[0]);
    }
    if (wall_texture_keys.length > 0) {
      setSelectedWallTexture(wall_texture_keys[0]);
    }
    if (doorTypes.length > 0) {
      setSelectedDoor(doorTypes[0]);
    }
  }, []);

  // Event handlers
  const switchViewer = useCallback(() => {
    if (blueprint3d) {
      blueprint3d.switchView();
      if (blueprint3d.currentView === 2) {
        setCurrentView('Floor Planning');
        setShowViewer3D(false);
        setShowViewer2D(true);
        setShowSelectedWall3D(false);
        setShowSelectedRoom3D(false);
      } else if (blueprint3d.currentView === 3) {
        setCurrentView('Room Planning');
        setShowViewer2D(false);
        setShowSelectedCorner(false);
        setShowSelectedWall(false);
        setShowSelectedRoom(false);
        setShowViewer3D(true);
      }
    }
  }, [blueprint3d]);

  const switchViewer2DToDraw = useCallback(() => {
    blueprint3d?.setViewer2DModeToDraw();
  }, [blueprint3d]);

  const switchViewer2DToMove = useCallback(() => {
    blueprint3d?.setViewer2DModeToMove();
  }, [blueprint3d]);

  const switchViewer2DToTransform = useCallback(() => {
    blueprint3d?.switchViewer2DToTransform();
  }, [blueprint3d]);

  const deleteCurrentItem = useCallback(() => {
    blueprint3d?.floorplanningHelper?.deleteCurrentItem();
  }, [blueprint3d]);

  const resetBlueprint = useCallback(() => {
    blueprint3d?.model?.reset();
  }, [blueprint3d]);

  const saveDesign = useCallback(() => {
    if (blueprint3d) {
      const data = blueprint3d.model.exportSerialized();
      const blob = new Blob([data], { type: 'text' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'design.blueprint3d';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }, [blueprint3d]);

  const loadDesign = useCallback((file: File) => {
    if (blueprint3d) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as string;
        blueprint3d.model.loadSerialized(data);
      };
      reader.readAsText(file);
    }
  }, [blueprint3d]);

  const exportGLTF = useCallback(() => {
    blueprint3d?.roomplanner?.exportSceneAsGTLF();
  }, [blueprint3d]);

  // Set up Blueprint3D event listeners
  useEffect(() => {
    if (!blueprint3d) return;

    // 2D Events
    blueprint3d.floorplanner?.addFloorplanListener?.('nothing-2d-selected', () => {
      setShowSelectedCorner(false);
      setShowSelectedWall(false);
      setShowSelectedRoom(false);
    });

    blueprint3d.floorplanner?.addFloorplanListener?.('corner-2d-clicked', (evt: any) => {
      setShowSelectedCorner(true);
      setShowSelectedWall(false);
      setShowSelectedRoom(false);
      if (evt.item?.elevation !== undefined) {
        setCornerElevation(evt.item.elevation);
      }
    });

    blueprint3d.floorplanner?.addFloorplanListener?.('wall-2d-clicked', (evt: any) => {
      setShowSelectedCorner(false);
      setShowSelectedWall(true);
      setShowSelectedRoom(false);
      if (evt.item?.thickness !== undefined) {
        setWallThickness(evt.item.thickness);
      }
    });

    blueprint3d.floorplanner?.addFloorplanListener?.('room-2d-clicked', (evt: any) => {
      setShowSelectedCorner(false);
      setShowSelectedWall(false);
      setShowSelectedRoom(true);
      if (evt.item?.name !== undefined) {
        setRoomName(evt.item.name);
      }
    });

    // 3D Events
    blueprint3d.roomplanner?.addRoomplanListener?.('item-selected', () => {
      setShowSelectedWall3D(false);
      setShowSelectedRoom3D(false);
    });

    blueprint3d.roomplanner?.addRoomplanListener?.('no-item-selected', () => {
      setShowSelectedWall3D(false);
      setShowSelectedRoom3D(false);
    });

    blueprint3d.roomplanner?.addRoomplanListener?.('wall-clicked', () => {
      setShowSelectedWall3D(true);
      setShowSelectedRoom3D(false);
    });

    blueprint3d.roomplanner?.addRoomplanListener?.('room-clicked', () => {
      setShowSelectedWall3D(false);
      setShowSelectedRoom3D(true);
    });

  }, [blueprint3d]);

  const onBlueprintLoad = useCallback((bp: BlueprintJS) => {
    setBlueprint3d(bp);
    // Load default design
    const default_room = JSON.stringify(default_room_json);
    bp.model.loadSerialized(default_room);
  }, []);

  return (
    <div className="blueprint-app" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <BlueprintViewer
        initialDesign={JSON.stringify(default_room_json)}
        onLoad={() => {}}
        onError={(error) => console.error('Blueprint error:', error)}
        onBlueprintReady={onBlueprintLoad}
        className="w-full h-full"
      />
      
      {/* Main UI Panel */}
      <UIPanel
        title="BlueprintJS"
        visible={true}
        width={200}
        height={450}
        position={{ x: 20, y: 0 }}
      >
        <PanelButton label="Switch Viewer" onClick={switchViewer} />
        <div style={{ margin: '4px 0', fontSize: '11px' }}>
          Current View: {currentView}
        </div>
        
        <PanelFileChooser
          label="Load Design"
          accept=".blueprint3d"
          onChange={loadDesign}
        />
        <PanelButton label="Save Design" onClick={saveDesign} />
        <PanelButton label="Export as GLTF" onClick={exportGLTF} />
        <PanelButton label="Reset" onClick={resetBlueprint} />
      </UIPanel>

      {/* Viewer 2D Panel */}
      <UIPanel
        title="Viewer 2D"
        visible={showViewer2D}
        width={200}
        height={460}
        position={{ x: 20, y: 460 }}
      >
        <PanelButton label="Draw Mode" onClick={switchViewer2DToDraw} />
        <PanelButton label="Move Mode" onClick={switchViewer2DToMove} />
        <PanelButton label="Transform Mode" onClick={switchViewer2DToTransform} />
        <PanelButton label="Delete" onClick={deleteCurrentItem} />
        
        <PanelCheckbox
          label="Snap to Grid"
          checked={snapToGrid}
          onChange={setSnapToGrid}
        />
        <PanelCheckbox
          label="Directional Drag"
          checked={directionalDrag}
          onChange={setDirectionalDrag}
        />
        <PanelCheckbox
          label="Drag Only X"
          checked={dragOnlyX}
          onChange={setDragOnlyX}
        />
        <PanelCheckbox
          label="Drag Only Y"
          checked={dragOnlyY}
          onChange={setDragOnlyY}
        />
        <PanelCheckbox
          label="Item Statistics"
          checked={itemStatistics}
          onChange={setItemStatistics}
        />
        
        <PanelRange
          label="Snap Tolerance"
          min={1}
          max={200}
          value={snapTolerance}
          step={1}
          onChange={setSnapTolerance}
        />
        <PanelRange
          label="Grid Spacing"
          min={10}
          max={200}
          value={gridSpacing}
          step={1}
          onChange={setGridSpacing}
        />
        <PanelRange
          label="Bounds X"
          min={1}
          max={200}
          value={boundsX}
          step={1}
          onChange={setBoundsX}
        />
        <PanelRange
          label="Bounds Y"
          min={1}
          max={200}
          value={boundsY}
          step={1}
          onChange={setBoundsY}
        />
      </UIPanel>

      {/* Selected Corner Panel */}
      <UIPanel
        title="Corner"
        visible={showSelectedCorner}
        width={200}
        position={{ x: 240, y: 460 }}
      >
        <PanelRange
          label="Corner Elevation"
          min={1}
          max={500}
          value={cornerElevation}
          step={1}
          onChange={setCornerElevation}
        />
      </UIPanel>

      {/* Selected Wall Panel */}
      <UIPanel
        title="Wall"
        visible={showSelectedWall}
        width={200}
        position={{ x: 240, y: 460 }}
      >
        <PanelRange
          label="Wall Thickness"
          min={0.2}
          max={1}
          value={wallThickness}
          step={0.01}
          onChange={setWallThickness}
        />
      </UIPanel>

      {/* Selected Room Panel */}
      <UIPanel
        title="Room"
        visible={showSelectedRoom}
        width={200}
        position={{ x: 240, y: 460 }}
      >
        <div style={{ margin: '4px 0' }}>
          <label style={{ display: 'block', marginBottom: '2px', fontSize: '11px' }}>
            Room Name
          </label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            style={{
              width: '100%',
              padding: '4px',
              border: '1px solid #ccc',
              borderRadius: '2px',
              fontSize: '11px'
            }}
          />
        </div>
      </UIPanel>

      {/* Viewer 3D Panel */}
      <UIPanel
        title="Viewer 3D"
        visible={showViewer3D}
        width={200}
        height={460}
        position={{ x: 20, y: 460 }}
      >
        <PanelHTML
          label="Tips:"
          content="<p>Click and drag to rotate the room in 360°</p><p>Add room items <ul><li>Add parametric doors</li><li>Other items (Coming soon)</li></ul></p><p>Drag and Place items(pink boxes and parametric doors) in the room</p>"
        />
      </UIPanel>

      {/* Selected Wall 3D Panel */}
      <UIPanel
        title="Wall"
        visible={showSelectedWall3D}
        width={200}
        position={{ x: 240, y: 460 }}
      >
        {wall_texture_keys.length > 0 && (
          <>
            <PanelDropdown
              label="Wall Textures"
              options={wall_texture_keys}
              value={selectedWallTexture}
              onChange={setSelectedWallTexture}
            />
            <PanelImage
              label="Wall Texture:"
              src={wall_textures[selectedWallTexture]?.colormap || '/textures/NoPreview.jpg'}
            />
            <PanelColor
              label="Wall Texture Color:"
              value={wallTextureColor}
              onChange={setWallTextureColor}
            />
            <PanelButton label="Apply" onClick={() => {}} />
          </>
        )}
        
        {doorTypes.length > 0 && (
          <>
            <PanelDropdown
              label="Select Door"
              options={doorTypes}
              value={selectedDoor}
              onChange={setSelectedDoor}
            />
            <PanelImage
              label="Door Preview:"
              src={DOORS_DATA[selectedDoor]?.src || ''}
            />
            <PanelButton label="Add" onClick={() => {}} />
          </>
        )}
      </UIPanel>

      {/* Selected Room 3D Panel */}
      <UIPanel
        title="Room"
        visible={showSelectedRoom3D}
        width={200}
        position={{ x: 240, y: 460 }}
      >
        {floor_texture_keys.length > 0 && (
          <>
            <PanelDropdown
              label="Floor Textures"
              options={floor_texture_keys}
              value={selectedFloorTexture}
              onChange={setSelectedFloorTexture}
            />
            <PanelImage
              label="Floor Texture:"
              src={floor_textures[selectedFloorTexture]?.colormap || '/textures/NoPreview.jpg'}
            />
            <PanelColor
              label="Floor Texture Color:"
              value={floorTextureColor}
              onChange={setFloorTextureColor}
            />
            <PanelButton label="Apply" onClick={() => {}} />
          </>
        )}
        
        {wall_texture_keys.length > 0 && (
          <>
            <PanelDropdown
              label="All Wall Textures"
              options={wall_texture_keys}
              value={selectedWallTexture}
              onChange={setSelectedWallTexture}
            />
            <PanelImage
              label="All Wall Texture:"
              src={wall_textures[selectedWallTexture]?.colormap || '/textures/NoPreview.jpg'}
            />
            <PanelColor
              label="All Wall Texture Color:"
              value={wallTextureColor}
              onChange={setWallTextureColor}
            />
            <PanelButton label="Apply" onClick={() => {}} />
          </>
        )}
      </UIPanel>
    </div>
  );
}