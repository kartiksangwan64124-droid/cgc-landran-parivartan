export type ActivePage =
  | 'dashboard'
  | 'explore'
  | 'navigation'
  | 'events'
  | 'event-details'
  | 'about'
  | 'admin';

export interface CampusBuilding {
  id: string;
  code: string;
  name: string;
  shortName: string;
  category: 'Entrance' | 'Academic' | 'Library' | 'Auditorium' | 'Cafeteria' | 'Sports' | 'Parking' | string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  accentColor: string;
  floors: string;
  hours: string;
  description: string;
  beginnerTip: string;
  facilities: string[];
  waypoints?: [number, number, number][];
}

export interface CampusCategory {
  id: string;
  name: string;
  color: string;
  bg: string;
}

export interface PosterTheme {
  id: string;
  label: string;
  gradient: string;
  accent: string;
  pattern: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venueId: string;
  organizer: string;
  status: 'Upcoming' | 'Completed' | string;
  isSample: boolean;
  featured: boolean;
  registrationsCount: number;
  posterTheme: string;
  customPosterUrl?: string;
  description: string;
  agenda?: string[];
}

export interface RouteStep {
  title: string;
  detail: string;
  icon: 'start' | 'walk' | 'straight' | 'turn' | 'finish';
}

export interface CampusRoute {
  startBuilding: CampusBuilding;
  endBuilding: CampusBuilding;
  points: [number, number, number][];
  distanceMeters: number;
  walkMinutes: number;
  steps: RouteStep[];
}

export interface VisitorRegForm {
  fullName: string;
  visitorType: string;
  email: string;
  institution: string;
}

export interface VisitorTicket {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  visitorType: string;
  email: string;
  institution: string;
  venueName: string;
  date: string;
  time: string;
  timestamp: string;
}

export interface VisitorRegistration extends VisitorTicket {}

export interface EventFormData {
  title: string;
  category: string;
  date: string;
  time: string;
  venueId: string;
  organizer: string;
  status: string;
  featured: boolean;
  posterTheme: string;
  customPosterUrl: string;
  description: string;
  agendaText: string;
}

export interface ToastMessage {
  text: string;
  type: 'success' | 'info' | 'error';
}

