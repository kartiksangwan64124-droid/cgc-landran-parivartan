import React from 'react';
import { motion } from 'framer-motion';
import {
  Info,
  Award,
  Users,
  BookOpen,
  GraduationCap,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Building2,
  Box,
  Compass,
  Calendar,
  Navigation
} from 'lucide-react';
import { ActivePage } from '../../types';

interface AboutViewProps {
  setActivePage: (page: ActivePage) => void;
  handleOpenBuildingIn3D: (id: string, drawRouteFromGate?: boolean) => void;
}

export function AboutView({
  setActivePage,
  handleOpenBuildingIn3D
}: AboutViewProps) {
  return (
<motion.div
  key="about"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
  className="space-y-6"
>
  {/* Overview Card */}
  <div className="bg-white rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.15)] overflow-hidden">
    <div className="p-6 sm:p-8 border-b border-[#e9ecef] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="max-w-3xl">
        <span className="px-3 py-1 rounded-full bg-[#5e72e4]/15 text-[#5e72e4] text-[11px] font-bold uppercase tracking-wider">
          Campus Overview & Visitor Guide
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172b4d] mt-3">
          Chandigarh Group of Colleges (CGC) Landran
        </h2>
        <p className="mt-2.5 text-sm text-[#525f7f] leading-relaxed">
          Located in Landran, Sahibzada Ajit Singh Nagar (Mohali), Punjab, CGC Landran
          — home to Chandigarh Engineering College (CEC) and specialized institutes in
          Management, Computer Applications, Pharmacy, Biotechnology, and Commerce —
          welcomes thousands of visiting school students, freshers, parents, and
          academic delegates every semester.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
        <button
          type="button"
          onClick={() => setActivePage('explore')}
          className="uppercase tracking-wider text-xs font-bold px-5 py-3 rounded-lg bg-[#5e72e4] hover:bg-[#485fe0] text-white shadow-md flex items-center justify-center gap-2"
        >
          <Box className="w-4 h-4" />
          Launch 3D Campus Tour
        </button>
        <button
          type="button"
          onClick={() => setActivePage('navigation')}
          className="uppercase tracking-wider text-xs font-bold px-5 py-3 rounded-lg bg-[#2dce89] hover:bg-[#24a46d] text-white shadow-md flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4" />
          Open Route Planner
        </button>
      </div>
    </div>

    {/* 3 Core Platform Pillars */}
    <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#e9ecef]">
      <div className="p-5 rounded-xl bg-[#f6f9fc] border border-[#e9ecef]">
        <div className="w-10 h-10 rounded-lg bg-[#5e72e4] text-white flex items-center justify-center mb-3">
          <Box className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-[#172b4d]">
          1. Schematic 3D Campus Simulation
        </h3>
        <p className="text-xs text-[#525f7f] mt-1.5 leading-relaxed">
          Built with Three.js WebGL, the 3D Explorer renders schematic representations
          of academic blocks, the central library, auditorium, cafeteria, innovation
          hub, admin block, and sports stadium. Building positions use placeholder
          geometry for interactive demonstration.
        </p>
      </div>

      <div className="p-5 rounded-xl bg-[#f6f9fc] border border-[#e9ecef]">
        <div className="w-10 h-10 rounded-lg bg-[#2dce89] text-white flex items-center justify-center mb-3">
          <Compass className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-[#172b4d]">
          2. Beginner-Friendly Navigation
        </h3>
        <p className="text-xs text-[#525f7f] mt-1.5 leading-relaxed">
          First-time visitors can select their starting point (defaulting to the Main
          Entrance Gate) and any destination building to generate step-by-turn walking
          instructions along with an animated 3D route ribbon.
        </p>
      </div>

      <div className="p-5 rounded-xl bg-[#f6f9fc] border border-[#e9ecef]">
        <div className="w-10 h-10 rounded-lg bg-[#fb6340] text-white flex items-center justify-center mb-3">
          <Calendar className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-[#172b4d]">
          3. Event Schedule & Venue Locator
        </h3>
        <p className="text-xs text-[#525f7f] mt-1.5 leading-relaxed">
          Discover upcoming technical expos, orientations, workshops, and cultural
          showcases. Every event includes a "Find Event Location" button that
          immediately highlights the host building on the 3D map.
        </p>
      </div>
    </div>

    {/* Academic Streams & Visitor Information Grid */}
    <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Academic Streams (7 Cols) */}
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-base font-extrabold text-[#172b4d]">
          Academic Streams & Campus Wings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {[
            {
              stream: 'Engineering & Technology (CEC)',
              zone: 'Block 1 Engineering (BLK-01)',
              desc: 'CSE, AI & ML, Data Science, Electronics, Mechanical & Civil Engineering labs.'
            },
            {
              stream: 'Management & Computer Applications',
              zone: 'Block 2 Mgmt & IT (BLK-02)',
              desc: 'MBA, BBA, BCA, MCA computing suites and case-study amphitheaters.'
            },
            {
              stream: 'Entrepreneurship & Research (RISE)',
              zone: 'Innovation & Startup Hub (HUB-03)',
              desc: 'Student startup incubation pods, patent cell, and rapid prototyping labs.'
            },
            {
              stream: 'Admissions, Placement & Welfare',
              zone: 'Admin Block (ADM-04)',
              desc: 'Central admissions counseling, corporate placement suites, and registrar.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#e9ecef] bg-white hover:border-[#5e72e4] transition-colors"
            >
              <span className="text-[10px] font-bold uppercase text-[#5e72e4]">
                {item.zone}
              </span>
              <h4 className="text-xs font-bold text-[#172b4d] mt-1">{item.stream}</h4>
              <p className="text-[11px] text-[#525f7f] mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Guide & Contact Details (5 Cols) */}
      <div className="lg:col-span-5 bg-[#f6f9fc] rounded-xl p-5 border border-[#e9ecef] space-y-4">
        <h3 className="text-base font-extrabold text-[#172b4d]">
          Visitor Guide & Campus Contact
        </h3>
        <div className="space-y-2.5 text-xs text-[#525f7f]">
          <p>
            <strong className="text-[#172b4d]">Campus Location:</strong> Landran,
            Kharar-Banur Highway, Sector 112, Sahibzada Ajit Singh Nagar (Mohali),
            Punjab 140307
          </p>
          <p>
            <strong className="text-[#172b4d]">Visiting Hours:</strong> Monday to
            Saturday, 8:30 AM – 5:00 PM (Gate 1 Visitor Desk)
          </p>
          <p>
            <strong className="text-[#172b4d]">Entry Procedure:</strong> School groups
            and guests should check in at <strong>GATE-01 Main Entrance</strong> to
            collect a visitor badge before proceeding to the Auditorium or Academic
            Blocks.
          </p>
        </div>
        <div className="pt-3 border-t border-[#e9ecef] flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleOpenBuildingIn3D('main-entrance', false)}
            className="px-3.5 py-2 rounded-lg bg-[#5e72e4] text-white text-xs font-bold"
          >
            Locate Main Entrance in 3D
          </button>
          <button
            type="button"
            onClick={() => handleOpenBuildingIn3D('block-4', true)}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#dee2e6] text-[#172b4d] text-xs font-bold"
          >
            Route to Admin Block
          </button>
        </div>
      </div>
    </div>
  </div>
</motion.div>

  );
}
