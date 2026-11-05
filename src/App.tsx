import React, { useState, useEffect, useMemo, useCallback } from 'react';

// Types
import {
  ActiveTab,
  CampusBuilding,
  CampusEvent,
  ViewPreset,
  RouteInfo,
  PassFormState,
  GeneratedPass,
  AdminNewEvent
} from './types';

// Data
import { CGC_MAP_BUILDINGS } from './data/buildings';
import { INITIAL_CGC_EVENTS } from './data/events';

// Routing Utils
import {
  ROAD_GRAPH,
  BUILDING_TO_ROAD,
  findShortestRoadPath,
  generateStepByStepDirections
} from './utils/routing';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Views
import { ExploreView } from './components/views/ExploreView';
import { DashboardView } from './components/views/DashboardView';
import { NavigationView } from './components/views/NavigationView';
import { EventsView } from './components/views/EventsView';
import { AboutView } from './components/views/AboutView';
import { AdminView } from './components/views/AdminView';

// Modals
import { VisitorPassModal } from './components/modals/VisitorPassModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding | null>(CGC_MAP_BUILDINGS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [viewPreset, setViewPreset] = useState<ViewPreset>('isometric');
  const [isNightMode, setIsNightMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation State
  const [navStartId, setNavStartId] = useState('block-1');
  const [navEndId, setNavEndId] = useState('block-11-10');
  const [activeRoutePath, setActiveRoutePath] = useState<string[] | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  // Events State
  const [eventsList, setEventsList] = useState<CampusEvent[]>(INITIAL_CGC_EVENTS as CampusEvent[]);
  const [, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [eventCategoryFilter, setEventCategoryFilter] = useState('All');

  // Visitor Registration Modal
  const [showPassModal, setShowPassModal] = useState(false);
  const [passForm, setPassForm] = useState<PassFormState>({
    name: 'Johan Dhamija',
    phone: '7889243855',
    email: 'johandhamija@gmail.com',
    purpose: 'Campus Tour & Admission Inquiry',
    date: '2026-11-20'
  });
  const [generatedPass, setGeneratedPass] = useState<GeneratedPass | null>(null);

  // Admin Mode Toggle
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminNewEvent, setAdminNewEvent] = useState<AdminNewEvent>({
    title: '',
    category: 'Cultural & Mega Fest',
    venueId: 'parivartan-ground',
    date: '',
    time: '',
    attendees: '1000+',
    organizer: 'CGC Landran',
    description: ''
  });

  // Categories list
  const categories = useMemo(() => {
    return ['All', 'Academic Blocks', 'Hostels', 'Food & Dining', 'Grounds & Parks'];
  }, []);

  // Filtered Buildings for global search
  const filteredBuildings = useMemo(() => {
    if (!searchQuery.trim()) return CGC_MAP_BUILDINGS;
    const q = searchQuery.toLowerCase();
    return CGC_MAP_BUILDINGS.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.shortName.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // When search query matches buildings, auto-select first match in explore mode
  useEffect(() => {
    if (searchQuery.trim() && filteredBuildings.length > 0) {
      setSelectedBuilding(filteredBuildings[0]);
      if (activeTab !== 'explore') {
        setActiveTab('explore');
      }
    }
  }, [searchQuery, filteredBuildings, activeTab]);

  // Compute Navigation Path
  const computeNavigation = useCallback((fromId: string, toId: string) => {
    const fromBuilding = CGC_MAP_BUILDINGS.find((b) => b.id === fromId);
    const toBuilding = CGC_MAP_BUILDINGS.find((b) => b.id === toId);

    if (!fromBuilding || !toBuilding) return;

    const fromJunction = BUILDING_TO_ROAD[fromId] || 'junction_north';
    const toJunction = BUILDING_TO_ROAD[toId] || 'junction_blk11';

    const pathJunctions = findShortestRoadPath(fromJunction, toJunction);
    setActiveRoutePath(pathJunctions);

    let totalDist = 45;
    for (let i = 0; i < pathJunctions.length - 1; i++) {
      const p1 = ROAD_GRAPH[pathJunctions[i]].pos;
      const p2 = ROAD_GRAPH[pathJunctions[i + 1]].pos;
      totalDist += Math.hypot(p2[0] - p1[0], p2[2] - p1[2]) * 8;
    }

    const distMeters = Math.round(totalDist);
    const walkMins = Math.max(1, Math.round(distMeters / 75));
    const calories = Math.round(distMeters * 0.045);
    const directions = generateStepByStepDirections(fromBuilding, toBuilding, pathJunctions);

    setRouteInfo({
      distanceMeters: distMeters,
      durationMinutes: walkMins,
      calories: calories,
      steps: directions,
      fromName: fromBuilding.name,
      toName: toBuilding.name
    });
  }, []);

  // Trigger navigation recalculation when start/end changes
  useEffect(() => {
    if (activeTab === 'navigation') {
      computeNavigation(navStartId, navEndId);
    }
  }, [navStartId, navEndId, activeTab, computeNavigation]);

  // Jump from event card to 3D map location
  const handleFindEventLocation = (event: CampusEvent) => {
    const targetBuilding = CGC_MAP_BUILDINGS.find((b) => b.id === event.venueId);
    if (targetBuilding) {
      setSelectedBuilding(targetBuilding);
      setActiveTab('explore');
    }
  };

  // Quick jump from explore card to navigation
  const handleQuickNavigateTo = (building: CampusBuilding) => {
    setNavEndId(building.id);
    setActiveTab('navigation');
    computeNavigation(navStartId, building.id);
  };

  // Admin add new event
  const handleAddAdminEvent = () => {
    if (!adminNewEvent.title) return;
    const venueObj = CGC_MAP_BUILDINGS.find((b) => b.id === adminNewEvent.venueId);
    const newEvt: CampusEvent = {
      id: `evt-${Date.now()}`,
      title: adminNewEvent.title,
      category: adminNewEvent.category,
      badgeClass: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      venueId: adminNewEvent.venueId,
      venueName: venueObj ? venueObj.name : 'CGC Landran',
      date: adminNewEvent.date || 'Dec 15, 2026',
      time: adminNewEvent.time || '10:00 AM',
      attendees: adminNewEvent.attendees || '500+ Students',
      organizer: adminNewEvent.organizer || 'CGC Landran',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      description: adminNewEvent.description || 'Join us for this exciting campus experience.',
      tags: ['Campus', 'CGC2026'],
      status: 'Upcoming',
      isSample: false,
      featured: false,
      registrationsCount: 0,
      posterTheme: 'indigo'
    };
    setEventsList([newEvt, ...eventsList]);
    setAdminNewEvent({
      title: '',
      category: 'Cultural & Mega Fest',
      venueId: 'parivartan-ground',
      date: '',
      time: '',
      attendees: '1000+',
      organizer: 'CGC Landran',
      description: ''
    });
  };

  const handleDeleteAdminEvent = (id: string) => {
    setEventsList((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8f9fe] font-sans text-gray-800">
      {/* ARGON SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        eventsCount={eventsList.length}
        isAdminMode={isAdminMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenPassModal={() => setShowPassModal(true)}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TOP NAVBAR */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isNightMode={isNightMode}
          setIsNightMode={setIsNightMode}
          activeTab={activeTab}
          viewPreset={viewPreset}
          setViewPreset={setViewPreset}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* VIEW 1: 3D CAMPUS EXPLORER */}
        {activeTab === 'explore' && (
          <ExploreView
            categories={categories}
            activeCategoryFilter={activeCategoryFilter}
            setActiveCategoryFilter={setActiveCategoryFilter}
            buildings={CGC_MAP_BUILDINGS}
            selectedBuilding={selectedBuilding}
            setSelectedBuilding={setSelectedBuilding}
            activeRoutePath={activeRoutePath}
            viewPreset={viewPreset}
            isNightMode={isNightMode}
            eventsList={eventsList}
            onQuickNavigateTo={handleQuickNavigateTo}
            onSelectEvent={(evt) => {
              setSelectedEvent(evt);
              setActiveTab('events');
            }}
          />
        )}

        {/* VIEW 2: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <DashboardView
            eventsList={eventsList}
            buildings={CGC_MAP_BUILDINGS}
            onNavigateToTab={setActiveTab}
            onSelectBuilding={setSelectedBuilding}
            onFindEventLocation={handleFindEventLocation}
          />
        )}

        {/* VIEW 3: SMART WAYFINDING & NAVIGATION */}
        {activeTab === 'navigation' && (
          <NavigationView
            buildings={CGC_MAP_BUILDINGS}
            navStartId={navStartId}
            setNavStartId={setNavStartId}
            navEndId={navEndId}
            setNavEndId={setNavEndId}
            routeInfo={routeInfo}
            onViewIn3D={() => setActiveTab('explore')}
          />
        )}

        {/* VIEW 4: EVENTS SCHEDULE */}
        {activeTab === 'events' && (
          <EventsView
            eventsList={eventsList}
            eventCategoryFilter={eventCategoryFilter}
            setEventCategoryFilter={setEventCategoryFilter}
            onFindEventLocation={handleFindEventLocation}
            onRegisterEvent={() => setShowPassModal(true)}
          />
        )}

        {/* VIEW 5: ABOUT CGC LANDRAN */}
        {activeTab === 'about' && <AboutView />}

        {/* VIEW 6: ADMIN EVENT MANAGEMENT */}
        {activeTab === 'admin' && (
          <AdminView
            isAdminMode={isAdminMode}
            setIsAdminMode={setIsAdminMode}
            eventsList={eventsList}
            buildings={CGC_MAP_BUILDINGS}
            adminNewEvent={adminNewEvent}
            setAdminNewEvent={setAdminNewEvent}
            onAddEvent={handleAddAdminEvent}
            onDeleteEvent={handleDeleteAdminEvent}
            onFindEventLocation={handleFindEventLocation}
          />
        )}
      </div>

      {/* VISITOR CAMPUS PASS MODAL */}
      <VisitorPassModal
        isOpen={showPassModal}
        onClose={() => setShowPassModal(false)}
        passForm={passForm}
        setPassForm={setPassForm}
        generatedPass={generatedPass}
        setGeneratedPass={setGeneratedPass}
      />
    </div>
  );
}
