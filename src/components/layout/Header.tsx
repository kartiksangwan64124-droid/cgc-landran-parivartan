import React from 'react';
import { Menu, Search, X, Moon, Sun } from 'lucide-react';
import { ActiveTab, ViewPreset } from '../../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isNightMode: boolean;
  setIsNightMode: (night: boolean) => void;
  activeTab: ActiveTab;
  viewPreset: ViewPreset;
  setViewPreset: (preset: ViewPreset) => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isNightMode,
  setIsNightMode,
  activeTab,
  viewPreset,
  setViewPreset,
  onOpenMobileMenu
}) => {
  return (
    <header className="h-18 min-h-[4.5rem] bg-white border-b border-gray-100 px-6 flex items-center justify-between z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Campus Search Autocomplete */}
        <div className="relative w-64 md:w-80 lg:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Block 1, Sip-n-bit, COE Ground..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs md:text-sm bg-[#f8f9fe] border border-gray-200 focus:bg-white focus:border-[#5e72e4] focus:ring-2 focus:ring-indigo-100 outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Day / Night Toggle */}
        <button
          onClick={() => setIsNightMode(!isNightMode)}
          title={isNightMode ? 'Switch to Day Mode' : 'Switch to Sunset/Night Mode'}
          className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition flex items-center gap-2 text-xs font-semibold"
        >
          {isNightMode ? (
            <>
              <Moon className="w-4 h-4 text-indigo-500" />
              <span className="hidden sm:inline">Night</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Day</span>
            </>
          )}
        </button>

        {/* Quick 3D View Presets */}
        {activeTab === 'explore' && (
          <div className="hidden md:flex items-center gap-1 bg-[#f8f9fe] p-1 rounded-xl border border-gray-200 text-xs font-semibold">
            <button
              onClick={() => setViewPreset('isometric')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewPreset === 'isometric' ? 'bg-[#5e72e4] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              3D View
            </button>
            <button
              onClick={() => setViewPreset('topdown')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewPreset === 'topdown' ? 'bg-[#5e72e4] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              2D Map View
            </button>
            <button
              onClick={() => setViewPreset('gate')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewPreset === 'gate' ? 'bg-[#5e72e4] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Entrance Gate
            </button>
          </div>
        )}

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5e72e4] to-[#2dce89] text-white font-bold text-xs flex items-center justify-center shadow-sm">
            JD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-[#172b4d]">Johan Dhamija</p>
            <p className="text-[10px] text-gray-400">Roll: 26CEC015R434</p>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
