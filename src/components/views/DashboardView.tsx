import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Box,
  Compass,
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  ExternalLink,
  Ticket,
  CheckCircle2,
  ChevronRight,
  CalendarDays,
  Map,
  Building2,
  Navigation
} from 'lucide-react';
import { BuildingCategoryIcon } from '../common/BuildingCategoryIcon';
import { CampusBuilding, CampusEvent, CampusRoute, ActivePage } from '../../types';
import { CAMPUS_BUILDINGS } from '../../data/buildings';
import { Campus3DViewport } from '../three/Campus3DViewport';

interface DashboardViewProps {
  setActivePage: (page: ActivePage) => void;
  selectedBuildingId: string;
  setSelectedBuildingId: (id: string) => void;
  buildingSearch: string;
  setBuildingSearch: (search: string) => void;
  events: CampusEvent[];
  handleFindEventLocation: (ev: CampusEvent) => void;
  handleOpenBuildingIn3D: (id: string, drawRouteFromGate?: boolean) => void;
  handleOpenEventDetails: (id: string) => void;
  activeRoute: CampusRoute | null;
  selectedBuilding?: CampusBuilding;
}

export function DashboardView({
  setActivePage,
  selectedBuildingId,
  setSelectedBuildingId,
  buildingSearch,
  setBuildingSearch,
  events,
  handleFindEventLocation,
  handleOpenBuildingIn3D,
  handleOpenEventDetails,
  activeRoute,
  selectedBuilding
}: DashboardViewProps) {
  return (
<motion.div
  key="dashboard"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
  className="space-y-6"
>
  {/* Welcome Hero & 3D Campus Launch Card */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Left 7 Cols: Welcome to CGC Landran Campus Explorer */}
    <div className="lg:col-span-7 bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden flex flex-col justify-between">
      <div className="p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5e72e4]/10 text-[#5e72e4] text-[11px] font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Campus Exploration & Event Locator
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172b4d] tracking-tight leading-tight">
          Welcome to CGC Landran Campus Explorer
        </h2>
        <p className="mt-3 text-sm text-[#525f7f] leading-relaxed">
          Designed for visiting school students, newly admitted freshers, parents, and
          guests. Virtually tour our campus blocks in 3D, calculate step-by-step walking
          routes from the Main Entrance, and locate upcoming college event venues in one
          click.
        </p>

        {/* Prominent Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActivePage('explore')}
            className="uppercase tracking-wider text-xs font-bold px-5 py-3 rounded-lg bg-[#5e72e4] hover:bg-[#485fe0] text-white shadow-[0_4px_6px_rgba(50,50,93,0.11),0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Box className="w-4 h-4" />
            Open 3D Campus Explorer
          </button>
          <button
            type="button"
            onClick={() => setActivePage('navigation')}
            className="uppercase tracking-wider text-xs font-bold px-5 py-3 rounded-lg bg-[#2dce89] hover:bg-[#24a46d] text-white shadow-[0_4px_6px_rgba(50,50,93,0.11),0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Plan Campus Route
          </button>
          <button
            type="button"
            onClick={() => setActivePage('events')}
            className="uppercase tracking-wider text-xs font-bold px-4 py-3 rounded-lg bg-[#f6f9fc] hover:bg-[#e9ecef] text-[#172b4d] transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#fb6340]" />
            Events Schedule
          </button>
        </div>
      </div>

      {/* Quick Location Search Bar inside Welcome Card */}
      <div className="px-6 py-4 bg-[#f6f9fc] border-t border-[#e9ecef]">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-2">
          Quick Destination Search & Instant 3D Route
        </label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8898aa] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={buildingSearch}
              onChange={(e) => setBuildingSearch(e.target.value)}
              placeholder="Search Academic Block 1, Library, Auditorium, Cafeteria..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-[#dee2e6] text-xs font-medium text-[#172b4d] focus:outline-none focus:border-[#5e72e4]"
            />
          </div>
          <button
            type="button"
            onClick={() => setActivePage('explore')}
            className="uppercase tracking-wider text-xs font-bold px-4 py-2.5 rounded-lg bg-[#172b4d] hover:bg-[#2c3e6e] text-white transition-all shrink-0"
          >
            Search on 3D Map
          </button>
        </div>

        {/* Quick Shortcut Chips */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-[#8898aa]">Shortcuts:</span>
          {CAMPUS_BUILDINGS.slice(0, 6).map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => handleOpenBuildingIn3D(b.id, true)}
              className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-[#e9ecef] text-[#525f7f] hover:border-[#5e72e4] hover:text-[#5e72e4] transition-colors flex items-center gap-1"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: b.color }}
              />
              {b.shortName}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Right 5 Cols: Live Interactive 3D Campus Mini-Viewport Card */}
    <div className="lg:col-span-5 bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#e9ecef] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#11cdef]">
            Live WebGL Preview
          </span>
          <h3 className="text-sm font-bold text-[#172b4d]">
            Interactive 3D Campus Simulation
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setActivePage('explore')}
          className="uppercase tracking-wider text-[11px] font-bold px-3 py-1.5 rounded-lg bg-[#5e72e4] text-white hover:bg-[#485fe0] transition-all flex items-center gap-1"
        >
          Full Screen <ExternalLink className="w-3 h-3" />
        </button>
      </div>
      <div className="p-3 flex-1">
        <Campus3DViewport
          buildings={CAMPUS_BUILDINGS}
          selectedBuildingId={selectedBuildingId}
          onSelectBuilding={(id) => {
            if (id) setSelectedBuildingId(id);
          }}
          routeData={activeRoute}
          heightClass="h-[290px]"
        />
      </div>
      <div className="px-5 py-3 bg-[#f6f9fc] border-t border-[#e9ecef] flex items-center justify-between text-xs">
        <span className="font-semibold text-[#525f7f] truncate">
          Selected: <strong className="text-[#172b4d]">{selectedBuilding.shortName}</strong>
        </span>
        <button
          type="button"
          onClick={() => handleOpenBuildingIn3D(selectedBuilding.id, true)}
          className="font-bold text-[#5e72e4] hover:underline shrink-0"
        >
          Inspect & Route →
        </button>
      </div>
    </div>
  </div>

  {/* Quick Navigation Shortcuts Grid */}
  <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
    <div className="px-6 py-4 border-b border-[#e9ecef] flex flex-wrap items-center justify-between gap-2">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
          Campus Directory
        </span>
        <h3 className="text-base font-bold text-[#172b4d]">
          Explore Key Campus Destinations
        </h3>
      </div>
      <button
        type="button"
        onClick={() => setActivePage('navigation')}
        className="text-xs font-bold text-[#5e72e4] hover:text-[#485fe0] flex items-center gap-1"
      >
        Open Smart Route Planner <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>

    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {CAMPUS_BUILDINGS.map((b) => (
        <div
          key={b.id}
          onClick={() => handleOpenBuildingIn3D(b.id, b.id !== 'main-entrance')}
          className="group p-4 rounded-xl border border-[#e9ecef] hover:border-[#5e72e4] bg-[#f8f9fe]/60 hover:bg-white hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: b.color }}
              >
                <BuildingCategoryIcon category={b.category} className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#e9ecef] text-[#525f7f]">
                {b.code}
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#172b4d] group-hover:text-[#5e72e4] transition-colors line-clamp-1">
              {b.shortName}
            </h4>
            <p className="text-[11px] text-[#8898aa] mt-1 line-clamp-2">
              {b.description}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#e9ecef] flex items-center justify-between text-[11px] font-bold text-[#5e72e4]">
            <span>Locate in 3D</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Featured & Upcoming Events Table / Cards */}
  <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
    <div className="px-6 py-4 border-b border-[#e9ecef] flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#fb6340]">
            Campus Schedule
          </span>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase bg-[#fb6340]/10 text-[#fb6340]">
            Sample Demonstration Events
          </span>
        </div>
        <h3 className="text-base font-bold text-[#172b4d]">
          Upcoming & Featured College Events
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActivePage('events')}
          className="uppercase tracking-wider text-xs font-bold px-4 py-2 rounded-lg bg-[#5e72e4] text-white hover:bg-[#485fe0] transition-all"
        >
          View All Events ({events.length})
        </button>
      </div>
    </div>

    {/* Argon Responsive Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#e9ecef] bg-[#f6f9fc]">
            <th className="py-3.5 px-6 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              Event Title & Organizer
            </th>
            <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              Category
            </th>
            <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              Date & Time
            </th>
            <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              Campus Venue
            </th>
            <th className="py-3.5 px-6 text-right text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e9ecef] text-xs">
          {events.slice(0, 5).map((ev) => {
            const venue = CAMPUS_BUILDINGS.find((b) => b.id === ev.venueId);
            return (
              <tr key={ev.id} className="hover:bg-[#f8f9fe] transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#5e72e4]/10 text-[#5e72e4] flex items-center justify-center font-bold shrink-0">
                      <CalendarDays className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEventDetails(ev.id)}
                          className="font-bold text-[#172b4d] hover:text-[#5e72e4] text-left"
                        >
                          {ev.title}
                        </button>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#8898aa]/15 text-[#525f7f]">
                          Sample
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8898aa] mt-0.5">
                        {ev.organizer}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-[#5e72e4]/10 text-[#5e72e4]">
                    {ev.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-[#525f7f]">
                  <p className="font-bold text-[#172b4d]">{ev.date}</p>
                  <p className="text-[11px]">{ev.time}</p>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#172b4d]">
                    <MapPin className="w-3.5 h-3.5 text-[#f5365c]" />
                    {venue?.shortName || 'Main Campus'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEventDetails(ev.id)}
                      className="px-3 py-1.5 rounded-lg border border-[#dee2e6] hover:border-[#5e72e4] text-[#172b4d] font-bold text-[11px] transition-colors"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFindEventLocation(ev)}
                      className="px-3 py-1.5 rounded-lg bg-[#2dce89] hover:bg-[#24a46d] text-white font-bold text-[11px] uppercase tracking-wider shadow-xs transition-all flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Find Event Location
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</motion.div>

  );
}
