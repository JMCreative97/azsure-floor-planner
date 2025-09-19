// Global type declarations for modules without TypeScript definitions

declare module 'quicksettings' {
  interface QuickSettingsInstance {
    addButton(label: string, callback: () => void): QuickSettingsInstance;
    addHTML(label: string, content: string): QuickSettingsInstance;
    addDropDown(label: string, options: string[], callback: (data: any) => void): QuickSettingsInstance;
    addFileChooser(label: string, title: string, filter: string, callback: (file: File) => void): QuickSettingsInstance;
    addImage(label: string, src: string, callback?: any): QuickSettingsInstance;
    addColor(label: string, color: string, callback: (color: string) => void): QuickSettingsInstance;
    bindDropDown(property: string, options: string[], object: any): QuickSettingsInstance;
    bindBoolean(property: string, value: boolean, object: any): QuickSettingsInstance;
    bindRange(property: string, min: number, max: number, value: number, step: number, object: any): QuickSettingsInstance;
    bindNumber(property: string, min: number, max: number, value: number, step: number, object: any): QuickSettingsInstance;
    bindText(property: string, value: string, object: any): QuickSettingsInstance;
    setValue(property: string, value: any): QuickSettingsInstance;
    getValue(property: string): any;
    show(): QuickSettingsInstance;
    hide(): QuickSettingsInstance;
    hideControl(label: string): QuickSettingsInstance;
    showControl(label: string): QuickSettingsInstance;
    setWidth(width: number): QuickSettingsInstance;
    setHeight(height: number): QuickSettingsInstance;
    setPosition(x: number, y: number): QuickSettingsInstance;
    destroy(): void;
    _hidden: boolean;
  }

  interface QuickSettings {
    create(x: number, y: number, title: string, parent?: HTMLElement): QuickSettingsInstance;
  }

  const QuickSettings: QuickSettings;
  export default QuickSettings;
}

declare module 'fps-now' {
  interface FPSInstance {
    start(): void;
    stop(): void;
  }

  interface FPS {
    of(position: { x: number; y: number }): FPSInstance;
  }

  const FPS: FPS;
  export default FPS;
}

declare module 'alpha-shape' {
  function alphaShape(points: number[][], alpha: number): number[][];
  export = alphaShape;
}

declare module 'bezier-js' {
  export class Bezier {
    constructor(points: number[][]);
    // Add other Bezier methods as needed
  }
}

declare module 'detect-touch-device' {
  const isTouchDevice: boolean;
  export default isTouchDevice;
}

declare module 'es6-enum' {
  export function Enum(...args: string[]): any;
}

declare module 'line-intersect' {
  export function intersect(
    x1: number, y1: number, x2: number, y2: number,
    x3: number, y3: number, x4: number, y4: number
  ): { x: number; y: number; } | null;
}

declare module 'point-in-polygon' {
  function pointInPolygon(point: [number, number], polygon: [number, number][]): boolean;
  export = pointInPolygon;
}

declare module 'three-gltf-exporter' {
  export class GLTFExporter {
    parse(
      input: any,
      onDone: (result: any) => void,
      onError?: (error: any) => void,
      options?: any
    ): void;
  }
}

declare module 'three-reflector' {
  export class Reflector extends THREE.Mesh {
    constructor(geometry: THREE.BufferGeometry, options?: any);
  }
}

declare module 'pixi-viewport' {
  export class Viewport {
    constructor(options?: any);
    // Add other Viewport methods as needed
  }
}

// JSON module declarations
declare module '*.json' {
  const value: any;
  export default value;
}