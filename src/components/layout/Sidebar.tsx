import React from 'react';
import {
  LayoutDashboard,
  Box,
  Compass,
  Calendar,
  Info,
  ShieldCheck,
  MapPin,
  Sparkles,
  X
} from 'lucide-react';
import { ActivePage } from '../../types';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  isAdmin: boolean;
  eventsCount: number;
  handleOpenBuildingIn3D: (buildingId: string, drawRouteFromGate?: boolean) => void;
}

export function Sidebar({
  activePage,
  setActivePage,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  isAdmin,
  eventsCount,
  handleOpenBuildingIn3D
}: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as ActivePage, label: 'Dashboard', icon: LayoutDashboard, color: '#5e72e4' },
    { id: 'explore' as ActivePage, label: '3D Campus Explorer', icon: Box, color: '#11cdef' },
    { id: 'navigation' as ActivePage, label: 'Smart Directions', icon: Compass, color: '#2dce89' },
    { id: 'events' as ActivePage, label: 'College Events', icon: Calendar, color: '#fb6340', badge: eventsCount },
    { id: 'about' as ActivePage, label: 'About CGC Landran', icon: Info, color: '#8965e0' },
    ...(isAdmin
      ? [{ id: 'admin' as ActivePage, label: 'Admin Management', icon: ShieldCheck, color: '#f5365c' }]
      : [])
  ];

  return (
    <>
      {/* =====================================================================
          ARGON FIXED LEFT SIDEBAR (DESKTOP & MOBILE DRAWER)
      ===================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Argon Brand Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-[#f1f3f9]">
          <button
            type="button"
            onClick={() => {
              setActivePage('dashboard');
              setMobileSidebarOpen(false);
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5e72e4] to-[#11cdef] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(94,114,228,0.4)] group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#172b4d]">
                  ARGON
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#5e72e4]/10 text-[#5e72e4]">
                  3D
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#8898aa] tracking-wide">
                CGC Landran Explorer
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-[#8898aa] hover:text-[#172b4d]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
            Campus Platform
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activePage === item.id ||
              (activePage === 'event-details' && item.id === 'events');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActivePage(item.id);
                  setMobileSidebarOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#f6f9fc] text-[#5e72e4] shadow-sm'
                    : 'text-[#525f7f] hover:bg-[#f8f9fe] hover:text-[#172b4d]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform"
                    style={{
                      backgroundColor: isActive ? `${item.color}18` : '#f6f9fc',
                      color: item.color
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span>{item.label}</span>
                </span>
                {isActive && (
                  <span
                    className="w-1.5 h-5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </button>
            );
          })}

          {/* Quick Campus Shortcuts Section */}
          <div className="pt-5 mt-5 border-t border-[#f1f3f9]">
            <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              Quick 3D Jump
            </p>
            {[
              { id: 'main-entrance', label: 'Main Entrance Gate', badge: 'Start' },
              { id: 'auditorium', label: 'Main Auditorium', badge: 'Events' },
              { id: 'library', label: 'Central Library', badge: 'Study' },
              { id: 'cafeteria', label: 'Student Food Court', badge: 'Dining' }
            ].map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  handleOpenBuildingIn3D(q.id, q.id !== 'main-entrance');
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#525f7f] hover:text-[#5e72e4] hover:bg-[#f6f9fc] transition-colors"
              >
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#11cdef] shrink-0" />
                  <span className="truncate">{q.label}</span>
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#f1f3f9] text-[#8898aa]">
                  {q.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer Card: Schematic Simulation Notice */}
        <div className="p-4 border-t border-[#f1f3f9]">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#172b4d] to-[#2c3e6e] text-white shadow-md">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-[#11cdef]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#11cdef]">
                Interactive 3D Tour
              </span>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed mb-3">
              New to CGC Landran? Launch the 3D Campus Explorer to inspect buildings and walking routes.
            </p>
            <button
              type="button"
              onClick={() => {
                setActivePage('explore');
                setMobileSidebarOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg bg-[#5e72e4] hover:bg-[#485fe0] text-white font-bold text-[11px] uppercase tracking-wider shadow transition-all flex items-center justify-center gap-1.5"
            >
              <Box className="w-3.5 h-3.5" />
              Open 3D Map
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-[#172b4d]/50 backdrop-blur-xs z-30 lg:hidden"
        />
      )}
    </>
  );
}

