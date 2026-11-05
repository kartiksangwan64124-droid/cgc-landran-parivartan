import React from 'react';
import { Info, CalendarDays } from 'lucide-react';

export function SchematicNoticeBanner() {
  return (
    <div className="bg-[#11cdef]/10 border border-[#11cdef]/30 rounded-xl p-4 flex items-start sm:items-center gap-3">
      <Info className="w-5 h-5 text-[#11cdef] shrink-0 mt-0.5 sm:mt-0" />
      <div className="flex-1 text-xs text-[#525f7f]">
        <strong className="text-[#172b4d] font-bold">
          Schematic Visualization Notice:
        </strong>{' '}
        This 3D view is an interactive conceptual model created for navigation and wayfinding.
        Building dimensions and locations are schematic approximations. Refer to official
        signboards on campus for physical navigation.
      </div>
    </div>
  );
}

export function SampleEventsNoticeBanner() {
  return (
    <div className="bg-[#fb6340]/10 border border-[#fb6340]/30 rounded-xl p-4 flex items-start sm:items-center gap-3">
      <CalendarDays className="w-5 h-5 text-[#fb6340] shrink-0 mt-0.5 sm:mt-0" />
      <div className="flex-1 text-xs text-[#525f7f]">
        <strong className="text-[#172b4d] font-bold">Demonstration Notice:</strong> All
        events listed below are sample exhibition events curated for demonstration
        purposes. Administrators can manage live events using the Admin Panel.
      </div>
    </div>
  );
}

