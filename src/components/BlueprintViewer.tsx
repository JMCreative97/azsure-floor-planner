'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BlueprintComponentProps, Blueprint3DOptions, BlueprintJS } from '../types/blueprint';

// Dynamic imports for client-side only libraries
const useBlueprintJS = () => {
  const [blueprint3d, setBlueprint3d] = useState<BlueprintJS | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initializeBlueprint = useCallback(async (options: Blueprint3DOptions) => {
    setIsLoading(true);
    try {
      // Dynamic imports to avoid SSR issues
      const { BlueprintJS, Configuration, configDimUnit, viewBounds, itemStatistics, dimMeter } = await import('../lib/blueprint');
      
      // Initialize configuration
      Configuration.setValue(viewBounds, 10000); // In CMS
      Configuration.setValue(configDimUnit, dimMeter);
      Configuration.setValue(itemStatistics, false);

      // Create Blueprint instance
      const bp = new BlueprintJS(options);
      
      setBlueprint3d(bp);
      setIsLoading(false);
      return bp;
    } catch (err) {
      const error = err as Error;
      setError(new Error(`Blueprint3D initialization failed: ${error.message}`));
      setIsLoading(false);
    }
  }, []);

  return { blueprint3d, isLoading, error, initializeBlueprint, setError };
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
  const { blueprint3d, isLoading, error, initializeBlueprint, setError } = useBlueprintJS();

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
        pixiAppOptions: {
          resolution: 1,
        },
        pixiViewportOptions: {
          passiveWheel: false,
        }
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

  useEffect(() => {
    // Only initialize if we have the container and haven't initialized yet
    if (containerRef.current && !blueprint3d) {
      // Use setTimeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const viewer2dElement = document.getElementById('bp3djs-viewer2d');
        const viewer3dElement = document.getElementById('bp3djs-viewer3d');
        
        if (viewer2dElement && viewer3dElement) {
          initializeBlueprint(options).then((bp) => {
            if (bp && onBlueprintReady) {
              onBlueprintReady(bp);
            }
          });
        } else {
          setError(new Error('Blueprint3D DOM elements not found'));
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [blueprint3d, initializeBlueprint, options, onBlueprintReady]);

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

  if (isLoading) {
    return (
      <div className={`blueprint-loading ${className}`}>
        <div className="loading-message">
          <h3>Loading Blueprint3D...</h3>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      id="bp3d-js-app" 
      className={`blueprint-container ${className}`}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <div 
        ref={viewer2dRef}
        id="bp3djs-viewer2d" 
        className="blueprint-viewer-2d"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      <div 
        ref={viewer3dRef}
        id="bp3djs-viewer3d" 
        className="blueprint-viewer-3d"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default BlueprintViewer;