// Blueprint3D Type Definitions
import * as THREE from 'three';
import React from 'react';

export interface Blueprint3DOptions {
  viewer2d: {
    id: string;
    viewer2dOptions: Viewer2DOptions;
  };
  viewer3d: {
    id: string;
    viewer3dOptions: Viewer3DOptions;
  };
  textureDir: string;
  widget: boolean;
  resize: boolean;
}

export interface Viewer2DOptions {
  'corner-radius': number;
  'boundary-point-radius': number;
  'boundary-line-thickness': number;
  'boundary-point-color': string;
  'boundary-line-color': string;
  pannable: boolean;
  zoomable: boolean;
  scale: boolean;
  rotate: boolean;
  translate: boolean;
  dimlinecolor: string;
  dimarrowcolor: string;
  dimtextcolor: string;
  pixiAppOptions: {
    resolution: number;
  };
  pixiViewportOptions: {
    passiveWheel: boolean;
  };
}

export interface Viewer3DOptions {
  occludedWalls: boolean;
  occludedRoofs: boolean;
}

export interface TexturePack {
  colormap?: string;
  normalmap?: string;
  roughnessmap?: string;
  ambientmap?: string;
  bumpmap?: string;
  color?: string;
}

export interface DoorData {
  src: string;
  type: number;
}

export interface FloorTextures {
  [key: string]: TexturePack;
}

export interface WallTextures {
  [key: string]: TexturePack;
}

export interface DoorsData {
  [key: string]: DoorData;
}

// Event types
export interface Blueprint3DEvent {
  type: string;
  item?: any;
}

export interface CornerEvent extends Blueprint3DEvent {
  item: {
    elevation: number;
  };
}

export interface WallEvent extends Blueprint3DEvent {
  item: {
    thickness: number;
  };
}

export interface RoomEvent extends Blueprint3DEvent {
  item: {
    name: string;
  };
}

export interface ItemEvent extends Blueprint3DEvent {
  itemModel: {
    isParametric: boolean;
    parametricClass?: any;
  };
}

export interface GLTFEvent extends Blueprint3DEvent {
  gltf: any;
}

// Blueprint3D Main Class Interface
export interface BlueprintJS {
  model: any;
  floorplanner: any;
  roomplanner: any;
  configurationHelper: any;
  floorplanningHelper: any;
  roomplanningHelper: any;
  currentView: number;
  switchView(): void;
  setViewer2DModeToDraw(): void;
  setViewer2DModeToMove(): void;
  switchViewer2DToTransform(): void;
}

// Configuration Helper Interface
export interface ConfigurationHelper {
  snapToGrid: boolean;
  directionalDrag: boolean;
  dragOnlyX: boolean;
  dragOnlyY: boolean;
  itemStatistics: boolean;
  snapTolerance: number;
  gridSpacing: number;
  boundsX: number;
  boundsY: number;
}

// Room Planning Helper Interface
export interface RoomPlanningHelper {
  roomTexturePack: TexturePack;
  roomWallsTexturePack: TexturePack;
  wallTexturePack: TexturePack;
  setRoomFloorColor(color: string): void;
  setRoomWallsTextureColor(color: string): void;
  setWallColor(color: string): void;
  addParametricDoorToCurrentWall(doorType: number): void;
  exportSceneAsGTLF(): void;
}

// Floor Planning Helper Interface
export interface FloorPlanningHelper {
  cornerElevation: number;
  wallThickness: number;
  roomName: string;
  deleteCurrentItem(): void;
}

// Component Props
export interface BlueprintComponentProps {
  initialDesign?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onBlueprintReady?: (blueprint: BlueprintJS) => void;
  className?: string;
}

export interface UIPanelProps {
  title: string;
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}