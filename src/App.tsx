declare const __initial_auth_token: string | undefined;
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

// Types & Data
import {
  ActivePage,
  CampusBuilding,
  CampusEvent,
  CampusCategory,
  VisitorRegForm,
  VisitorTicket,
  VisitorRegistration,
  EventFormData,
  ToastMessage
} from './types';
import { CAMPUS_BUILDINGS } from './data/buildings';
import { INITIAL_CATEGORIES } from './data/categories';
import { INITIAL_EVENTS } from './data/events';
import { computeCampusRoute } from './utils/routing';
import {
  auth,
  db,
  appId,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  User
} from './config/firebase';

// Layout & Common Components
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Toast } from './components/common/Toast';

// Views
import { DashboardView } from './components/views/DashboardView';
import { CampusExplorerView } from './components/views/CampusExplorerView';
import { DirectionsView } from './components/views/DirectionsView';
import { EventsView } from './components/views/EventsView';
import { EventDetailView } from './components/views/EventDetailView';
import { AboutView } from './components/views/AboutView';
import { AdminView } from './components/views/AdminView';

// Modals
import { EventRegistrationModal } from './components/modals/EventRegistrationModal';
import { EventFormModal } from './components/modals/EventFormModal';

export default function App() {
  // --- Navigation & Page State ---
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // --- Campus Explorer & Navigation State ---
  const [selectedBuildingId, setSelectedBuildingId] = useState('main-entrance');
  const [routeStartId, setRouteStartId] = useState('main-entrance');
  const [routeEndId, setRouteEndId] = useState('');
  const [buildingSearch, setBuildingSearch] = useState('');
  const [buildingCategory, setBuildingCategory] = useState('All');
  const [show3DLabels, setShow3DLabels] = useState(true);
  const [cameraPresetTrigger, setCameraPresetTrigger] = useState<any>(null);
  const [highlightedEventContext, setHighlightedEventContext] = useState(null);

  // --- Events & Admin State ---
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedEventId, setSelectedEventId] = useState(INITIAL_EVENTS[0].id);
  const [eventSearch, setEventSearch] = useState('');
  const [eventCategoryFilter, setEventCategoryFilter] = useState('All');
  const [eventStatusFilter, setEventStatusFilter] = useState('All');
  const [eventsViewMode, setEventsViewMode] = useState<'grid' | 'calendar'>('grid'); // 'grid' | 'calendar'

  // --- Visitor Event Registration State ---
  const [registrations, setRegistrations] = useState([]);
  const [regForm, setRegForm] = useState({
    fullName: '',
    visitorType: 'Visiting School Student',
    email: '',
    institution: ''
  });
  const [latestTicket, setLatestTicket] = useState(null);
  const [regModalOpen, setRegModalOpen] = useState(false);

  // --- Admin Role & CRUD Modal State ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#5e72e4');
  const [toastMessage, setToastMessage] = useState(null);

  // --- Top Global Quick Search ---
  const [globalSearch, setGlobalSearch] = useState('');
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Toast helper
  const showToast = useCallback((title, type = 'success') => {
    setToastMessage({ title, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  }, []);

  // --- Firebase Auth & Firestore Synchronization ---
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) {
        console.warn('Auth fallback to local session:', e);
      }
    };
    initAuth();
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user || !db) return;
    const eventsCol = collection(db, 'artifacts', appId, 'public', 'data', 'campus_events');
    const unsubEvents = onSnapshot(
      eventsCol,
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setEvents(loaded as CampusEvent[]);
        }
      },
      (err) => console.warn('Firestore events listener:', err)
    );
    return () => unsubEvents();
  }, [user]);

  // --- Computed Route Data ---
  const activeRoute = useMemo(() => {
    if (!routeStartId || !routeEndId || routeStartId === routeEndId) return null;
    return computeCampusRoute(routeStartId, routeEndId);
  }, [routeStartId, routeEndId]);

  const selectedBuilding = useMemo(
    () => CAMPUS_BUILDINGS.find((b) => b.id === selectedBuildingId) || CAMPUS_BUILDINGS[0],
    [selectedBuildingId]
  );

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) || events[0],
    [events, selectedEventId]
  );

  // --- Filtered Buildings & Events ---
  const filteredBuildings = useMemo(() => {
    return CAMPUS_BUILDINGS.filter((b) => {
      const matchesCat = buildingCategory === 'All' || b.category === buildingCategory;
      const q = buildingSearch.trim().toLowerCase();
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.facilities.some((f) => f.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [buildingCategory, buildingSearch]);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesCat = eventCategoryFilter === 'All' || ev.category === eventCategoryFilter;
      const matchesStatus = eventStatusFilter === 'All' || ev.status === eventStatusFilter;
      const q = eventSearch.trim().toLowerCase();
      const venue = CAMPUS_BUILDINGS.find((b) => b.id === ev.venueId);
      const matchesQuery =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.organizer.toLowerCase().includes(q) ||
        (venue && venue.name.toLowerCase().includes(q));
      return matchesCat && matchesStatus && matchesQuery;
    });
  }, [events, eventCategoryFilter, eventStatusFilter, eventSearch]);

  // --- Key User Journey Actions ---
  // 1. "Find Event Location" -> Opens 3D Campus Explorer, highlights venue & draws route from Main Entrance
  const handleFindEventLocation = useCallback(
    (eventObj) => {
      if (!eventObj) return;
      setSelectedBuildingId(eventObj.venueId);
      setRouteStartId('main-entrance');
      setRouteEndId(eventObj.venueId);
      setHighlightedEventContext(eventObj);
      setActivePage('explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const venue = CAMPUS_BUILDINGS.find((b) => b.id === eventObj.venueId);
      showToast(`3D Map focused on ${venue?.shortName || 'Event Venue'} with route from Main Entrance`);
    },
    [showToast]
  );

  // 2. Inspect Building in 3D Explorer
  const handleOpenBuildingIn3D = useCallback((buildingId, drawRouteFromGate = false) => {
    setSelectedBuildingId(buildingId);
    if (drawRouteFromGate && buildingId !== 'main-entrance') {
      setRouteStartId('main-entrance');
      setRouteEndId(buildingId);
    }
    setHighlightedEventContext(null);
    setActivePage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 3. View Event Details
  const handleOpenEventDetails = useCallback((eventId) => {
    setSelectedEventId(eventId);
    setLatestTicket(null);
    setActivePage('event-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 4. Submit Visitor Registration for an Event
  const handleEventRegistration = async (e) => {
    e.preventDefault();
    if (!regForm.fullName.trim() || !regForm.email.trim()) return;

    const ticketCode = `CGC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReg = {
      id: ticketCode,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      venueId: selectedEvent.venueId,
      date: selectedEvent.date,
      time: selectedEvent.time,
      ...regForm,
      createdAt: new Date().toISOString()
    };

    setRegistrations((prev) => [newReg, ...prev]);
    setLatestTicket(newReg);

    // Increment registration counter on the event
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === selectedEvent.id
          ? { ...ev, registrationsCount: (ev.registrationsCount || 0) + 1 }
          : ev
      )
    );

    if (user && db) {
      try {
        await setDoc(
          doc(db, 'artifacts', appId, 'users', user.uid, 'registrations', ticketCode),
          newReg
        );
      } catch (err) {
        console.warn('Saved registration locally:', err);
      }
    }

    setRegForm({ fullName: '', visitorType: 'Visiting School Student', email: '', institution: '' });
    showToast(`Registration Confirmed! Pass ID: ${ticketCode}`);
  };

  // --- Admin Event CRUD Handlers ---
  const [eventForm, setEventForm] = useState<EventFormData>({
    title: '',
    category: 'Technical',
    date: '2025-05-30',
    time: '10:00 AM – 01:00 PM',
    venueId: 'auditorium',
    organizer: 'CGC Student Council',
    status: 'Upcoming',
    featured: false,
    posterTheme: 'theme-indigo',
    customPosterUrl: '',
    description: '',
    agendaText: ''
  });

  const openCreateEventModal = () => {
    setEditingEvent(null);
    setEventForm({
      title: '',
      category: categories[0]?.name || 'Technical',
      date: '2025-05-30',
      time: '10:00 AM – 01:00 PM',
      venueId: 'auditorium',
      organizer: 'Department of Engineering',
      status: 'Upcoming',
      featured: false,
      posterTheme: 'theme-indigo',
      customPosterUrl: '',
      description: '',
      agendaText: ''
    });
    setAdminModalOpen(true);
  };

  const openEditEventModal = (ev) => {
    setEditingEvent(ev);
    setEventForm({
      title: ev.title,
      category: ev.category,
      date: ev.date,
      time: ev.time,
      venueId: ev.venueId,
      organizer: ev.organizer,
      status: ev.status,
      featured: ev.featured || false,
      posterTheme: ev.posterTheme || 'theme-indigo',
      customPosterUrl: ev.customPosterUrl || '',
      description: ev.description || '',
      agendaText: (ev.agenda || []).join('\n')
    });
    setAdminModalOpen(true);
  };

  const handlePosterFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEventForm((prev) => ({ ...prev, customPosterUrl: (reader.result as string) }));
        showToast('Custom event poster image loaded');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    const eventId = editingEvent ? editingEvent.id : `evt-${Date.now()}`;
    const payload = {
      id: eventId,
      ...eventForm,
      isSample: true,
      featured: true,
      registrationsCount: editingEvent ? editingEvent.registrationsCount : 1,
      agenda: editingEvent?.agenda || [
        '10:00 AM – Welcome & Registration at Venue Foyer',
        '10:30 AM – Main Session & Interactive Showcase',
        '12:30 PM – Open Q&A and Campus Networking'
      ]
    };

    if (editingEvent) {
      setEvents((prev) => prev.map((item) => (item.id === eventId ? payload : item)));
      showToast(`Updated event: ${payload.title}`);
    } else {
      setEvents((prev) => [payload, ...prev]);
      showToast(`Created new event: ${payload.title}`);
    }

    if (user && db) {
      try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'campus_events', eventId), payload);
      } catch (err) {
        console.warn('Saved event in local session:', err);
      }
    }

    setAdminModalOpen(false);
  };

  const handleDeleteEvent = async (eventId) => {
    const target = events.find((e) => e.id === eventId);
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    if (user && db) {
      try {
        await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'campus_events', eventId));
      } catch (err) {
        console.warn('Deleted locally:', err);
      }
    }
    showToast(`Removed event: ${target?.title || eventId}`, 'danger');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      showToast('Category already exists', 'danger');
      return;
    }
    setCategories((prev) => [
      ...prev,
      {
        id: `cat-${Date.now()}`,
        name: trimmed,
        color: newCategoryColor,
        bg: 'bg-[#5e72e4]/10 text-[#5e72e4]'
      }
    ]);
    setNewCategoryName('');
    showToast(`Added event category: ${trimmed}`);
  };

  const handleDeleteCategory = (catId) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Category removed');
  };

  // Quick Global Search Results
  const globalSearchResults = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return { buildings: [], events: [] };
    return {
      buildings: CAMPUS_BUILDINGS.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.code.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      ).slice(0, 4),
      events: events
        .filter((e) => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q))
        .slice(0, 3)
    };
  }, [globalSearch, events]);

  return (
    <div className="min-h-screen bg-[#f8f9fe] text-[#172b4d] flex font-sans antialiased selection:bg-[#5e72e4] selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        isAdmin={isAdmin}
        eventsCount={events.length}
        handleOpenBuildingIn3D={handleOpenBuildingIn3D}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header & Navbar */}
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          setMobileSidebarOpen={setMobileSidebarOpen}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          globalSearchOpen={globalSearchOpen}
          setGlobalSearchOpen={setGlobalSearchOpen}
          globalSearchResults={globalSearchResults}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          showToast={showToast}
          handleOpenBuildingIn3D={handleOpenBuildingIn3D}
          handleOpenEventDetails={handleOpenEventDetails}
          buildingsCount={CAMPUS_BUILDINGS.length}
          upcomingEventsCount={events.filter((e) => e.status === 'Upcoming').length}
          totalRegistrationsCount={events.reduce((acc, e) => acc + (e.registrationsCount || 0), 0)}
          sessionRegistrationsCount={registrations.length}
        />

        {/* Main Content Views */}
        <main className="relative z-10 -mt-16 px-4 sm:px-8 pb-16 flex-1">
          <AnimatePresence mode="wait">
            {activePage === 'dashboard' && (
              <DashboardView
                setActivePage={setActivePage}
                selectedBuildingId={selectedBuildingId}
                setSelectedBuildingId={setSelectedBuildingId}
                buildingSearch={buildingSearch}
                setBuildingSearch={setBuildingSearch}
                events={events}
                handleFindEventLocation={handleFindEventLocation}
                handleOpenBuildingIn3D={handleOpenBuildingIn3D}
                handleOpenEventDetails={handleOpenEventDetails}
                activeRoute={activeRoute}
                selectedBuilding={selectedBuilding}
              />
            )}

            {activePage === 'explore' && (
              <CampusExplorerView
                setActivePage={setActivePage}
                selectedBuildingId={selectedBuildingId}
                setSelectedBuildingId={setSelectedBuildingId}
                setRouteStartId={setRouteStartId}
                setRouteEndId={setRouteEndId}
                buildingSearch={buildingSearch}
                setBuildingSearch={setBuildingSearch}
                buildingCategory={buildingCategory}
                setBuildingCategory={setBuildingCategory}
                show3DLabels={show3DLabels}
                setShow3DLabels={setShow3DLabels}
                cameraPresetTrigger={cameraPresetTrigger}
                setCameraPresetTrigger={setCameraPresetTrigger}
                highlightedEventContext={highlightedEventContext}
                setHighlightedEventContext={setHighlightedEventContext}
                events={events}
                showToast={showToast}
                handleOpenEventDetails={handleOpenEventDetails}
                activeRoute={activeRoute}
                selectedBuilding={selectedBuilding}
                filteredBuildings={filteredBuildings}
              />
            )}

            {activePage === 'navigation' && (
              <DirectionsView
                setActivePage={setActivePage}
                selectedBuildingId={selectedBuildingId}
                setSelectedBuildingId={setSelectedBuildingId}
                routeStartId={routeStartId}
                setRouteStartId={setRouteStartId}
                routeEndId={routeEndId}
                setRouteEndId={setRouteEndId}
                activeRoute={activeRoute}
              />
            )}

            {activePage === 'events' && (
              <EventsView
                setActivePage={setActivePage}
                events={events}
                categories={categories}
                eventSearch={eventSearch}
                setEventSearch={setEventSearch}
                eventCategoryFilter={eventCategoryFilter}
                setEventCategoryFilter={setEventCategoryFilter}
                eventStatusFilter={eventStatusFilter}
                setEventStatusFilter={setEventStatusFilter}
                eventsViewMode={eventsViewMode}
                setEventsViewMode={setEventsViewMode}
                handleFindEventLocation={handleFindEventLocation}
                handleOpenEventDetails={handleOpenEventDetails}
                filteredEvents={filteredEvents}
              />
            )}

            {activePage === 'event-details' && selectedEvent && (
              <EventDetailView
                setActivePage={setActivePage}
                events={events}
                regForm={regForm}
                setRegForm={setRegForm}
                latestTicket={latestTicket}
                setLatestTicket={setLatestTicket}
                setRegModalOpen={setRegModalOpen}
                handleFindEventLocation={handleFindEventLocation}
                handleEventRegistration={handleEventRegistration}
                selectedEvent={selectedEvent}
              />
            )}

            {activePage === 'about' && (
              <AboutView
                setActivePage={setActivePage}
                handleOpenBuildingIn3D={handleOpenBuildingIn3D}
              />
            )}

            {activePage === 'admin' && (
              <AdminView
                events={events}
                categories={categories}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                newCategoryName={newCategoryName}
                setNewCategoryName={setNewCategoryName}
                newCategoryColor={newCategoryColor}
                setNewCategoryColor={setNewCategoryColor}
                showToast={showToast}
                handleFindEventLocation={handleFindEventLocation}
                openCreateEventModal={openCreateEventModal}
                openEditEventModal={openEditEventModal}
                handleDeleteEvent={handleDeleteEvent}
                handleAddCategory={handleAddCategory}
                handleDeleteCategory={handleDeleteCategory}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Visitor Event Registration Modal */}
      <EventRegistrationModal
        regModalOpen={regModalOpen}
        setRegModalOpen={setRegModalOpen}
        selectedEvent={selectedEvent}
        regForm={regForm}
        setRegForm={setRegForm}
        latestTicket={latestTicket}
        handleFindEventLocation={handleFindEventLocation}
        handleEventRegistration={handleEventRegistration}
      />

      {/* Admin Add / Edit Event Modal */}
      <EventFormModal
        adminModalOpen={adminModalOpen}
        setAdminModalOpen={setAdminModalOpen}
        editingEvent={editingEvent}
        eventForm={eventForm}
        setEventForm={setEventForm}
        categories={categories}
        handlePosterFileUpload={handlePosterFileUpload}
        handleSaveEvent={handleSaveEvent}
      />

      {/* Toast Notification */}
      <Toast toastMessage={toastMessage} />
    </div>
  );
}
