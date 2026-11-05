import React from 'react';
import { Unlock, Lock, Plus, MapPin, Trash2 } from 'lucide-react';
import { CampusBuilding, CampusEvent, AdminNewEvent } from '../../types';

interface AdminViewProps {
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  eventsList: CampusEvent[];
  buildings: CampusBuilding[];
  adminNewEvent: AdminNewEvent;
  setAdminNewEvent: React.Dispatch<React.SetStateAction<AdminNewEvent>>;
  onAddEvent: () => void;
  onDeleteEvent: (id: string) => void;
  onFindEventLocation: (event: CampusEvent) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  isAdminMode,
  setIsAdminMode,
  eventsList,
  buildings,
  adminNewEvent,
  setAdminNewEvent,
  onAddEvent,
  onDeleteEvent,
  onFindEventLocation
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#172b4d] tracking-tight">Admin Event Management Panel</h1>
          <p className="text-sm text-gray-500">Add, edit, and update campus event schedules and venue pins.</p>
        </div>

        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            isAdminMode ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isAdminMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {isAdminMode ? 'Admin Authenticated' : 'Authenticate as Admin'}
        </button>
      </div>

      {/* Quick Add Event Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-black text-[#172b4d] mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#5e72e4]" /> Schedule New Campus Event
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-gray-500 mb-1">Event Title</label>
            <input
              type="text"
              placeholder="e.g., Annual Sports Day 2026"
              value={adminNewEvent.title}
              onChange={(e) => setAdminNewEvent({ ...adminNewEvent, title: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-200 bg-[#f8f9fe] focus:bg-white focus:border-[#5e72e4] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-500 mb-1">Category</label>
            <select
              value={adminNewEvent.category}
              onChange={(e) => setAdminNewEvent({ ...adminNewEvent, category: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-200 bg-[#f8f9fe] focus:bg-white focus:border-[#5e72e4] outline-none"
            >
              <option value="Cultural & Mega Fest">Cultural & Mega Fest</option>
              <option value="Technology & Coding">Technology & Coding</option>
              <option value="Innovation & Science">Innovation & Science</option>
              <option value="Sports & Athletics">Sports & Athletics</option>
              <option value="Lifestyle & Social">Lifestyle & Social</option>
              <option value="Business & Management">Business & Management</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-500 mb-1">Campus Venue</label>
            <select
              value={adminNewEvent.venueId}
              onChange={(e) => setAdminNewEvent({ ...adminNewEvent, venueId: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-200 bg-[#f8f9fe] focus:bg-white focus:border-[#5e72e4] outline-none"
            >
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-500 mb-1">Date</label>
            <input
              type="text"
              placeholder="e.g., Dec 10, 2026"
              value={adminNewEvent.date}
              onChange={(e) => setAdminNewEvent({ ...adminNewEvent, date: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-200 bg-[#f8f9fe] focus:bg-white focus:border-[#5e72e4] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-500 mb-1">Time</label>
            <input
              type="text"
              placeholder="e.g., 10:00 AM – 4:00 PM"
              value={adminNewEvent.time}
              onChange={(e) => setAdminNewEvent({ ...adminNewEvent, time: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-200 bg-[#f8f9fe] focus:bg-white focus:border-[#5e72e4] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-500 mb-1">Host Organization</label>
            <input
              type="text"
              placeholder="e.g., CEC Student Council"
              value={adminNewEvent.organizer}
              onChange={(e) => setAdminNewEvent({ ...adminNewEvent, organizer: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-200 bg-[#f8f9fe] focus:bg-white focus:border-[#5e72e4] outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-bold text-gray-500 mb-1 text-xs">Event Description</label>
          <textarea
            rows={2}
            placeholder="Provide detailed schedule, eligibility, and rules..."
            value={adminNewEvent.description}
            onChange={(e) => setAdminNewEvent({ ...adminNewEvent, description: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-gray-200 bg-[#f8f9fe] focus:bg-white focus:border-[#5e72e4] outline-none text-xs"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onAddEvent}
            className="px-5 py-2.5 rounded-xl bg-[#5e72e4] hover:bg-[#4d60d3] text-white text-xs font-bold transition shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Publish to Live Schedule
          </button>
        </div>
      </div>

      {/* Existing Events Table (Argon Table Style) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-black text-[#172b4d]">Active Event Database ({eventsList.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="p-4">Event</th>
                <th className="p-4">Category</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {eventsList.map((evt) => (
                <tr key={evt.id} className="hover:bg-gray-50/80 transition">
                  <td className="p-4 font-bold text-[#172b4d]">{evt.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full font-semibold border ${evt.badgeClass}`}>
                      {evt.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{evt.venueName}</td>
                  <td className="p-4 text-gray-500">
                    {evt.date} • {evt.time}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => onFindEventLocation(evt)}
                      className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50"
                      title="Find on 3D Map"
                      aria-label="Find on 3D map"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteEvent(evt.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                      title="Delete Event"
                      aria-label="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminView;
