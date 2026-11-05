export type ActiveTab =
  | 'dashboard'
  | 'explore'
  | 'navigation'
  | 'events'
  | 'about'
  | 'admin';

export type ActivePage = ActiveTab | 'event-details';

export type ViewPreset = 'isometric' | 'topdown' | 'gate';

export interface CampusBuilding {
  id: string;
  code: string;
  name: string;
  shortName: string;
  category: string;
  position: [number, number, number];
  size: [number, number, number];
  shape?: 'courtyard' | 'angled' | 'hostel' | 'turf' | 'elongated' | 'court' | 'dining' | 'park' | 'academic' | 'cafe' | 'twin' | string;
  color: string;
  accentColor: string;
  floors: string;
  hours: string;
  description: string;
  beginnerTip: string;
  facilities: string[];
  roadPoint?: [number, number, number];
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
  badgeClass?: string;
  venueId: string;
  venueName?: string;
  date: string;
  time: string;
  attendees?: string;
  organizer: string;
  image?: string;
  description: string;
  tags?: string[];
  status?: 'Upcoming' | 'Completed' | string;
  isSample?: boolean;
  featured?: boolean;
  registrationsCount?: number;
  posterTheme?: string;
  customPosterUrl?: string;
  agenda?: string[];
}

export interface RouteStep {
  title: string;
  detail: string;
  icon?: 'start' | 'walk' | 'straight' | 'turn' | 'finish' | 'arrow' | 'destination' | string;
}

export interface RouteInfo {
  distanceMeters: number;
  durationMinutes: number;
  calories: number;
  steps: RouteStep[];
  fromName: string;
  toName: string;
}

export interface CampusRoute {
  startBuilding: CampusBuilding;
  endBuilding: CampusBuilding;
  points: [number, number, number][];
  distanceMeters: number;
  walkMinutes: number;
  steps: RouteStep[];
}

export interface PassFormState {
  name: string;
  phone: string;
  email: string;
  purpose: string;
  date: string;
}

export interface GeneratedPass {
  code: string;
}

export interface AdminNewEvent {
  title: string;
  category: string;
  venueId: string;
  date: string;
  time: string;
  attendees: string;
  organizer: string;
  description: string;
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
