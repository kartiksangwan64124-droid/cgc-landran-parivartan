import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Users,
  Tag,
  AlertCircle,
  Building2,
  ExternalLink,
  Check,
  MapPin,
  Sparkles,
  CheckCircle2,
  Unlock
} from 'lucide-react';
import { CampusBuilding, CampusEvent, CampusCategory } from '../../types';
import { CAMPUS_BUILDINGS } from '../../data/buildings';

interface AdminViewProps {
  events: CampusEvent[];
  categories: CampusCategory[];
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  newCategoryName: string;
  setNewCategoryName: (val: string) => void;
  newCategoryColor: string;
  setNewCategoryColor: (val: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  handleFindEventLocation: (ev: CampusEvent) => void;
  openCreateEventModal: () => void;
  openEditEventModal: (ev: CampusEvent) => void;
  handleDeleteEvent: (id: string) => void;
  handleAddCategory: (e: React.FormEvent) => void;
  handleDeleteCategory: (id: string) => void;
}

export function AdminView({
  events,
  categories,
  isAdmin,
  setIsAdmin,
  newCategoryName,
  setNewCategoryName,
  newCategoryColor,
  setNewCategoryColor,
  showToast,
  handleFindEventLocation,
  openCreateEventModal,
  openEditEventModal,
  handleDeleteEvent,
  handleAddCategory,
  handleDeleteCategory
}: AdminViewProps) {
  return (
<motion.div
  key="admin"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
  className="space-y-6"
>
  {/* Role Access Banner */}
  {!isAdmin ? (
    <div className="bg-white rounded-xl p-8 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] text-center max-w-xl mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-[#f5365c]/15 text-[#f5365c] flex items-center justify-center mx-auto mb-4">
        <ShieldCheck className="w-7 h-7" />
      </div>
      <h2 className="text-xl font-extrabold text-[#172b4d]">
        Administrator Authentication Required
      </h2>
      <p className="text-xs text-[#525f7f] mt-2 leading-relaxed">
        The Argon Event Management Panel allows authorized campus administrators to add,
        edit, and delete campus events, upload event posters, assign 3D building venues,
        and manage event categories.
      </p>
      <button
        type="button"
        onClick={() => {
          setIsAdmin(true);
          showToast('Admin Access Granted — Full CRUD Controls Active');
        }}
        className="mt-5 uppercase tracking-wider text-xs font-bold px-6 py-3 rounded-lg bg-[#5e72e4] hover:bg-[#485fe0] text-white shadow-md transition-all inline-flex items-center gap-2"
      >
        <Unlock className="w-4 h-4" />
        Switch to Admin Mode (Instant Demo Access)
      </button>
    </div>
  ) : (
    <>
      {/* Admin KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              TOTAL EVENTS
            </p>
            <h3 className="text-2xl font-extrabold text-[#172b4d] mt-1">
              {events.length}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#5e72e4] text-white flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              UPCOMING EVENTS
            </p>
            <h3 className="text-2xl font-extrabold text-[#2dce89] mt-1">
              {events.filter((e) => e.status === 'Upcoming').length}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#2dce89] text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              COMPLETED EVENTS
            </p>
            <h3 className="text-2xl font-extrabold text-[#fb6340] mt-1">
              {events.filter((e) => e.status === 'Completed').length}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#fb6340] text-white flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
              EVENT CATEGORIES
            </p>
            <h3 className="text-2xl font-extrabold text-[#11cdef] mt-1">
              {categories.length}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#11cdef] text-white flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Event Management CRUD Table */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e9ecef] flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5365c]">
                Admin Event Control
              </span>
              <h3 className="text-base font-bold text-[#172b4d]">
                Manage Campus Events ({events.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={openCreateEventModal}
              className="uppercase tracking-wider text-xs font-bold px-4 py-2.5 rounded-lg bg-[#5e72e4] hover:bg-[#485fe0] text-white shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add New Event
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e9ecef] bg-[#f6f9fc]">
                  <th className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
                    Event & Category
                  </th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
                    Date & Status
                  </th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
                    3D Venue
                  </th>
                  <th className="py-3 px-5 text-right text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
                    CRUD Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e9ecef] text-xs">
                {events.map((ev) => {
                  const venue = CAMPUS_BUILDINGS.find((b) => b.id === ev.venueId);
                  return (
                    <tr key={ev.id} className="hover:bg-[#f8f9fe]">
                      <td className="py-3.5 px-5">
                        <p className="font-bold text-[#172b4d]">{ev.title}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#5e72e4]/10 text-[#5e72e4] text-[10px] font-bold uppercase">
                          {ev.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-[#172b4d]">{ev.date}</p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ev.status === 'Upcoming'
                              ? 'bg-[#2dce89]/15 text-[#2dce89]'
                              : 'bg-[#8898aa]/20 text-[#525f7f]'
                          }`}
                        >
                          {ev.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#525f7f]">
                        {venue?.shortName}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleFindEventLocation(ev)}
                            title="Test 3D Venue Locator"
                            className="p-2 rounded-lg bg-[#2dce89]/10 text-[#2dce89] hover:bg-[#2dce89] hover:text-white transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditEventModal(ev)}
                            title="Edit Event"
                            className="p-2 rounded-lg bg-[#5e72e4]/10 text-[#5e72e4] hover:bg-[#5e72e4] hover:text-white transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(ev.id)}
                            title="Delete Event"
                            className="p-2 rounded-lg bg-[#f5365c]/10 text-[#f5365c] hover:bg-[#f5365c] hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Cols: Manage Event Categories Panel */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-[#e9ecef]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#11cdef]">
              Taxonomy Manager
            </span>
            <h3 className="text-base font-bold text-[#172b4d]">
              Manage Event Categories
            </h3>
          </div>

          <div className="p-5 space-y-4">
            <form onSubmit={handleAddCategory} className="flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name..."
                className="flex-1 px-3 py-2 rounded-lg border border-[#dee2e6] text-xs font-medium focus:outline-none focus:border-[#5e72e4]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-[#2dce89] hover:bg-[#24a46d] text-white text-xs font-bold uppercase shrink-0"
              >
                Add
              </button>
            </form>

            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="px-3.5 py-2.5 rounded-lg bg-[#f6f9fc] border border-[#e9ecef] flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-[#172b4d]">{cat.name}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-[#8898aa] hover:text-[#f5365c]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )}
</motion.div>

  );
}
