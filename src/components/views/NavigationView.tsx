import React from 'react';
import { ArrowLeftRight, Box, Footprints } from 'lucide-react';
import { CampusBuilding, RouteInfo } from '../../types';

interface NavigationViewProps {
  buildings: CampusBuilding[];
  navStartId: string;
  setNavStartId: (id: string) => void;
  navEndId: string;
  setNavEndId: (id: string) => void;
  routeInfo: RouteInfo | null;
  onViewIn3D: () => void;
}

export const NavigationView: React.FC<NavigationViewProps> = ({
  buildings,
  navStartId,
  setNavStartId,
  navEndId,
  setNavEndId,
  routeInfo,
  onViewIn3D
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-black text-[#172b4d] tracking-tight">Smart Campus Wayfinding</h1>
          <p className="text-sm text-gray-500">
            Select your starting location and destination to get turn-by-turn directions along illuminated paved
            roads.
          </p>
        </div>

        {/* Wayfinding Route Configuration Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Origin */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Starting Point
              </label>
              <select
                value={navStartId}
                onChange={(e) => setNavStartId(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-[#f8f9fe] text-xs md:text-sm font-semibold text-gray-800 focus:border-[#5e72e4] outline-none"
              >
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center md:col-span-1">
              <button
                onClick={() => {
                  const temp = navStartId;
                  setNavStartId(navEndId);
                  setNavEndId(temp);
                }}
                className="p-3 rounded-xl bg-gray-100 hover:bg-indigo-50 hover:text-[#5e72e4] text-gray-600 transition shadow-sm"
                title="Swap Directions"
                aria-label="Swap directions"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* Destination */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Destination
              </label>
              <select
                value={navEndId}
                onChange={(e) => setNavEndId(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-[#f8f9fe] text-xs md:text-sm font-semibold text-gray-800 focus:border-[#5e72e4] outline-none"
              >
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Route Summary Stats */}
          {routeInfo && (
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-[10px] font-bold text-indigo-700 uppercase">Walking Distance</p>
                <p className="text-xl font-black text-[#5e72e4] mt-0.5">{routeInfo.distanceMeters} m</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-700 uppercase">Est. Walking Time</p>
                <p className="text-xl font-black text-emerald-600 mt-0.5">{routeInfo.durationMinutes} min</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
                <p className="text-[10px] font-bold text-orange-700 uppercase">Active Burn</p>
                <p className="text-xl font-black text-orange-600 mt-0.5">{routeInfo.calories} kcal</p>
              </div>
              <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-100">
                <p className="text-[10px] font-bold text-cyan-800 uppercase">Accessibility</p>
                <p className="text-sm font-black text-cyan-700 mt-1">Wheelchair Ramp Friendly</p>
              </div>
            </div>
          )}

          {/* Show on 3D Map Button */}
          <div className="mt-6">
            <button
              onClick={onViewIn3D}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white font-bold text-sm shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <Box className="w-5 h-5" /> View Animated 3D Route on Campus Map
            </button>
          </div>
        </div>

        {/* Turn-by-Turn Steps Narrative */}
        {routeInfo && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-black text-[#172b4d] mb-4 flex items-center gap-2">
              <Footprints className="w-5 h-5 text-[#5e72e4]" /> Turn-by-Turn Instructions
            </h2>

            <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
              {routeInfo.steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-8">
                  <div className="absolute left-2.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#5e72e4] border-2 border-white shadow-sm" />
                  <div>
                    <p className="text-xs md:text-sm font-bold text-gray-800">{step.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default NavigationView;
