import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Layers,
  Tag,
  Map
} from 'lucide-react';
import {
  CampusBuilding,
  CampusCategory,
  CampusEvent,
  EventFormData
} from '../../types';
import { CAMPUS_BUILDINGS } from '../../data/buildings';
import { POSTER_THEMES } from '../../data/categories';

interface EventFormModalProps {
  adminModalOpen: boolean;
  setAdminModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingEvent: CampusEvent | null;
  eventForm: EventFormData;
  setEventForm: React.Dispatch<React.SetStateAction<EventFormData>>;
  categories: CampusCategory[];
  handlePosterFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveEvent: (e: React.FormEvent) => void;
}

export function EventFormModal({
  adminModalOpen,
  setAdminModalOpen,
  editingEvent,
  eventForm,
  setEventForm,
  categories,
  handlePosterFileUpload,
  handleSaveEvent
}: EventFormModalProps) {
  if (!adminModalOpen) return null;

  return (
    <AnimatePresence>
  {adminModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172b4d]/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-8"
      >
        <div className="px-6 py-4 bg-[#f6f9fc] border-b border-[#e9ecef] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e72e4]">
              Argon Event Editor
            </span>
            <h3 className="text-base font-bold text-[#172b4d]">
              {editingEvent ? 'Edit Campus Event' : 'Create New Campus Event'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setAdminModalOpen(false)}
            className="p-1.5 rounded-lg text-[#8898aa] hover:text-[#172b4d]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveEvent} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={eventForm.title}
                onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. FutureTech Symposium 2025"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Category
              </label>
              <select
                value={eventForm.category}
                onChange={(e) => setEventForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] bg-white text-xs font-bold text-[#172b4d]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Campus Venue (Links to 3D Map)
              </label>
              <select
                value={eventForm.venueId}
                onChange={(e) => setEventForm((p) => ({ ...p, venueId: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] bg-white text-xs font-bold text-[#172b4d]"
              >
                {CAMPUS_BUILDINGS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Event Date
              </label>
              <input
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Time Slot
              </label>
              <input
                type="text"
                value={eventForm.time}
                onChange={(e) => setEventForm((p) => ({ ...p, time: e.target.value }))}
                placeholder="10:00 AM – 02:00 PM"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Organizer Department / Club
              </label>
              <input
                type="text"
                value={eventForm.organizer}
                onChange={(e) => setEventForm((p) => ({ ...p, organizer: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Event Status
              </label>
              <select
                value={eventForm.status}
                onChange={(e) => setEventForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] bg-white text-xs font-bold text-[#172b4d]"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Poster Theme / Upload Custom Poster Image
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {POSTER_THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setEventForm((p) => ({ ...p, posterTheme: t.id }))}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                      eventForm.posterTheme === t.id
                        ? 'border-[#5e72e4] bg-[#5e72e4]/10 text-[#5e72e4]'
                        : 'border-[#dee2e6] text-[#525f7f]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label className="px-3.5 py-2 rounded-lg bg-[#f6f9fc] hover:bg-[#e9ecef] border border-[#dee2e6] text-xs font-bold text-[#172b4d] cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-[#5e72e4]" />
                  Upload Image File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterFileUpload}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={eventForm.customPosterUrl}
                  onChange={(e) =>
                    setEventForm((p) => ({ ...p, customPosterUrl: e.target.value }))
                  }
                  placeholder="Or paste custom poster image URL..."
                  className="flex-1 px-3 py-2 rounded-lg border border-[#dee2e6] text-xs"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8898aa] mb-1">
                Event Description
              </label>
              <textarea
                rows={3}
                value={eventForm.description}
                onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Describe what visiting students and attendees will experience..."
                className="w-full px-3.5 py-2 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#e9ecef] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setAdminModalOpen(false)}
              className="px-4 py-2.5 rounded-lg border border-[#dee2e6] text-xs font-bold text-[#525f7f]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="uppercase tracking-wider text-xs font-bold px-5 py-2.5 rounded-lg bg-[#5e72e4] hover:bg-[#485fe0] text-white shadow-md"
            >
              {editingEvent ? 'Save Changes' : 'Publish Event'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )}

    </AnimatePresence>
  );
}
