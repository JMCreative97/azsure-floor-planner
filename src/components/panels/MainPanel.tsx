import React from 'react';
import { UIPanel, PanelButton, PanelFileChooser } from '../ui';

interface MainPanelProps {
  visible: boolean;
  currentView: string;
  onSwitchViewer: () => void;
  onLoadDesign: (file: File) => void;
  onSaveDesign: () => void;
  onExportGLTF: () => void;
  onReset: () => void;
}

export const MainPanel: React.FC<MainPanelProps> = ({
  visible,
  currentView,
  onSwitchViewer,
  onLoadDesign,
  onSaveDesign,
  onExportGLTF,
  onReset
}) => {
  return (
    <UIPanel
      title="BlueprintJS"
      visible={visible}
      width={200}
      height={450}
      position={{ x: 20, y: 0 }}
    >
      <PanelButton label="Switch Viewer" onClick={onSwitchViewer} />
      <div style={{ margin: '4px 0', fontSize: '11px' }}>
        Current View: {currentView}
      </div>
      
      <PanelFileChooser
        label="Load Design"
        accept=".blueprint3d"
        onChange={onLoadDesign}
      />
      <PanelButton label="Save Design" onClick={onSaveDesign} />
      <PanelButton label="Export as GLTF" onClick={onExportGLTF} />
      <PanelButton label="Reset" onClick={onReset} />
    </UIPanel>
  );
};