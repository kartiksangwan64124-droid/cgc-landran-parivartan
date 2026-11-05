import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Ticket,
  MapPin,
  Clock,
  Users,
  Map
} from 'lucide-react';
import {
  CampusBuilding,
  CampusEvent,
  VisitorRegForm,
  VisitorTicket
} from '../../types';
import { CAMPUS_BUILDINGS } from '../../data/buildings';

interface EventRegistrationModalProps {
  regModalOpen: boolean;
  setRegModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEvent: CampusEvent | null;
  regForm: VisitorRegForm;
  setRegForm: React.Dispatch<React.SetStateAction<VisitorRegForm>>;
  latestTicket: VisitorTicket | null;
  handleFindEventLocation: (ev: CampusEvent) => void;
  handleEventRegistration: (e: React.FormEvent) => void;
}

export function EventRegistrationModal({
  regModalOpen,
  setRegModalOpen,
  selectedEvent,
  regForm,
  setRegForm,
  latestTicket,
  handleFindEventLocation,
  handleEventRegistration
}: EventRegistrationModalProps) {
  if (!regModalOpen || !selectedEvent) return null;
  const venue = CAMPUS_BUILDINGS.find((b) => b.id === selectedEvent.venueId);

  return (
    <AnimatePresence>
  {regModalOpen && selectedEvent && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172b4d]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="px-6 py-4 bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Visitor Event Pass Generator
            </span>
            <h3 className="text-base font-extrabold">{selectedEvent.title}</h3>
          </div>
          <button
            type="button"
            onClick={() => setRegModalOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {latestTicket ? (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-xl bg-[#2dce89]/10 border border-[#2dce89]/30">
                <CheckCircle2 className="w-10 h-10 text-[#2dce89] mx-auto mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2dce89]">
                  Pass Generated Successfully
                </span>
                <h4 className="text-lg font-extrabold text-[#172b4d] mt-1">
                  {latestTicket.id}
                </h4>
                <p className="text-xs text-[#525f7f] mt-1">
                  {latestTicket.fullName} • {latestTicket.visitorType}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRegModalOpen(false);
                  handleFindEventLocation(selectedEvent);
                }}
                className="w-full uppercase tracking-wider text-xs font-bold px-4 py-3 rounded-lg bg-[#5e72e4] text-white hover:bg-[#485fe0] transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Locate Venue on 3D Map
              </button>
            </div>
          ) : (
            <form onSubmit={handleEventRegistration} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                  Visitor Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={regForm.fullName}
                  onChange={(e) =>
                    setRegForm((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                  Visitor Role
                </label>
                <select
                  value={regForm.visitorType}
                  onChange={(e) =>
                    setRegForm((prev) => ({ ...prev, visitorType: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] bg-white text-xs font-bold text-[#172b4d]"
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
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRegModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-bold text-[#525f7f]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="uppercase tracking-wider text-xs font-bold px-5 py-2.5 rounded-lg bg-[#2dce89] hover:bg-[#24a46d] text-white shadow-md"
                >
                  Generate Pass
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )}

    </AnimatePresence>
  );
}
