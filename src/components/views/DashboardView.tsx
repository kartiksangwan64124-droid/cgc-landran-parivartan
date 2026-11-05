import React from 'react';
import {
  Box,
  Navigation,
  Building2,
  Trees,
  Flame,
  Users,
  CheckCircle2,
  ChevronRight,
  MapPin,
  CalendarDays
} from 'lucide-react';
import { CampusBuilding, CampusEvent, ActiveTab } from '../../types';

interface DashboardViewProps {
  eventsList: CampusEvent[];
  buildings: CampusBuilding[];
  onNavigateToTab: (tab: ActiveTab) => void;
  onSelectBuilding: (b: CampusBuilding) => void;
  onFindEventLocation: (e: CampusEvent) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  eventsList,
  buildings,
  onNavigateToTab,
  onSelectBuilding,
  onFindEventLocation
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
      {/* Argon Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#5e72e4] via-[#4d60d3] to-[#11cdef] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            Campus Management & Digital Twin
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-2">
            Welcome to CGC Landran Campus Explorer
          </h1>
          <p className="text-sm md:text-base text-indigo-100 leading-relaxed mb-6">
            Explore academic blocks, recreation zones, and residences across our 50+ acre campus located along
            Khapar-Banur Road. Modelled faithfully from the official campus schematic layout.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateToTab('explore')}
              className="px-6 py-3 rounded-xl bg-white text-[#5e72e4] font-bold text-sm shadow-md hover:bg-indigo-50 transition flex items-center gap-2"
            >
              <Box className="w-4 h-4" /> Launch 3D Campus
            </button>
            <button
              onClick={() => onNavigateToTab('navigation')}
              className="px-6 py-3 rounded-xl bg-[#172b4d] text-white font-bold text-sm shadow-md hover:bg-black transition flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" /> Plan a Walking Route
            </button>
          </div>
        </div>

        {/* Background Decorative Rings */}
        <div className="absolute right-[-40px] top-[-40px] w-80 h-80 rounded-full border-8 border-white/10 pointer-events-none" />
        <div className="absolute right-12 bottom-[-60px] w-64 h-64 rounded-full border-8 border-white/10 pointer-events-none" />
      </div>

      {/* 4 Argon KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Campus Blocks</p>
            <p className="text-2xl font-black text-[#172b4d] mt-1">{buildings.length} Landmarks</p>
            <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Mapped to Layout
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#5e72e4] flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Campus Area</p>
            <p className="text-2xl font-black text-[#172b4d] mt-1">50+ Acres</p>
            <p className="text-xs font-semibold text-indigo-600 mt-1">Lush & Wi-Fi Enabled</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Trees className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Events</p>
            <p className="text-2xl font-black text-[#172b4d] mt-1">{eventsList.length} Upcoming</p>
            <p className="text-xs font-semibold text-orange-600 mt-1">Parivartan Fest Soon</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Student Community</p>
            <p className="text-2xl font-black text-[#172b4d] mt-1">18,000+</p>
            <p className="text-xs font-semibold text-cyan-600 mt-1">Pan-India & Global</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Featured Events and Campus Directory Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events Column */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-[#172b4d]">Upcoming Campus Events</h2>
              <p className="text-xs text-gray-500">Live competitions, festivals, and academic conferences</p>
            </div>
            <button
              onClick={() => onNavigateToTab('events')}
              className="text-xs font-bold text-[#5e72e4] hover:underline flex items-center gap-1"
            >
              View All Schedule <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {eventsList.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 transition bg-gradient-to-r from-gray-50 to-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img src={evt.image} alt={evt.title} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${evt.badgeClass}`}>
                      {evt.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#172b4d] mt-1">{evt.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" /> {evt.venueName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5 text-gray-400" /> {evt.date}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onFindEventLocation(evt)}
                  className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#5e72e4] text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5" /> Find Venue on Map
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Key Landmarks Quick Access */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-black text-[#172b4d] mb-1">Key Landmarks</h2>
            <p className="text-xs text-gray-500 mb-4">Direct jump to major buildings on map</p>

            <div className="space-y-2">
              {buildings.slice(0, 5).map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    onSelectBuilding(b);
                    onNavigateToTab('explore');
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-indigo-50 border border-gray-100 text-left flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: b.accentColor || '#5e72e4' }}
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-800 group-hover:text-indigo-600 transition">
                        {b.shortName}
                      </p>
                      <p className="text-[10px] text-gray-400">{b.category}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transition" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-100 text-center">
            <button
              onClick={() => onNavigateToTab('explore')}
              className="text-xs font-bold text-[#5e72e4] hover:underline"
            >
              View all {buildings.length} Campus Locations &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardView;
