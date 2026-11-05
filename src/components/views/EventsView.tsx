import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  Filter,
  CalendarDays,
  ListFilter,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  Ticket,
  Plus
} from 'lucide-react';
import { CampusBuilding, CampusEvent, CampusCategory, ActivePage } from '../../types';
import { CAMPUS_BUILDINGS } from '../../data/buildings';
import { POSTER_THEMES } from '../../data/categories';

interface EventsViewProps {
  setActivePage: (page: ActivePage) => void;
  events: CampusEvent[];
  categories: CampusCategory[];
  eventSearch: string;
  setEventSearch: (search: string) => void;
  eventCategoryFilter: string;
  setEventCategoryFilter: (filter: string) => void;
  eventStatusFilter: string;
  setEventStatusFilter: (status: string) => void;
  eventsViewMode: 'grid' | 'calendar';
  setEventsViewMode: React.Dispatch<React.SetStateAction<'grid' | 'calendar'>>;
  handleFindEventLocation: (ev: CampusEvent) => void;
  handleOpenEventDetails: (id: string) => void;
  filteredEvents: CampusEvent[];
}

export function EventsView({
  setActivePage,
  events,
  categories,
  eventSearch,
  setEventSearch,
  eventCategoryFilter,
  setEventCategoryFilter,
  eventStatusFilter,
  setEventStatusFilter,
  eventsViewMode,
  setEventsViewMode,
  handleFindEventLocation,
  handleOpenEventDetails,
  filteredEvents
}: EventsViewProps) {
  return (
<motion.div
  key="events"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
  className="space-y-6"
>
  {/* Sample Events Notice Banner */}
  <div className="bg-white rounded-xl p-4 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] border-l-4 border-[#fb6340] flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-[#fb6340]/15 text-[#fb6340] flex items-center justify-center shrink-0">
        <Calendar className="w-5 h-5" />
      </div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#fb6340]/15 text-[#fb6340]">
          Demonstration Schedule Mode
        </span>
        <p className="text-xs text-[#525f7f] mt-0.5">
          Events shown below are sample demonstration events created to showcase the
          Argon Event Management System and 1-Click 3D Venue Locator.
        </p>
      </div>
    </div>
    <button
      type="button"
      onClick={() => setActivePage('admin')}
      className="uppercase tracking-wider text-xs font-bold px-4 py-2 rounded-lg bg-[#172b4d] hover:bg-[#2c3e6e] text-white transition-all flex items-center gap-1.5"
    >
      <Plus className="w-3.5 h-3.5" />
      Manage / Add Events
    </button>
  </div>

  {/* Search, Filter & View Toggle Controls */}
  <div className="bg-white rounded-xl p-5 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-[#8898aa] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={eventSearch}
          onChange={(e) => setEventSearch(e.target.value)}
          placeholder="Search event title, venue, organizer..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
        />
      </div>

      {/* Status Filter + View Switcher */}
      <div className="flex items-center gap-2 flex-wrap">
        {['All', 'Upcoming', 'Completed'].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setEventStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              eventStatusFilter === st
                ? 'bg-[#172b4d] text-white'
                : 'bg-[#f6f9fc] text-[#525f7f] hover:bg-[#e9ecef]'
            }`}
          >
            {st}
          </button>
        ))}

        <div className="h-5 w-px bg-[#e9ecef] mx-1" />

        <button
          type="button"
          onClick={() => setEventsViewMode('grid')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            eventsViewMode === 'grid'
              ? 'bg-[#5e72e4] text-white'
              : 'bg-[#f6f9fc] text-[#525f7f]'
          }`}
        >
          Poster Cards
        </button>
        <button
          type="button"
          onClick={() => setEventsViewMode('calendar')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            eventsViewMode === 'calendar'
              ? 'bg-[#5e72e4] text-white'
              : 'bg-[#f6f9fc] text-[#525f7f]'
          }`}
        >
          Calendar & Schedule Table
        </button>
      </div>
    </div>

    {/* Category Filter Pills */}
    <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#f1f3f9]">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mr-1">
        Categories:
      </span>
      <button
        type="button"
        onClick={() => setEventCategoryFilter('All')}
        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${
          eventCategoryFilter === 'All'
            ? 'bg-[#5e72e4] text-white'
            : 'bg-[#f6f9fc] text-[#525f7f] hover:bg-[#e9ecef]'
        }`}
      >
        All Categories
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => setEventCategoryFilter(cat.name)}
          className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${
            eventCategoryFilter === cat.name
              ? 'bg-[#5e72e4] text-white'
              : 'bg-[#f6f9fc] text-[#525f7f] hover:bg-[#e9ecef]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  </div>

  {/* Events Listing: Grid Mode vs Calendar Table Mode */}
  {filteredEvents.length === 0 ? (
    <div className="bg-white rounded-xl p-12 text-center shadow-[0_0_2rem_0_rgba(136,152,170,0.15)]">
      <Calendar className="w-12 h-12 text-[#8898aa] mx-auto mb-3 opacity-50" />
      <h3 className="text-base font-bold text-[#172b4d]">
        No Matching Events Found
      </h3>
      <p className="text-xs text-[#8898aa] mt-1">
        Try clearing your search filter or switching event categories.
      </p>
      <button
        type="button"
        onClick={() => {
          setEventSearch('');
          setEventCategoryFilter('All');
          setEventStatusFilter('All');
        }}
        className="mt-4 px-4 py-2 rounded-lg bg-[#5e72e4] text-white text-xs font-bold uppercase"
      >
        Reset Filters
      </button>
    </div>
  ) : eventsViewMode === 'grid' ? (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredEvents.map((ev) => {
        const venue = CAMPUS_BUILDINGS.find((b) => b.id === ev.venueId);
        const theme =
          POSTER_THEMES.find((t) => t.id === ev.posterTheme) || POSTER_THEMES[0];

        return (
          <div
            key={ev.id}
            className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200"
          >
            <div>
              {/* Event Visual Poster Header */}
              <div
                className={`relative h-44 bg-gradient-to-br ${theme.gradient} p-5 text-white flex flex-col justify-between overflow-hidden`}
              >
                {ev.customPosterUrl ? (
                  <img
                    src={ev.customPosterUrl}
                    alt={ev.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-55"
                  />
                ) : (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: theme.pattern }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider">
                    {ev.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/35 text-[10px] font-bold uppercase tracking-wider">
                    Sample Event • {ev.status}
                  </span>
                </div>

                <div className="relative z-10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                    {ev.date}
                  </p>
                  <h3 className="text-base font-extrabold leading-snug mt-0.5 line-clamp-2">
                    {ev.title}
                  </h3>
                </div>
              </div>

              {/* Event Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex flex-col gap-1.5 text-xs text-[#525f7f]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#5e72e4] shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#f5365c] shrink-0" />
                    <span className="font-bold text-[#172b4d]">
                      {venue?.name || 'Main Campus'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#2dce89] shrink-0" />
                    <span>{ev.registrationsCount || 0} Students Registered</span>
                  </div>
                </div>

                <p className="text-xs text-[#525f7f] line-clamp-2 leading-relaxed">
                  {ev.description}
                </p>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="px-5 py-3.5 bg-[#f6f9fc] border-t border-[#e9ecef] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleOpenEventDetails(ev.id)}
                className="px-3.5 py-2 rounded-lg bg-white border border-[#dee2e6] hover:border-[#5e72e4] text-[#172b4d] text-xs font-bold transition-colors"
              >
                Event Details
              </button>
              <button
                type="button"
                onClick={() => handleFindEventLocation(ev)}
                className="flex-1 uppercase tracking-wider text-[11px] font-bold px-3.5 py-2 rounded-lg bg-[#5e72e4] hover:bg-[#485fe0] text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                Find Event Location
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    /* Calendar & Schedule Table Mode */
    <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e9ecef]">
        <h3 className="text-sm font-bold text-[#172b4d]">
          Chronological Event Calendar & Venue Matrix
        </h3>
      </div>
      <div className="divide-y divide-[#e9ecef]">
        {filteredEvents.map((ev) => {
          const venue = CAMPUS_BUILDINGS.find((b) => b.id === ev.venueId);
          return (
            <div
              key={ev.id}
              className="p-5 hover:bg-[#f8f9fe] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#5e72e4]/10 text-[#5e72e4] flex flex-col items-center justify-center shrink-0 border border-[#5e72e4]/20">
                  <span className="text-[10px] font-bold uppercase">
                    {ev.date.split('-')[1] === '05' ? 'MAY' : 'JUN'}
                  </span>
                  <span className="text-xl font-extrabold leading-none mt-0.5">
                    {ev.date.split('-')[2] || '18'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#5e72e4]/10 text-[#5e72e4] text-[10px] font-bold uppercase">
                      {ev.category}
                    </span>
                    <span className="text-xs font-semibold text-[#8898aa]">
                      {ev.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#172b4d] mt-1">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-[#525f7f] mt-0.5">
                    Venue: <strong>{venue?.name}</strong> • Organizer: {ev.organizer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEventDetails(ev.id)}
                  className="px-3.5 py-2 rounded-lg border border-[#dee2e6] text-xs font-bold text-[#172b4d] hover:border-[#5e72e4]"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => handleFindEventLocation(ev)}
                  className="px-4 py-2 rounded-lg bg-[#2dce89] hover:bg-[#24a46d] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Find Event Location
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}
</motion.div>

  );
}
