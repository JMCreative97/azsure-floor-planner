'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BlueprintComponentProps, Blueprint3DOptions, BlueprintJS } from '../types/blueprint';

const useBlueprintJS = () => {
  const [blueprint3d, setBlueprint3d] = useState<BlueprintJS | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initializeBlueprint = useCallback(async (options: Blueprint3DOptions) => {
    if (blueprint3d) return blueprint3d; // Prevent duplicate initialization
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Verify DOM elements exist
      const viewer2dEl = document.getElementById(options.viewer2d.id);
      const viewer3dEl = document.getElementById(options.viewer3d.id);
      
      if (!viewer2dEl || !viewer3dEl) {
        throw new Error(`Required DOM elements not found: 2D=${!!viewer2dEl}, 3D=${!!viewer3dEl}`);
      }
      
      // Dynamic imports
      const { BlueprintJS, Configuration, configDimUnit, viewBounds, itemStatistics, dimMeter } = await import('../lib/blueprint');
      
      // Initialize configuration
      Configuration.setValue(viewBounds, 10000);
      Configuration.setValue(configDimUnit, dimMeter);
      Configuration.setValue(itemStatistics, false);

      // Create Blueprint instance
      const bp = new BlueprintJS(options);
      
      setBlueprint3d(bp);
      return bp;
    } catch (err) {
      const error = err as Error;
      setError(new Error(`Blueprint3D initialization failed: ${error.message}`));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [blueprint3d]);

  return { blueprint3d, isLoading, error, initializeBlueprint };
};

export const BlueprintViewer: React.FC<BlueprintComponentProps> = ({
  initialDesign,
  onLoad,
  onError,
  className = '',
  onBlueprintReady
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewer2dRef = useRef<HTMLDivElement>(null);
  const viewer3dRef = useRef<HTMLDivElement>(null);
  const { blueprint3d, isLoading, error, initializeBlueprint } = useBlueprintJS();

  // Blueprint3D configuration options
  const options: Blueprint3DOptions = {
    viewer2d: {
      id: 'bp3djs-viewer2d',
      viewer2dOptions: {
        'corner-radius': 12.5,
        'boundary-point-radius': 5.0,
        'boundary-line-thickness': 2.0,
        'boundary-point-color': '#030303',
        'boundary-line-color': '#090909',
        pannable: true,
        zoomable: true,
        scale: false,
        rotate: true,
        translate: true,
        dimlinecolor: '#3E0000',
        dimarrowcolor: '#FF0000',
        dimtextcolor: '#000000',
        pixiAppOptions: { resolution: 1 },
        pixiViewportOptions: { passiveWheel: false }
      },
    },
    viewer3d: {
      id: 'bp3djs-viewer3d',
      viewer3dOptions: {
        occludedWalls: false,
        occludedRoofs: false
      }
    },
    textureDir: "/models/textures/",
    widget: false,
    resize: true,
  };

  // Initialize Blueprint3D when DOM elements are ready
  useEffect(() => {
    if (!blueprint3d && viewer2dRef.current && viewer3dRef.current) {
      const timer = setTimeout(() => {
        initializeBlueprint(options)
          .then(bp => onBlueprintReady?.(bp))
          .catch(err => onError?.(err));
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [blueprint3d, initializeBlueprint, onBlueprintReady, onError]);

  // Load initial design when Blueprint3D is ready
  useEffect(() => {
    if (blueprint3d && initialDesign) {
      try {
        blueprint3d.model.loadSerialized(initialDesign);
        onLoad?.();
      } catch (err) {
        onError?.(err as Error);
      }
    }
  }, [blueprint3d, initialDesign, onLoad, onError]);

  // Forward errors to parent component
  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  if (error) {
    return (
      <div className={`blueprint-error ${className}`}>
        <div className="error-message">
          <h3>Error loading Blueprint3D</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      id="bp3d-js-app" 
      className={`blueprint-container ${className}`}
    >
      {isLoading && (
        <div className="blueprint-loading-overlay">
          <div className="loading-message">
            <h3>Loading AzPlanner...</h3>
            <div className="spinner"></div>
          </div>
        </div>
      )}
      
      <div 
        ref={viewer2dRef}
        id="bp3djs-viewer2d" 
        className="blueprint-viewer-2d"
      />
      <div 
        ref={viewer3dRef}
        id="bp3djs-viewer3d" 
        className="blueprint-viewer-3d"
      />
    </div>
  );
};

export default BlueprintViewer;