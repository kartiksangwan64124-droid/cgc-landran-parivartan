import React from 'react';
import { Building2, Calendar, Compass, Users } from 'lucide-react';
import { ActivePage } from '../../types';

interface KpiCardsProps {
  buildingsCount: number;
  upcomingEventsCount: number;
  totalRegistrationsCount: number;
  sessionRegistrationsCount: number;
  setActivePage: (page: ActivePage) => void;
}

export function KpiCards({
  buildingsCount,
  upcomingEventsCount,
  totalRegistrationsCount,
  sessionRegistrationsCount,
  setActivePage
}: KpiCardsProps) {
  const stats = [
    {
      title: 'CAMPUS BUILDINGS',
      value: `${buildingsCount} Mapped`,
      sub: 'Interactive 3D Schematic Blocks',
      icon: Building2,
      color: '#f5365c',
      action: () => setActivePage('explore')
    },
    {
      title: 'UPCOMING DEMO EVENTS',
      value: `${upcomingEventsCount} Scheduled`,
      sub: 'With 1-Click 3D Venue Locator',
      icon: Calendar,
      color: '#fb6340',
      action: () => setActivePage('events')
    },
    {
      title: 'SMART PATHWAYS',
      value: '45+ Routes',
      sub: 'Turn-by-Turn Visitor Guidance',
      icon: Compass,
      color: '#2dce89',
      action: () => setActivePage('navigation')
    },
    {
      title: 'EVENT REGISTRATIONS',
      value: `${totalRegistrationsCount} Passes`,
      sub: `${sessionRegistrationsCount} Registered in Current Session`,
      icon: Users,
      color: '#11cdef',
      action: () => setActivePage('events')
    }
  ];

  return (
    <div className="relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            onClick={stat.action}
            className="bg-white rounded-xl p-5 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] text-[#172b4d] cursor-pointer hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
                  {stat.title}
                </p>
                <h3 className="text-xl font-extrabold text-[#172b4d] mt-1">{stat.value}</h3>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md shrink-0"
                style={{ backgroundColor: stat.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-xs font-medium text-[#525f7f] flex items-center gap-1.5">
              <span className="text-[#2dce89] font-bold">● Live</span>
              <span>{stat.sub}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

