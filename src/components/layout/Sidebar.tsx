import React from 'react';
import {
  Compass,
  X,
  LayoutDashboard,
  Box,
  Navigation,
  Calendar,
  Info,
  ShieldCheck,
  Ticket
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  eventsCount: number;
  isAdminMode: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenPassModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  eventsCount,
  isAdminMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenPassModal
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* Argon Brand Header */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5e72e4] to-[#11cdef] flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-[#172b4d]">ARGON</h1>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">CGC Landran 3D</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6 space-y-1.5">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">CAMPUS PLATFORM</p>

            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white shadow-md shadow-indigo-200'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-[#5e72e4]'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard Overview
            </button>

            <button
              onClick={() => {
                setActiveTab('explore');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'explore'
                  ? 'bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white shadow-md shadow-indigo-200'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-[#5e72e4]'
              }`}
            >
              <Box className="w-5 h-5" />
              3D Campus Explorer
              <span className="ml-auto bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                3D Live
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('navigation');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'navigation'
                  ? 'bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white shadow-md shadow-indigo-200'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-[#5e72e4]'
              }`}
            >
              <Navigation className="w-5 h-5" />
              Smart Wayfinding
            </button>

            <button
              onClick={() => {
                setActiveTab('events');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white shadow-md shadow-indigo-200'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-[#5e72e4]'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Events & Festivals
              <span className="ml-auto bg-indigo-100 text-[#5e72e4] text-xs font-bold px-2 py-0.5 rounded-full">
                {eventsCount}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('about');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'about'
                  ? 'bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white shadow-md shadow-indigo-200'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-[#5e72e4]'
              }`}
            >
              <Info className="w-5 h-5" />
              About CGC Landran
            </button>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">MANAGEMENT</p>
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white shadow-md shadow-indigo-200'
                    : 'text-gray-600 hover:bg-indigo-50 hover:text-[#5e72e4]'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                Admin Portal
                {isAdminMode && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Visitor Pass Generator Widget */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-[#172b4d] to-[#2c3e50] text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2 text-indigo-300">
            <Ticket className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Campus Pass</span>
          </div>
          <p className="text-xs text-gray-300 mb-3">Visiting CGC Landran? Get your verified digital entry pass.</p>
          <button
            onClick={onOpenPassModal}
            className="w-full bg-[#5e72e4] hover:bg-[#4d60d3] text-white text-xs font-bold py-2 rounded-xl transition shadow-md"
          >
            Generate Visitor Pass
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
