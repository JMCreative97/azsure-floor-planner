# Azure Floor Planner

A modern Next.js-based floor planning application for creating 2D and 3D interior designs.

## Features

- **2D Floor Planning**: Create and edit floor plans with intuitive drawing tools
- **3D Visualization**: View your designs in interactive 3D
- **Mobile Support**: Fully responsive interface with touch controls for mobile devices
- **Item Placement**: Add furniture and fixtures to your designs
- **Export Capabilities**: Export designs in various formats including GLTF for VR applications

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Technology Stack

- **Next.js 13+** - React framework with server-side rendering
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Three.js** - 3D graphics library
- **Pixi.js** - 2D rendering engine
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
├── components/        # React components
│   ├── mobile/       # Mobile-specific UI
│   └── panels/       # Desktop panel UI
├── scripts/          # Core Blueprint3D library
│   ├── viewer2d/     # 2D viewer implementation
│   └── viewer3d/     # 3D viewer implementation
├── hooks/            # React custom hooks
├── types/            # TypeScript type definitions
└── styles/           # CSS and styling files
```

## Key Components

### Core Application
- **BlueprintApp.tsx** - Main application component
- **BlueprintViewer.tsx** - Blueprint3D React wrapper
- **MobileInterface.tsx** - Mobile UI wrapper

### Viewing Modes
- **2D Mode** - Floor planning and wall drawing
- **3D Mode** - Room visualization and item placement

### Mobile Features
- Touch-optimized controls
- Simplified interface with top/bottom toolbars
- Draw, Move, Transform, and Delete modes

## Usage

### Drawing Walls
1. Click/tap the Draw button
2. Click/tap to place first corner
3. Click/tap to place second corner and create wall
4. Continue clicking to create connected walls

### Moving Items
1. Switch to Move mode
2. Select an item
3. Drag to new position

### 3D View
- Click the 3D button to switch views
- Navigate with mouse/touch controls
- Place and arrange furniture

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License

## Acknowledgments

This project builds upon the Blueprint3D framework and uses several excellent open-source libraries:

- [Three.js](https://threejs.org/) - 3D graphics
- [Pixi.js](https://pixijs.com/) - 2D rendering
- [GSAP](https://greensock.com/gsap/) - Animation
- And many other fantastic libraries that make this project possible

## Texture Credits

Floor and wall textures sourced from [3dtextures.me](https://3dtextures.me/)