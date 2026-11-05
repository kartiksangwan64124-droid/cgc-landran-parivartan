import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  ExternalLink,
  Box,
  Navigation,
  Map
} from 'lucide-react';
import {
  CampusBuilding,
  CampusEvent,
  ActivePage,
  VisitorRegForm,
  VisitorTicket
} from '../../types';
import { CAMPUS_BUILDINGS } from '../../data/buildings';
import { POSTER_THEMES } from '../../data/categories';

interface EventDetailViewProps {
  setActivePage: (page: ActivePage) => void;
  events: CampusEvent[];
  regForm: VisitorRegForm;
  setRegForm: React.Dispatch<React.SetStateAction<VisitorRegForm>>;
  latestTicket: VisitorTicket | null;
  setLatestTicket: React.Dispatch<React.SetStateAction<VisitorTicket | null>>;
  setRegModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFindEventLocation: (ev: CampusEvent) => void;
  handleEventRegistration: (e: React.FormEvent) => void;
  selectedEvent: CampusEvent;
}

export function EventDetailView({
  setActivePage,
  events,
  regForm,
  setRegForm,
  latestTicket,
  setLatestTicket,
  setRegModalOpen,
  handleFindEventLocation,
  handleEventRegistration,
  selectedEvent
}: EventDetailViewProps) {
  const venue = CAMPUS_BUILDINGS.find((b) => b.id === selectedEvent.venueId);

  return (
<motion.div
  key="event-details"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
  className="space-y-6"
>
  {/* Back Button */}
  <div className="flex items-center justify-between">
    <button
      type="button"
      onClick={() => setActivePage('events')}
      className="px-4 py-2 rounded-lg bg-white text-[#172b4d] text-xs font-bold shadow-sm hover:bg-[#f6f9fc] flex items-center gap-2"
    >
      ← Back to Events Schedule
    </button>
    <span className="px-3 py-1 rounded-full bg-white text-[#fb6340] text-xs font-bold shadow-sm">
      Sample Demonstration Event
    </span>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Left 8 Cols: Event Poster, Overview, Agenda & Venue Card */}
    <div className="lg:col-span-8 space-y-6">
      <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
        {/* Large Event Poster Banner */}
        {(() => {
          const theme =
            POSTER_THEMES.find((t) => t.id === selectedEvent.posterTheme) ||
            POSTER_THEMES[0];
          const venue = CAMPUS_BUILDINGS.find((b) => b.id === selectedEvent.venueId);
          return (
            <div
              className={`relative p-8 sm:p-10 bg-gradient-to-br ${theme.gradient} text-white overflow-hidden`}
            >
              {selectedEvent.customPosterUrl && (
                <img
                  src={selectedEvent.customPosterUrl}
                  alt={selectedEvent.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              )}
              <div className="relative z-10 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                    {selectedEvent.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/30 text-xs font-bold uppercase tracking-wider">
                    {selectedEvent.status} • Sample Event
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  {selectedEvent.title}
                </h2>
                <p className="mt-2 text-sm text-white/90">
                  Organized by <strong>{selectedEvent.organizer}</strong>
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5 bg-white/15 px-3.5 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-[#11cdef]" />
                    {selectedEvent.date}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/15 px-3.5 py-2 rounded-lg">
                    <Clock className="w-4 h-4 text-[#2dce89]" />
                    {selectedEvent.time}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/15 px-3.5 py-2 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#fb6340]" />
                    {venue?.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRegModalOpen(true)}
                    className="flex items-center gap-1.5 bg-[#2dce89] hover:bg-[#24a46d] text-white px-4 py-2 rounded-lg shadow-md transition-all uppercase tracking-wider"
                  >
                    <Ticket className="w-4 h-4" />
                    Open Visitor Registration Modal
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="p-6 sm:p-8 space-y-6">
          {/* Prominent Find Event Location CTA Box */}
          {(() => {
            const venue = CAMPUS_BUILDINGS.find(
              (b) => b.id === selectedEvent.venueId
            );
            return (
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#5e72e4]/10 via-[#11cdef]/10 to-[#2dce89]/10 border border-[#5e72e4]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e72e4]">
                    3D Campus Venue Locator
                  </span>
                  <h3 className="text-base font-bold text-[#172b4d] mt-0.5">
                    Venue: {venue?.name} ({venue?.code})
                  </h3>
                  <p className="text-xs text-[#525f7f] mt-0.5">
                    {venue?.beginnerTip}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleFindEventLocation(selectedEvent)}
                  className="uppercase tracking-wider text-xs font-bold px-5 py-3 rounded-lg bg-[#5e72e4] hover:bg-[#485fe0] text-white shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                  Find Event Location on 3D Map
                </button>
              </div>
            );
          })()}

          {/* Event Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8898aa] mb-2">
              About This Event
            </h4>
            <p className="text-sm text-[#525f7f] leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>

          {/* Event Schedule Agenda */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8898aa] mb-3">
              Event Schedule & Session Agenda
            </h4>
            <div className="space-y-2.5">
              {(selectedEvent.agenda || []).map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-[#f6f9fc] border border-[#e9ecef] flex items-center gap-3 text-xs font-semibold text-[#172b4d]"
                >
                  <span className="w-6 h-6 rounded-full bg-[#5e72e4] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right 4 Cols: Visitor & Student Registration Form */}
    <div className="lg:col-span-4 space-y-5">
      <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
        <div className="px-6 py-4 bg-[#f6f9fc] border-b border-[#e9ecef]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2dce89]">
            Instant Visitor Pass
          </span>
          <h3 className="text-base font-bold text-[#172b4d]">
            Register for This Event
          </h3>
        </div>

        <div className="p-6">
          {latestTicket ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#2dce89]/10 border border-[#2dce89]/30 text-center">
                <CheckCircle2 className="w-10 h-10 text-[#2dce89] mx-auto mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2dce89]">
                  Registration Confirmed
                </span>
                <h4 className="text-base font-extrabold text-[#172b4d] mt-1">
                  Pass ID: {latestTicket.id}
                </h4>
                <p className="text-xs text-[#525f7f] mt-1">
                  Attendee: <strong>{latestTicket.fullName}</strong> (
                  {latestTicket.visitorType})
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleFindEventLocation(selectedEvent)}
                className="w-full uppercase tracking-wider text-xs font-bold px-4 py-3 rounded-lg bg-[#5e72e4] text-white hover:bg-[#485fe0] transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Navigate to Event Venue in 3D
              </button>

              <button
                type="button"
                onClick={() => setLatestTicket(null)}
                className="w-full text-xs font-bold text-[#8898aa] hover:text-[#172b4d] py-1"
              >
                Register Another Visitor
              </button>
            </div>
          ) : (
            <form onSubmit={handleEventRegistration} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={regForm.fullName}
                  onChange={(e) =>
                    setRegForm((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  placeholder="e.g. Rohan Sharma"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                  Visitor Category
                </label>
                <select
                  value={regForm.visitorType}
                  onChange={(e) =>
                    setRegForm((prev) => ({ ...prev, visitorType: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] bg-white text-xs font-bold text-[#172b4d] focus:outline-none focus:border-[#5e72e4]"
                >
                  <option>Visiting School Student</option>
                  <option>Newly Admitted Fresher</option>
                  <option>Current CGC Student</option>
                  <option>Parent / Guest</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={regForm.email}
                  onChange={(e) =>
                    setRegForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="student@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                  School / Department Name
                </label>
                <input
                  type="text"
                  value={regForm.institution}
                  onChange={(e) =>
                    setRegForm((prev) => ({ ...prev, institution: e.target.value }))
                  }
                  placeholder="e.g. Govt Model Sr. Sec. School / CSE"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
                />
              </div>

              <button
                type="submit"
                className="w-full uppercase tracking-wider text-xs font-bold px-4 py-3 rounded-lg bg-[#2dce89] hover:bg-[#24a46d] text-white shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                Confirm Event Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
</motion.div>

  );
}
