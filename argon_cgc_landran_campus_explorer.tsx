/**
 * ============================================================================
 * CGC Landran Campus Explorer & Event Management Platform
 * ============================================================================
 *
 * NOTE: This codebase has been modularized and refactored from a single file
 * into specialized directories and files organized by their respective domain:
 *
 * 📁 src/types/             - TypeScript interface contracts & data models
 * 📁 src/config/            - Firebase initialization & environment fallback guards
 * 📁 src/data/              - Schematic campus buildings, events & category datasets
 * 📁 src/utils/             - Pathfinding algorithms & turn-by-turn walking generator
 * 📁 src/components/three/  - Interactive Three.js 3D canvas & simulation engine
 * 📁 src/components/layout/ - Navigation sidebar, header banner, search autocomplete
 * 📁 src/components/common/ - Building category icons, KPI cards, banners & toasts
 * 📁 src/components/modals/ - Visitor event registration & admin CRUD modals
 * 📁 src/components/views/  - Page views (Dashboard, Explorer, Directions, Events, etc.)
 * 📄 src/App.tsx            - Main application state orchestrator & lifecycle manager
 *
 * This entry file re-exports the main App and key components for backward
 * compatibility with existing imports and runners.
 */

import App from './src/App';

// Re-export the main application
export default App;
export { App };

// Re-export core datasets
export { CAMPUS_BUILDINGS } from './src/data/buildings';
export { INITIAL_EVENTS } from './src/data/events';
export { INITIAL_CATEGORIES, POSTER_THEMES } from './src/data/categories';

// Re-export utilities
export { computeCampusRoute } from './src/utils/routing';

// Re-export Three.js 3D Viewport
export { Campus3DViewport } from './src/components/three/Campus3DViewport';

// Re-export Layout & Common Components
export { Sidebar } from './src/components/layout/Sidebar';
export { Header } from './src/components/layout/Header';
export { KpiCards } from './src/components/common/KpiCards';
export { Toast } from './src/components/common/Toast';
export { BuildingCategoryIcon } from './src/components/common/BuildingCategoryIcon';
export {
  SchematicNoticeBanner,
  SampleEventsNoticeBanner
} from './src/components/common/TransparencyBanner';

// Re-export Page Views
export { DashboardView } from './src/components/views/DashboardView';
export { CampusExplorerView } from './src/components/views/CampusExplorerView';
export { DirectionsView } from './src/components/views/DirectionsView';
export { EventsView } from './src/components/views/EventsView';
export { EventDetailView } from './src/components/views/EventDetailView';
export { AboutView } from './src/components/views/AboutView';
export { AdminView } from './src/components/views/AdminView';

// Re-export Modals
export { EventRegistrationModal } from './src/components/modals/EventRegistrationModal';
export { EventFormModal } from './src/components/modals/EventFormModal';

// Re-export Types
export type * from './src/types';
