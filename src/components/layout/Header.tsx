import React from 'react';
import {
  Menu,
  ChevronRight,
  Search,
  X,
  Info,
  Bell,
  Lock,
  Unlock
} from 'lucide-react';
import { ActivePage, CampusBuilding, CampusEvent } from '../../types';
import { KpiCards } from '../common/KpiCards';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  globalSearch: string;
  setGlobalSearch: (val: string) => void;
  globalSearchOpen: boolean;
  setGlobalSearchOpen: (val: boolean) => void;
  globalSearchResults: { buildings: CampusBuilding[]; events: CampusEvent[] };
  notificationsOpen: boolean;
  setNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  handleOpenBuildingIn3D: (buildingId: string, drawRouteFromGate?: boolean) => void;
  handleOpenEventDetails: (eventId: string) => void;
  buildingsCount: number;
  upcomingEventsCount: number;
  totalRegistrationsCount: number;
  sessionRegistrationsCount: number;
}

export function Header({
  activePage,
  setActivePage,
  setMobileSidebarOpen,
  globalSearch,
  setGlobalSearch,
  globalSearchOpen,
  setGlobalSearchOpen,
  globalSearchResults,
  notificationsOpen,
  setNotificationsOpen,
  isAdmin,
  setIsAdmin,
  showToast,
  handleOpenBuildingIn3D,
  handleOpenEventDetails,
  buildingsCount,
  upcomingEventsCount,
  totalRegistrationsCount,
  sessionRegistrationsCount
}: HeaderProps) {
  return (
    <header className="relative bg-gradient-to-r from-[#5e72e4] via-[#5e72e4] to-[#825ee4] pb-24 pt-4 px-4 sm:px-8 text-white">
      {/* Subtle Argon Decorative Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#11cdef] blur-3xl" />
        <div className="absolute top-12 left-1/3 w-64 h-64 rounded-full bg-white blur-3xl" />
      </div>

      {/* Top Navbar Row */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/15">
        {/* Left: Mobile Menu Trigger + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
              <span>ARGON Platform</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-bold capitalize">
                {activePage.replace('-', ' ')}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              CGC Landran Campus Explorer
            </h1>
          </div>
        </div>

        {/* Right: Global Search, Mode Badge, Notifications, Admin Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Global Autocomplete Search */}
          <div className="relative">
            <div className="flex items-center bg-white/95 text-[#172b4d] rounded-full px-3.5 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[#11cdef] w-48 sm:w-64 transition-all">
              <Search className="w-4 h-4 text-[#8898aa] mr-2 shrink-0" />
              <input
                type="text"
                value={globalSearch}
                onFocus={() => setGlobalSearchOpen(true)}
                onBlur={() => setTimeout(() => setGlobalSearchOpen(false), 200)}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search buildings, events..."
                className="bg-transparent text-xs font-medium text-[#172b4d] placeholder-[#8898aa] focus:outline-none w-full"
              />
              {globalSearch && (
                <button
                  type="button"
                  onClick={() => setGlobalSearch('')}
                  className="text-[#8898aa] hover:text-[#172b4d]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Global Search Dropdown */}
            {globalSearchOpen && globalSearch.trim().length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_10px_35px_rgba(50,50,93,0.2)] border border-[#e9ecef] overflow-hidden z-50 text-[#172b4d]">
                <div className="px-3.5 py-2 bg-[#f6f9fc] border-b border-[#e9ecef] text-[10px] font-bold uppercase tracking-wider text-[#8898aa]">
                  Campus Buildings ({globalSearchResults.buildings.length})
                </div>
                {globalSearchResults.buildings.length === 0 ? (
                  <div className="px-4 py-2.5 text-xs text-[#8898aa]">No matching buildings</div>
                ) : (
                  globalSearchResults.buildings.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onMouseDown={() => {
                        handleOpenBuildingIn3D(b.id, true);
                        setGlobalSearch('');
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-[#f6f9fc] flex items-center justify-between border-b border-[#f1f3f9]"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#172b4d]">{b.shortName}</p>
                        <p className="text-[11px] text-[#8898aa]">{b.category} • {b.code}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#5e72e4] uppercase">
                        3D Map →
                      </span>
                    </button>
                  ))
                )}

                <div className="px-3.5 py-2 bg-[#f6f9fc] border-b border-[#e9ecef] text-[10px] font-bold uppercase tracking-wider text-[#8898aa]">
                  Sample Events ({globalSearchResults.events.length})
                </div>
                {globalSearchResults.events.length === 0 ? (
                  <div className="px-4 py-2.5 text-xs text-[#8898aa]">No matching events</div>
                ) : (
                  globalSearchResults.events.map((ev) => (
                    <button
                      key={ev.id}
                      type="button"
                      onMouseDown={() => {
                        handleOpenEventDetails(ev.id);
                        setGlobalSearch('');
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-[#f6f9fc] flex items-center justify-between"
                    >
                      <div className="truncate pr-2">
                        <p className="text-xs font-bold text-[#172b4d] truncate">{ev.title}</p>
                        <p className="text-[11px] text-[#8898aa]">{ev.date} • {ev.category}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#fb6340] uppercase shrink-0">
                        Details →
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Schematic / Sample Mode Pill */}
          <span
            onClick={() => setActivePage('about')}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold tracking-wide cursor-pointer transition-colors"
            title="Click to read about Schematic 3D Geometry & Sample Events"
          >
            <Info className="w-3.5 h-3.5 text-[#11cdef]" />
            Schematic 3D & Demo Events
          </span>

          {/* Notification Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((prev) => !prev)}
              className="relative p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
              title="Campus Alerts & Quick Tips"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2dce89] ring-2 ring-[#5e72e4]" />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_10px_35px_rgba(50,50,93,0.2)] border border-[#e9ecef] text-[#172b4d] z-50 overflow-hidden">
                <div className="px-4 py-3 bg-[#f6f9fc] border-b border-[#e9ecef] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#172b4d]">
                    Visitor Quick Guide
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[#8898aa] hover:text-[#172b4d]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3 space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#5e72e4]/10 text-[#172b4d]">
                    <p className="font-bold text-[#5e72e4]">1. Explore in 3D</p>
                    <p className="text-[11px] text-[#525f7f] mt-0.5">
                      Click any building in the 3D Explorer to inspect facilities and walking routes.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#2dce89]/10 text-[#172b4d]">
                    <p className="font-bold text-[#2dce89]">2. Locate Event Venues</p>
                    <p className="text-[11px] text-[#525f7f] mt-0.5">
                      Click "Find Event Location" on any event to highlight its building on the 3D map.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher: Visitor vs Admin Mode */}
          <button
            type="button"
            onClick={() => {
              const next = !isAdmin;
              setIsAdmin(next);
              showToast(
                next
                  ? 'Admin Role Activated — Full Event CRUD Unlocked'
                  : 'Switched to Student / Visitor View'
              );
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
              isAdmin
                ? 'bg-[#2dce89] text-white ring-2 ring-white/50'
                : 'bg-white text-[#5e72e4] hover:bg-[#f6f9fc]'
            }`}
          >
            {isAdmin ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{isAdmin ? 'Admin Active' : 'Visitor Mode'}</span>
          </button>
        </div>
      </div>

      {/* Argon Header KPI Cards Row (Shown on Dashboard) */}
      {activePage === 'dashboard' && (
        <KpiCards
          buildingsCount={buildingsCount}
          upcomingEventsCount={upcomingEventsCount}
          totalRegistrationsCount={totalRegistrationsCount}
          sessionRegistrationsCount={sessionRegistrationsCount}
          setActivePage={setActivePage}
        />
      )}
    </header>
  );
}

