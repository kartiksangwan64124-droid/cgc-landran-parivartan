import React from 'react';
import { Award, GraduationCap, Trees, MapPin, Phone, Mail } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-r from-[#172b4d] to-[#2c3e50] p-8 text-white shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
          Chandigarh Group of Colleges
        </span>
        <h1 className="text-3xl font-black mt-1 mb-3">About CGC Landran Campus</h1>
        <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
          Established in 2001, Chandigarh Group of Colleges (CGC) Landran, Mohali (Punjab) is a premier higher
          education institution recognized with NAAC A+ accreditation. Spanning over 50 lush green acres along
          the Khapar-Banur Road, the institution provides industry-aligned learning across engineering,
          management, pharmacy, biotechnology, and computer applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#5e72e4] flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172b4d] mb-1">NAAC A+ Accredited</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Ranked among top private institutions in North India for research patents, industry partnerships, and
            academic excellence.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172b4d] mb-1">8,500+ Placements</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Highest placement package of ₹54.75 LPA with 900+ top multinational recruiters visiting campus
            annually.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
            <Trees className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172b4d] mb-1">50+ Acre Eco-Campus</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Equipped with solar power generation, rainwater harvesting, herbal medicinal sanctuaries, and sports
            arenas.
          </p>
        </div>
      </div>

      {/* Emergency & Campus Helplines */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-base font-black text-[#172b4d] mb-4">Official Campus Coordinates & Helplines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-50">
            <p className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
              <MapPin className="w-4 h-4 text-[#5e72e4]" /> Campus Address
            </p>
            <p className="text-gray-500 leading-relaxed">
              Chandigarh Group of Colleges (CGC)
              <br />
              Khapar-Banur Road, Sector 112, Landran,
              <br />
              Sahibzada Ajit Singh Nagar, Punjab 140307
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50">
            <p className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
              <Phone className="w-4 h-4 text-emerald-600" /> Helpline & Admissions
            </p>
            <p className="text-gray-500 leading-relaxed">
              General: +91 172 398 4200
              <br />
              Admissions Toll-Free: 1800 200 3575
              <br />
              Campus Security: +91 78892 43855
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50">
            <p className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
              <Mail className="w-4 h-4 text-orange-500" /> Electronic Inquiries
            </p>
            <p className="text-gray-500 leading-relaxed">
              info@cgc.edu.in
              <br />
              admissions@cgc.edu.in
              <br />
              studentportal@cgc.edu.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutView;
