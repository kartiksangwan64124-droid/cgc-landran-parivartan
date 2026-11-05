import React from 'react';
import { Users, CalendarDays, MapPin } from 'lucide-react';
import { CampusEvent } from '../../types';

interface EventsViewProps {
  eventsList: CampusEvent[];
  eventCategoryFilter: string;
  setEventCategoryFilter: (cat: string) => void;
  onFindEventLocation: (event: CampusEvent) => void;
  onRegisterEvent: (event: CampusEvent) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  eventsList,
  eventCategoryFilter,
  setEventCategoryFilter,
  onFindEventLocation,
  onRegisterEvent
}) => {
  const eventCategories = [
    'All',
    'Cultural & Mega Fest',
    'Technology & Coding',
    'Innovation & Science',
    'Sports & Athletics'
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#172b4d] tracking-tight">Campus Events & Fest Schedules</h1>
          <p className="text-sm text-gray-500">
            Discover upcoming hackathons, concerts, and cultural fests with instant 3D venue mapping.
          </p>
        </div>

        {/* Event Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {eventCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setEventCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                eventCategoryFilter === cat
                  ? 'bg-[#5e72e4] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsList
          .filter((e) => eventCategoryFilter === 'All' || e.category === eventCategoryFilter)
          .map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${evt.badgeClass}`}
                  >
                    {evt.category}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Users className="w-3 h-3 text-cyan-400" /> {evt.attendees}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-base font-black text-[#172b4d] leading-snug">{evt.title}</h2>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{evt.description}</p>

                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-indigo-500" />
                      <span className="font-semibold text-gray-700">{evt.date}</span> • {evt.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <span className="font-semibold text-gray-700">{evt.venueName}</span>
                    </div>
                  </div>

                  {/* Event Tags */}
                  {evt.tags && evt.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {evt.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                <button
                  onClick={() => onFindEventLocation(evt)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white text-xs font-bold hover:opacity-95 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" /> Find Venue in 3D
                </button>
                <button
                  onClick={() => onRegisterEvent(evt)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-100 transition"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default EventsView;
