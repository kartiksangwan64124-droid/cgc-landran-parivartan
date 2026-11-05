import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowLeftRight,
  Navigation,
  Clock,
  MapPin,
  RotateCcw,
  Map
} from 'lucide-react';
import { CampusBuilding, CampusRoute, ActivePage } from '../../types';
import { CAMPUS_BUILDINGS } from '../../data/buildings';
import { Campus3DViewport } from '../three/Campus3DViewport';

interface DirectionsViewProps {
  setActivePage: (page: ActivePage) => void;
  selectedBuildingId: string;
  setSelectedBuildingId: (id: string) => void;
  routeStartId: string;
  setRouteStartId: (id: string) => void;
  routeEndId: string;
  setRouteEndId: (id: string) => void;
  activeRoute: CampusRoute | null;
}

export function DirectionsView({
  setActivePage,
  selectedBuildingId,
  setSelectedBuildingId,
  routeStartId,
  setRouteStartId,
  routeEndId,
  setRouteEndId,
  activeRoute
}: DirectionsViewProps) {
  return (
<motion.div
  key="navigation"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
  className="space-y-6"
>
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Left 5 Cols: Smart Route Planner & Turn-by-Turn Steps */}
    <div className="lg:col-span-5 space-y-5">
      <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e9ecef] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2dce89]">
              Beginner-Friendly Wayfinding
            </span>
            <h2 className="text-base font-bold text-[#172b4d]">
              Smart Campus Route Planner
            </h2>
          </div>
          {activeRoute && (
            <button
              type="button"
              onClick={() => setRouteEndId('')}
              className="text-xs font-bold text-[#f5365c] hover:underline"
            >
              Clear Route
            </button>
          )}
        </div>

        <div className="p-6 space-y-4">
          {/* Starting Point Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1.5">
              1. Select Starting Location
            </label>
            <select
              value={routeStartId}
              onChange={(e) => setRouteStartId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] bg-[#f6f9fc] text-xs font-bold text-[#172b4d] focus:outline-none focus:border-[#5e72e4]"
            >
              {CAMPUS_BUILDINGS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.shortName} ({b.code})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Start & Destination Button */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                if (!routeEndId) return;
                const temp = routeStartId;
                setRouteStartId(routeEndId);
                setRouteEndId(temp);
              }}
              className="px-3 py-1 rounded-full bg-[#f6f9fc] hover:bg-[#e9ecef] text-[#525f7f] text-[11px] font-bold flex items-center gap-1.5 border border-[#e9ecef] transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#5e72e4]" />
              Swap Start & Destination
            </button>
          </div>

          {/* Destination Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1.5">
              2. Select Destination Building
            </label>
            <select
              value={routeEndId}
              onChange={(e) => {
                setRouteEndId(e.target.value);
                if (e.target.value) setSelectedBuildingId(e.target.value);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] bg-white text-xs font-bold text-[#172b4d] focus:outline-none focus:border-[#5e72e4]"
            >
              <option value="">-- Choose a Campus Destination --</option>
              {CAMPUS_BUILDINGS.filter((b) => b.id !== routeStartId).map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.category})
                </option>
              ))}
            </select>
          </div>

          {/* Popular Beginner Presets */}
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-2">
              Popular Visitor Routes from Main Entrance:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'auditorium', label: 'To Auditorium' },
                { id: 'block-1', label: 'To Engg Block 1' },
                { id: 'block-2', label: 'To IT Block 2' },
                { id: 'library', label: 'To Central Library' },
                { id: 'cafeteria', label: 'To Cafeteria' }
              ].map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setRouteStartId('main-entrance');
                    setRouteEndId(preset.id);
                    setSelectedBuildingId(preset.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    routeStartId === 'main-entrance' && routeEndId === preset.id
                      ? 'bg-[#2dce89] text-white'
                      : 'bg-[#f6f9fc] text-[#525f7f] hover:bg-[#e9ecef]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Walking Directions Card */}
      <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e9ecef] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#172b4d]">
            Step-by-Step Walking Directions
          </h3>
          {activeRoute && (
            <span className="px-2.5 py-1 rounded-full bg-[#2dce89]/15 text-[#2dce89] text-[11px] font-bold">
              ~{activeRoute.distanceMeters}m • {activeRoute.walkMinutes} min walk
            </span>
          )}
        </div>

        <div className="p-6">
          {!activeRoute ? (
            <div className="text-center py-8">
              <Compass className="w-10 h-10 text-[#8898aa] mx-auto mb-2 opacity-60" />
              <p className="text-sm font-bold text-[#172b4d]">
                No Destination Selected Yet
              </p>
              <p className="text-xs text-[#8898aa] mt-1 max-w-xs mx-auto">
                Choose any destination above or click a popular route preset to view
                turn-by-turn campus walking instructions and 3D pathway highlighting.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeRoute.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                      index === 0
                        ? 'bg-[#5e72e4] text-white'
                        : index === activeRoute.steps.length - 1
                        ? 'bg-[#2dce89] text-white'
                        : 'bg-[#f6f9fc] text-[#5e72e4] border border-[#dee2e6]'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 pb-3 border-b border-[#f1f3f9] last:border-none last:pb-0">
                    <h4 className="text-xs font-bold text-[#172b4d]">{step.title}</h4>
                    <p className="text-xs text-[#525f7f] mt-0.5 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Right 7 Cols: Embedded 3D Route Map & Destination Summary */}
    <div className="lg:col-span-7 space-y-5">
      <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e9ecef] flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e72e4]">
              3D Pathway Visualization
            </span>
            <h3 className="text-sm font-bold text-[#172b4d]">
              Highlighted Campus Route Map
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActivePage('explore')}
            className="uppercase tracking-wider text-[11px] font-bold px-3.5 py-1.5 rounded-lg bg-[#5e72e4] text-white hover:bg-[#485fe0] transition-all"
          >
            Open Full 3D Explorer
          </button>
        </div>
        <div className="p-3">
          <Campus3DViewport
            buildings={CAMPUS_BUILDINGS}
            selectedBuildingId={routeEndId || routeStartId}
            onSelectBuilding={(id) => {
              if (id && id !== routeStartId) {
                setRouteEndId(id);
                setSelectedBuildingId(id);
              }
            }}
            routeData={activeRoute}
            heightClass="h-[460px]"
          />
        </div>
        <div className="px-6 py-3 bg-[#f6f9fc] border-t border-[#e9ecef] text-xs text-[#525f7f] flex items-center justify-between">
          <span>
            Tip: Click any building directly on the 3D map to set it as your destination!
          </span>
          <span className="font-bold text-[#2dce89]">● Glowing Path Active</span>
        </div>
      </div>
    </div>
  </div>
</motion.div>

  );
}
