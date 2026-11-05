import { CampusBuilding } from '../types';

// Schematic Campus Buildings & Pathway Graph Dataset
// Architectural schematic coordinates for interactive 3D demonstration
export const CAMPUS_BUILDINGS: CampusBuilding[] = [
  {
    id: 'main-entrance',
    code: 'GATE-01',
    name: 'Main Entrance Gate & Visitor Info Plaza',
    shortName: 'Main Entrance Gate',
    category: 'Entrance',
    position: [0, 0, 38],
    size: [14, 5.5, 4],
    color: '#5e72e4',
    accentColor: '#11cdef',
    floors: 'Ground Level + Security Canopy',
    hours: 'Open 24/7 (Visitor Desk: 8:00 AM – 6:00 PM)',
    description:
      'Primary welcome gateway for school students, freshers, parents, and guests visiting CGC Landran. Houses the Visitor Registration Kiosk, Campus Map Totem, and Security Assistance Desk.',
    beginnerTip:
      'Start your campus tour here! Collect your visitor pass at the right-hand kiosk before heading straight up the Central Academic Avenue.',
    facilities: [
      'Visitor Pass & Inquiry Kiosk',
      'Digital Campus Wayfinding Screen',
      'Security & First-Aid Post',
      'Shuttle Pick-up & Drop-off Zone'
    ],
    waypoints: [
      [0, 0.2, 38],
      [0, 0.2, 28]
    ]
  },
  {
    id: 'block-1',
    code: 'BLK-01',
    name: 'Block 1 – Engineering & Technology',
    shortName: 'Block 1 Engineering',
    category: 'Academic',
    position: [-22, 0, 16],
    size: [14, 10, 10],
    color: '#5e72e4',
    accentColor: '#485fe0',
    floors: '4 Floors (G + 3)',
    hours: '8:30 AM – 5:00 PM (Mon – Sat)',
    description:
      'Core engineering academic wing (Chandigarh Engineering College) featuring foundational laboratories, smart lecture theaters, faculty cabins, and the First-Year Student Orientation Helpdesk.',
    beginnerTip:
      'Walk straight from the Main Entrance to the First Crossroad, then turn left along West Academic Walk.',
    facilities: [
      'Smart Lecture Halls (101–408)',
      'Mechanical, Civil & Electronics Labs',
      'First-Year Student Support Cell',
      'Drinking Water & Student Common Area'
    ],
    waypoints: [
      [-22, 0.2, 16],
      [-12, 0.2, 16],
      [0, 0.2, 16]
    ]
  },
  {
    id: 'block-2',
    code: 'BLK-02',
    name: 'Block 2 – Management & IT Center',
    shortName: 'Block 2 Mgmt & IT',
    category: 'Academic',
    position: [22, 0, 16],
    size: [14, 11, 10],
    color: '#11cdef',
    accentColor: '#0da5c0',
    floors: '5 Floors (G + 4)',
    hours: '8:30 AM – 6:00 PM (Mon – Sat)',
    description:
      'Dedicated hub for Computer Science, Information Technology, MBA & Management programs, software development labs, and high-speed computing studios.',
    beginnerTip:
      'From the Main Entrance, walk up to the First Crossroad and turn right toward the cyan-trimmed glass building.',
    facilities: [
      'High-Performance Computing & IT Labs',
      'Harvard-Style Management Case Amphitheaters',
      'AI & Coding Club Studio',
      '200-Seat Technical Seminar Hall'
    ],
    waypoints: [
      [22, 0.2, 16],
      [12, 0.2, 16],
      [0, 0.2, 16]
    ]
  },
  {
    id: 'library',
    code: 'LIB-01',
    name: 'Central Library & Digital Knowledge Center',
    shortName: 'Central Library',
    category: 'Library',
    position: [-20, 0, -2],
    size: [13, 9, 11],
    color: '#2dce89',
    accentColor: '#24a46d',
    floors: '3 Floors + Glass Atrium',
    hours: '8:00 AM – 8:00 PM (Mon – Sat)',
    description:
      'Quiet academic sanctuary equipped with 100,000+ textbook volumes, IEEE/Springer e-journals, digital workstations, and collaborative study pods for students.',
    beginnerTip:
      'Located right beside the Central Campus Plaza on the west side—look for the emerald-accented glass atrium dome.',
    facilities: [
      'Digital Repository & E-Journal Terminals',
      'Silent Reading Hall (350+ Seats)',
      'Book Bank & Automated Issue Counter',
      'Group Discussion Rooms'
    ],
    waypoints: [
      [-20, 0.2, -2],
      [-10, 0.2, -2],
      [0, 0.2, -2]
    ]
  },
  {
    id: 'auditorium',
    code: 'AUD-01',
    name: 'Main Campus Auditorium & Convention Hall',
    shortName: 'Auditorium',
    category: 'Auditorium',
    position: [21, 0, -2],
    size: [15, 10.5, 13],
    color: '#fb6340',
    accentColor: '#ea4c28',
    floors: 'Main Tier + Balcony Gallery',
    hours: 'Open During Scheduled Events & Orientations',
    description:
      'Premier venue for college orientations, cultural festivals, keynote speaker sessions, inter-school competitions, and annual convocation ceremonies.',
    beginnerTip:
      'Walk straight up Central Avenue to the Central Plaza Fountain and turn right toward the grand orange-accented convention facade.',
    facilities: [
      '1,000+ Capacity Acoustical Seating',
      'Professional Stage Lighting & AV System',
      'Green Rooms & VIP Hospitality Lounge',
      'Event Registration Foyer'
    ],
    waypoints: [
      [21, 0.2, -2],
      [10, 0.2, -2],
      [0, 0.2, -2]
    ]
  },
  {
    id: 'block-3',
    code: 'HUB-03',
    name: 'Innovation & Startup Hub (Incubation Center)',
    shortName: 'Innovation & Startup Hub',
    category: 'Academic',
    position: [-22, 0, -20],
    size: [14, 9.5, 10],
    color: '#8965e0',
    accentColor: '#6f42c1',
    floors: '4 Floors (G + 3)',
    hours: '8:30 AM – 6:30 PM (Mon – Sat)',
    description:
      'Campus entrepreneurship and research incubation center featuring startup co-working bays, prototyping maker-labs, patent facilitation cell, and pitch arenas.',
    beginnerTip:
      'Continue past the Central Library along the northern corridor and turn left at the North Junction.',
    facilities: [
      'Student Startup Incubation Pods',
      'IoT, 3D Printing & Rapid Prototyping Lab',
      'Intellectual Property & Patent Cell',
      'Investor Pitch & Mentorship Boardroom'
    ],
    waypoints: [
      [-22, 0.2, -20],
      [-11, 0.2, -20],
      [0, 0.2, -20]
    ]
  },
  {
    id: 'block-4',
    code: 'ADM-04',
    name: 'Central Administrative Block (Admin & Admissions)',
    shortName: 'Admin Block',
    category: 'Academic',
    position: [22, 0, -20],
    size: [14, 9.5, 10],
    color: '#5e72e4',
    accentColor: '#825ee4',
    floors: '4 Floors (G + 3)',
    hours: '9:00 AM – 5:00 PM (Mon – Sat)',
    description:
      'Central administrative headquarters housing the Admissions Counseling Hall, Registrar Office, Student Welfare Wing, Accounts Counter, and Placement Cell.',
    beginnerTip:
      'Walk past the Main Auditorium along the central boulevard and turn right at the North Junction.',
    facilities: [
      'New Student Admissions & Counseling Lounge',
      'Central Placement & Corporate Relations Cell',
      'Registrar, Scholarship & Fee Helpdesk',
      'International Student Affairs Office'
    ],
    waypoints: [
      [22, 0.2, -20],
      [11, 0.2, -20],
      [0, 0.2, -20]
    ]
  },
  {
    id: 'cafeteria',
    code: 'CAF-01',
    name: 'Student Cafeteria & Multi-Cuisine Food Court',
    shortName: 'Student Cafeteria',
    category: 'Cafeteria',
    position: [-14, 0, -35],
    size: [13, 6, 9],
    color: '#f5365c',
    accentColor: '#d9254b',
    floors: 'Ground Indoor Hall + Outdoor Patio',
    hours: '8:00 AM – 7:30 PM (Daily)',
    description:
      'Vibrant student hangout hub offering hygienic meals, snacks, beverages, bakery counters, and shaded outdoor courtyard tables.',
    beginnerTip:
      'Follow the Central Avenue straight toward the north end of the campus; you will spot the red-trimmed food court plaza on your left.',
    facilities: [
      'Multi-Cuisine Hot Meal Counters',
      'Juice, Coffee & Bakery Kiosks',
      'Digital Token & UPI Express Billing',
      'Shaded Outdoor Garden Seating'
    ],
    waypoints: [
      [-14, 0.2, -35],
      [0, 0.2, -35],
      [0, 0.2, -20]
    ]
  },
  {
    id: 'sports',
    code: 'SPT-01',
    name: 'Sports Complex & Athletics Stadium',
    shortName: 'Sports Complex & Stadium',
    category: 'Sports',
    position: [18, 0, -36],
    size: [20, 4.5, 14],
    color: '#2dce89',
    accentColor: '#11cdef',
    floors: 'Outdoor Turf + Indoor Pavilion',
    hours: '6:00 AM – 7:00 PM (Daily)',
    description:
      'Expansive athletics arena featuring a multi-purpose sports turf, basketball and volleyball courts, athletics track, and indoor table-tennis & fitness pavilion.',
    beginnerTip:
      'Located at the north-east corner of the campus opposite the Student Cafeteria.',
    facilities: [
      'Athletics Track & Football Stadium Turf',
      'Floodlit Basketball & Volleyball Courts',
      'Indoor Badminton & Fitness Center',
      'Spectator Pavilion & Locker Rooms'
    ],
    waypoints: [
      [18, 0.2, -36],
      [0, 0.2, -35],
      [0, 0.2, -20]
    ]
  },
  {
    id: 'parking',
    code: 'PRK-01',
    name: 'Campus Parking Zone (Visitor & Bus Bays)',
    shortName: 'Campus Parking Zone',
    category: 'Parking',
    position: [25, 0, 32],
    size: [16, 2.2, 10],
    color: '#8898aa',
    accentColor: '#525f7f',
    floors: 'Surface Level Bays',
    hours: '6:00 AM – 9:00 PM',
    description:
      'Organized parking zone right inside the eastern entrance loop with dedicated bays for visitor cars, school buses, two-wheelers, and EV charging points.',
    beginnerTip:
      'Immediately after entering the Main Gate, take the first right turn into the paved parking bays.',
    facilities: [
      'Visitor Car & School Bus Bays',
      'Two-Wheeler Covered Sheds',
      'EV Charging Kiosk',
      'Direct Pedestrian Footpath to Main Avenue'
    ],
    waypoints: [
      [25, 0.2, 32],
      [12, 0.2, 28],
      [0, 0.2, 28]
    ]
  }
];
