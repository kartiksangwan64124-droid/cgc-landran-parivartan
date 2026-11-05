import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { PassFormState, GeneratedPass } from '../../types';

interface VisitorPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  passForm: PassFormState;
  setPassForm: React.Dispatch<React.SetStateAction<PassFormState>>;
  generatedPass: GeneratedPass | null;
  setGeneratedPass: (pass: GeneratedPass | null) => void;
}

export const VisitorPassModal: React.FC<VisitorPassModalProps> = ({
  isOpen,
  onClose,
  passForm,
  setPassForm,
  generatedPass,
  setGeneratedPass
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-[#5e72e4] to-[#11cdef] text-white flex items-center justify-between">
          <div>
            <h3 className="font-black text-base">CGC Landran E-Pass</h3>
            <p className="text-xs text-indigo-100">Verified Campus Entry & QR Pass</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20"
            aria-label="Close pass modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-500 mb-1">Visitor / Student Name</label>
            <input
              type="text"
              value={passForm.name}
              onChange={(e) => setPassForm({ ...passForm, name: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-[#5e72e4]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-500 mb-1">Mobile Number</label>
              <input
                type="text"
                value={passForm.phone}
                onChange={(e) => setPassForm({ ...passForm, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-[#5e72e4]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-500 mb-1">Date of Visit</label>
              <input
                type="date"
                value={passForm.date}
                onChange={(e) => setPassForm({ ...passForm, date: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-[#5e72e4]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-500 mb-1">Purpose of Visit</label>
            <select
              value={passForm.purpose}
              onChange={(e) => setPassForm({ ...passForm, purpose: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-[#5e72e4]"
            >
              <option value="Campus Tour & Admission Inquiry">Campus Tour & Admission Inquiry</option>
              <option value="Attending Parivartan Mega Fest">Attending Parivartan Mega Fest</option>
              <option value="Guest Lecture / Corporate Recruitment">Guest Lecture / Corporate Recruitment</option>
              <option value="Hostel Resident Visitor">Hostel Resident Visitor</option>
            </select>
          </div>

          {generatedPass && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
              <p className="font-bold text-emerald-900 text-sm">Pass Verified: {generatedPass.code}</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                Present this barcode at the Khapar-Banur Road security post.
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => {
                const passCode = `CGC-PASS-${Math.floor(100000 + Math.random() * 900000)}`;
                setGeneratedPass({ code: passCode });
              }}
              className="w-full py-3 rounded-xl bg-[#5e72e4] hover:bg-[#4d60d3] text-white font-bold transition shadow-md"
            >
              Confirm & Download Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VisitorPassModal;
