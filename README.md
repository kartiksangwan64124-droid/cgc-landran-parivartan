# CGC Landran Campus Explorer & Event Management

An interactive 3D campus navigation, visitor orientation, and college event management platform for **Chandigarh Group of Colleges (CGC) Landran**, featuring an authentic Argon design system.

---

## 🌐 Live Access Links

- **Public Internet URL (Worldwide)**: [https://cgc-landran-campus.loca.lt](https://cgc-landran-campus.loca.lt)  
  *(For first-time visitors: Click **"Click to Submit"** or enter Host IP `124.253.7.134` if prompted by the security check).*
- **Local Wi-Fi Network**: [http://192.168.18.61:4173](http://192.168.18.61:4173) *(Accessible to anyone on the same Wi-Fi).*

---

## 📁 Project Architecture & File Organization

The application has been modularized and sorted from a single monolithic file into a clean, scalable folder structure where each file and directory has a clear, dedicated responsibility:

```
collage event management/
├── index.html                           # Web entry point with Tailwind & Google fonts
├── package.json                         # Dependencies, scripts (dev, build, preview, tunnel)
├── tsconfig.json                        # TypeScript path mapping & config
├── vite.config.ts                       # Vite build configuration with '@' alias
├── README.md                            # Comprehensive project documentation
├── argon_cgc_landran_campus_explorer.tsx # Root compatibility re-export entry
├── scripts/
│   └── tunnel.js                        # Persistent localtunnel auto-reconnect daemon
│
└── src/
    ├── main.tsx                         # React 18/19 DOM root mount
    ├── App.tsx                          # Core application state orchestrator
    ├── index.css                        # Global styles & scrollbar design
    │
    ├── types/                           # TypeScript interfaces & domain models
    │   └── index.ts                     # CampusBuilding, CampusEvent, Route, Ticket, etc.
    │
    ├── config/                          # Configurations & external services
    │   └── firebase.ts                  # Firebase auth & Firestore sync with fallback
    │
    ├── data/                            # Schematics & mock datasets
    │   ├── buildings.ts                 # 3D building coordinates, dimensions & metadata
    │   ├── categories.ts                # Event categories & curated poster themes
    │   └── events.ts                    # Initial campus events schedule
    │
    ├── utils/                           # Algorithms & routing logic
    │   └── routing.ts                   # 3D pathway pathfinding & turn-by-turn steps
    │
    └── components/
        ├── three/                       # Three.js 3D simulation engine
        │   └── Campus3DViewport.tsx     # 3D canvas, orbit controls, buildings & routes
        │
        ├── layout/                      # Global UI layout & shell
        │   ├── Sidebar.tsx              # Argon fixed navigation sidebar & shortcuts
        │   └── Header.tsx               # Top gradient hero banner, search & role switcher
        │
        ├── common/                      # Reusable UI widgets
        │   ├── BuildingCategoryIcon.tsx # Dynamic Lucide category icon mapper
        │   ├── KpiCards.tsx             # Header KPI summary cards
        │   ├── Toast.tsx                # Floating status notifications
        │   └── TransparencyBanner.tsx   # Schematic 3D and demo notices
        │
        ├── modals/                      # Popups & dialogs
        │   ├── EventRegistrationModal.tsx # Visitor event pass generator modal
        │   └── EventFormModal.tsx       # Admin create / edit event modal
        │
        └── views/                       # Individual application tabs & pages
            ├── DashboardView.tsx        # Overview dashboard with hero & mini 3D map
            ├── CampusExplorerView.tsx   # Full 3D Campus Explorer & Building Inspector
            ├── DirectionsView.tsx       # Smart route planner & walking guide
            ├── EventsView.tsx           # College events listing (Grid / Calendar)
            ├── EventDetailView.tsx      # Event poster, agenda & embedded registration
            ├── AboutView.tsx            # About CGC Landran & platform pillars
            └── AdminView.tsx            # Event management CRUD table & categories
```

---

## 🚀 Running & Sharing the Project

### 1. Development Mode
```bash
npm run dev
```

### 2. Production Build
```bash
npm run build
```

### 3. Share with Anyone (Public Tunnel)
```bash
# Terminal 1: Serve production preview
npm run preview

# Terminal 2: Generate public link
npm run tunnel
```
