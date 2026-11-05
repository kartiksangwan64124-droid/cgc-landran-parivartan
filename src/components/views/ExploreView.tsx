import React from 'react';
import {
  X,
  HelpCircle,
  Navigation
} from 'lucide-react';
import { CampusBuilding, CampusEvent, ViewPreset } from '../../types';
import { Campus3DViewport } from '../three/Campus3DViewport';

interface ExploreViewProps {
  categories: string[];
  activeCategoryFilter: string;
  setActiveCategoryFilter: (cat: string) => void;
  buildings: CampusBuilding[];
  selectedBuilding: CampusBuilding | null;
  setSelectedBuilding: (b: CampusBuilding | null) => void;
  activeRoutePath: string[] | null;
  viewPreset: ViewPreset;
  isNightMode: boolean;
  eventsList: CampusEvent[];
  onQuickNavigateTo: (building: CampusBuilding) => void;
  onSelectEvent: (event: CampusEvent) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  categories,
  activeCategoryFilter,
  setActiveCategoryFilter,
  buildings,
  selectedBuilding,
  setSelectedBuilding,
  activeRoutePath,
  viewPreset,
  isNightMode,
  eventsList,
  onQuickNavigateTo,
  onSelectEvent
}) => {
  return (
    <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col md:flex-row">
      {/* Category Filter Pills (Top Floating) */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-[calc(100%-6rem)]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-md backdrop-blur-md ${
              activeCategoryFilter === cat
                ? 'bg-[#5e72e4] text-white'
                : 'bg-white/95 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Canvas Viewport */}
      <div className="flex-1 w-full h-full relative">
        <Campus3DViewport
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          onSelectBuilding={(b) => setSelectedBuilding(b)}
          routePath={activeRoutePath}
          viewPreset={viewPreset}
          isNightMode={isNightMode}
          activeFilter={activeCategoryFilter}
        />
      </div>

      {/* Slide-In Argon Building Details Card */}
      {selectedBuilding && (
        <div className="w-full md:w-96 lg:w-[410px] bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col h-auto md:h-full max-h-[45vh] md:max-h-full shadow-2xl z-30 overflow-y-auto">
          <div className="p-5 border-b border-gray-100 flex items-start justify-between bg-gradient-to-r from-gray-50 to-white">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {selectedBuilding.code}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  {selectedBuilding.category}
                </span>
              </div>
              <h2 className="text-lg font-black text-[#172b4d] tracking-tight">{selectedBuilding.name}</h2>
            </div>
            <button
              onClick={() => setSelectedBuilding(null)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Close building details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-5 flex-1">
            {/* Quick Info Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase">Floors / Capacity</p>
                <p className="font-bold text-gray-800 mt-0.5">{selectedBuilding.floors}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase">Operational Hours</p>
                <p className="font-bold text-gray-800 mt-0.5">{selectedBuilding.hours}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">About Landmark</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{selectedBuilding.description}</p>
            </div>

            {/* Beginner Navigation Advice */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold mb-1">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                Visitor Finding Guide
              </div>
              <p className="text-xs text-amber-900 leading-normal">{selectedBuilding.beginnerTip}</p>
            </div>

            {/* Facilities & Amenities */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Facilities</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedBuilding.facilities.map((fac: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    {fac}
                  </span>
                ))}
              </div>
            </div>

            {/* Events happening at this building */}
            {eventsList.some((e) => e.venueId === selectedBuilding.id) && (
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Upcoming Events Here</h3>
                <div className="space-y-2">
                  {eventsList
                    .filter((e) => e.venueId === selectedBuilding.id)
                    .map((evt) => (
                      <div
                        key={evt.id}
                        className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#172b4d]">{evt.title}</p>
                          <p className="text-[11px] text-indigo-700">{evt.date}</p>
                        </div>
                        <button
                          onClick={() => onSelectEvent(evt)}
                          className="text-xs font-bold text-[#5e72e4] hover:underline"
                        >
                          View
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => onQuickNavigateTo(selectedBuilding)}
              className="w-full bg-gradient-to-r from-[#5e72e4] to-[#825ee4] hover:opacity-95 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-sm transition"
            >
              <Navigation className="w-4 h-4" />
              Navigate to {selectedBuilding.shortName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ExploreView;
