import React from 'react';
import { motion } from 'framer-motion';
import {
  Info,
  Search,
  X,
  RotateCcw,
  Eye,
  Navigation,
  ArrowRight,
  Calendar,
  Users,
  Building2,
  MapPin,
  Check,
  Box,
  Compass,
  Clock,
  Filter,
  CheckCircle2
} from 'lucide-react';
import {
  CampusBuilding,
  CampusEvent,
  CampusCategory,
  CampusRoute,
  ActivePage
} from '../../types';
import { CAMPUS_BUILDINGS } from '../../data/buildings';
import { Campus3DViewport } from '../three/Campus3DViewport';
import { BuildingCategoryIcon } from '../common/BuildingCategoryIcon';

interface CampusExplorerViewProps {
  setActivePage: (page: ActivePage) => void;
  selectedBuildingId: string;
  setSelectedBuildingId: (id: string) => void;
  setRouteStartId: (id: string) => void;
  setRouteEndId: (id: string) => void;
  buildingSearch: string;
  setBuildingSearch: (search: string) => void;
  buildingCategory: string;
  setBuildingCategory: (category: string) => void;
  show3DLabels: boolean;
  setShow3DLabels: React.Dispatch<React.SetStateAction<boolean>>;
  cameraPresetTrigger: { type: string; ts?: number } | null | any;
  setCameraPresetTrigger: React.Dispatch<React.SetStateAction<any>>; // camera preset trigger
  highlightedEventContext: CampusEvent | null;
  setHighlightedEventContext: React.Dispatch<React.SetStateAction<CampusEvent | null>>;
  events: CampusEvent[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  handleOpenEventDetails: (id: string) => void;
  activeRoute: CampusRoute | null;
  selectedBuilding?: CampusBuilding;
  filteredBuildings: CampusBuilding[];
}

export function CampusExplorerView({
  setActivePage,
  selectedBuildingId,
  setSelectedBuildingId,
  setRouteStartId,
  setRouteEndId,
  buildingSearch,
  setBuildingSearch,
  buildingCategory,
  setBuildingCategory,
  show3DLabels,
  setShow3DLabels,
  cameraPresetTrigger,
  setCameraPresetTrigger,
  highlightedEventContext,
  setHighlightedEventContext,
  events,
  showToast,
  handleOpenEventDetails,
  activeRoute,
  selectedBuilding,
  filteredBuildings
}: CampusExplorerViewProps) {
  return (
<motion.div
  key="explore"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
  className="space-y-5"
>
  {/* Transparency Disclaimer Banner (Mandatory per instructions) */}
  <div className="bg-white rounded-xl p-4 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] border-l-4 border-[#11cdef] flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-[#11cdef]/15 text-[#11cdef] flex items-center justify-center shrink-0">
        <Info className="w-5 h-5" />
      </div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#11cdef]/15 text-[#0da5c0]">
          Schematic 3D Simulation
        </span>
        <p className="text-xs text-[#525f7f] mt-0.5">
          Uses placeholder architectural geometry and layout for interactive demonstration
          until official campus maps and reference blueprints are provided.
        </p>
      </div>
    </div>
    {highlightedEventContext && (
      <div className="flex items-center gap-2 bg-[#fb6340]/10 border border-[#fb6340]/30 px-3 py-1.5 rounded-lg">
        <Calendar className="w-4 h-4 text-[#fb6340]" />
        <span className="text-xs font-bold text-[#172b4d]">
          Event Venue Highlighted: {highlightedEventContext.title}
        </span>
        <button
          type="button"
          onClick={() => setHighlightedEventContext(null)}
          className="text-[#8898aa] hover:text-[#172b4d]"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    )}
  </div>

  {/* Top Filter & Search Bar for 3D Explorer */}
  <div className="bg-white rounded-xl p-4 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] flex flex-wrap items-center justify-between gap-4">
    {/* Search Input */}
    <div className="relative w-full md:w-72">
      <Search className="w-4 h-4 text-[#8898aa] absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={buildingSearch}
        onChange={(e) => setBuildingSearch(e.target.value)}
        placeholder="Filter buildings on 3D map..."
        className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
      />
    </div>

    {/* Category Filter Pills */}
    <div className="flex items-center gap-1.5 flex-wrap">
      {[
        'All',
        'Academic',
        'Library',
        'Auditorium',
        'Cafeteria',
        'Sports',
        'Entrance',
        'Parking'
      ].map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => setBuildingCategory(cat)}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all ${
            buildingCategory === cat
              ? 'bg-[#5e72e4] text-white shadow-xs'
              : 'bg-[#f6f9fc] text-[#525f7f] hover:bg-[#e9ecef]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* Toggle 3D Labels & Default View */}
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setShow3DLabels((prev) => !prev)}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
          show3DLabels
            ? 'bg-[#5e72e4]/10 border-[#5e72e4]/30 text-[#5e72e4]'
            : 'bg-white border-[#dee2e6] text-[#525f7f]'
        }`}
      >
        <Eye className="w-3.5 h-3.5" />
        Labels
      </button>
      <button
        type="button"
        onClick={() =>
          setCameraPresetTrigger({ type: 'default', ts: Date.now() })
        }
        className="px-3 py-1.5 rounded-lg bg-[#172b4d] text-white text-xs font-bold hover:bg-[#2c3e6e] transition-colors flex items-center gap-1.5"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Default View
      </button>
    </div>
  </div>

  {/* Main 3D Explorer Split Layout: 8 Cols 3D Viewport + 4 Cols Building Inspector */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Left 8 Cols: Interactive 3D Campus Viewport */}
    <div className="lg:col-span-8 bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] p-3 flex flex-col">
      {/* Active Route Status Bar inside 3D Card */}
      {activeRoute && (
        <div className="mb-3 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#2dce89]/15 to-[#11cdef]/15 border border-[#2dce89]/30 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <Navigation className="w-4 h-4 text-[#2dce89]" />
            <span className="font-bold text-[#172b4d]">
              Active 3D Route: {activeRoute.startBuilding.shortName} →{' '}
              {activeRoute.endBuilding.shortName}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white text-[#2dce89] font-bold text-[11px]">
              ~{activeRoute.distanceMeters}m ({activeRoute.walkMinutes} min walk)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActivePage('navigation')}
              className="text-[11px] font-bold text-[#5e72e4] hover:underline"
            >
              Step-by-Step Guide →
            </button>
            <button
              type="button"
              onClick={() => setRouteEndId('')}
              className="px-2.5 py-1 rounded bg-white text-[#f5365c] font-bold text-[11px] hover:bg-[#f5365c] hover:text-white transition-colors"
            >
              Clear Route
            </button>
          </div>
        </div>
      )}

      <Campus3DViewport
        buildings={CAMPUS_BUILDINGS}
        selectedBuildingId={selectedBuildingId}
        onSelectBuilding={(id) => {
          if (id) setSelectedBuildingId(id);
        }}
        routeData={activeRoute}
        categoryFilter={buildingCategory}
        showLabels={show3DLabels}
        heightClass="h-[540px]"
        cameraPresetTrigger={cameraPresetTrigger}
      />

      {/* Bottom Quick Building Strip */}
      <div className="mt-3 pt-2 flex items-center gap-2 overflow-x-auto pb-1">
        {filteredBuildings.map((b) => {
          const isSel = selectedBuildingId === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBuildingId(b.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                isSel
                  ? 'bg-[#5e72e4] text-white shadow-sm'
                  : 'bg-[#f6f9fc] text-[#525f7f] hover:bg-[#e9ecef]'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isSel ? '#fff' : b.color }}
              />
              <span>{b.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>

    {/* Right 4 Cols: Argon Building Inspector Panel */}
    <div className="lg:col-span-4 space-y-5">
      <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
        {/* Colored Building Header */}
        <div
          className="p-5 text-white relative overflow-hidden"
          style={{ backgroundColor: selectedBuilding.color }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-black/25 text-[10px] font-bold uppercase tracking-wider">
              {selectedBuilding.category} • {selectedBuilding.code}
            </span>
            <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded">
              {selectedBuilding.floors}
            </span>
          </div>
          <h3 className="text-lg font-extrabold leading-snug">
            {selectedBuilding.name}
          </h3>
          <p className="text-xs text-white/90 mt-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            {selectedBuilding.hours}
          </p>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-[#525f7f] leading-relaxed">
            {selectedBuilding.description}
          </p>

          {/* Beginner Navigation Tip Box */}
          <div className="p-3.5 rounded-xl bg-[#f6f9fc] border border-[#e9ecef]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#5e72e4] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Visitor Wayfinding Tip
            </p>
            <p className="text-xs text-[#172b4d] mt-1 leading-relaxed">
              {selectedBuilding.beginnerTip}
            </p>
          </div>

          {/* Route Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setRouteStartId('main-entrance');
                setRouteEndId(selectedBuilding.id);
                showToast(
                  `Route highlighted: Main Entrance → ${selectedBuilding.shortName}`
                );
              }}
              disabled={selectedBuilding.id === 'main-entrance'}
              className="col-span-2 uppercase tracking-wider text-xs font-bold px-4 py-2.5 rounded-lg bg-[#2dce89] hover:bg-[#24a46d] disabled:opacity-40 text-white shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Route Here from Main Entrance
            </button>
            <button
              type="button"
              onClick={() => {
                setRouteStartId(selectedBuilding.id);
                showToast(`Set ${selectedBuilding.shortName} as Starting Point`);
              }}
              className="uppercase tracking-wider text-[11px] font-bold px-3 py-2 rounded-lg bg-[#f6f9fc] hover:bg-[#e9ecef] text-[#172b4d] transition-colors"
            >
              Set as Start
            </button>
            <button
              type="button"
              onClick={() => {
                setRouteEndId(selectedBuilding.id);
                showToast(`Set ${selectedBuilding.shortName} as Destination`);
              }}
              className="uppercase tracking-wider text-[11px] font-bold px-3 py-2 rounded-lg bg-[#5e72e4]/10 hover:bg-[#5e72e4]/20 text-[#5e72e4] transition-colors"
            >
              Set Destination
            </button>
          </div>

          {/* Facilities List */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-2">
              Key Facilities & Rooms
            </h4>
            <ul className="space-y-1.5">
              {selectedBuilding.facilities.map((fac, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs font-medium text-[#172b4d]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2dce89] shrink-0" />
                  <span>{fac}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Events Hosted at this Building */}
          <div className="pt-3 border-t border-[#e9ecef]">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-2">
              Sample Events Hosted Here
            </h4>
            {events.filter((e) => e.venueId === selectedBuilding.id).length === 0 ? (
              <p className="text-xs text-[#8898aa]">
                No scheduled sample events in this building right now.
              </p>
            ) : (
              <div className="space-y-2">
                {events
                  .filter((e) => e.venueId === selectedBuilding.id)
                  .map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => handleOpenEventDetails(ev.id)}
                      className="p-2.5 rounded-lg bg-[#f6f9fc] hover:bg-[#eef2f9] border border-[#e9ecef] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#fb6340]">
                          {ev.category}
                        </span>
                        <span className="text-[10px] font-semibold text-[#8898aa]">
                          {ev.date}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#172b4d] mt-0.5">
                        {ev.title}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</motion.div>

  );
}
