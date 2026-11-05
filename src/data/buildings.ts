import { CampusBuilding } from '../types';

// CGC LANDRAN EXACT MAP DATABASE
// Reconstructed precisely from the official CGC Landran Campus Map:
export const CGC_MAP_BUILDINGS: CampusBuilding[] = [
  {
    id: 'block-1',
    code: 'BLK-01',
    name: 'Block 1 (Main Academic Block)',
    shortName: 'Block 1',
    category: 'Academic Blocks',
    position: [12, 0, -28],
    size: [13, 8.5, 12],
    shape: 'courtyard',
    color: '#5e72e4',
    accentColor: '#11cdef',
    floors: '4 Floors (G + 3)',
    hours: '8:30 AM – 5:00 PM',
    description:
      'Premier academic block located right near the Khapar-Banur Road main entrance. Houses the Central Dean Office, First-Year Applied Sciences, Computer Science & Engineering departments, and the main seminar auditoriums.',
    beginnerTip:
      'Enter from the Khapar-Banur Road main gate and take the immediate left boulevard. Look for the courtyard building with the signature teal Argon crest.',
    facilities: ['Dean & Director Secretariat', 'Smart Classrooms (101-140)', 'Central Physics & Chemistry Labs', 'Central Examination Hall'],
    roadPoint: [10, 0.35, -20]
  },
  {
    id: 'block-6',
    code: 'BLK-06',
    name: 'Block 6 (Information Technology & AI)',
    shortName: 'Block 6',
    category: 'Academic Blocks',
    position: [-2, 0, -27],
    size: [10, 8.0, 9],
    shape: 'angled',
    color: '#11cdef',
    accentColor: '#0da5c0',
    floors: '4 Floors (G + 3)',
    hours: '8:30 AM – 5:30 PM',
    description:
      'Dedicated software computing and AI/ML innovation facility. Features high-performance computing clusters, cloud server rooms, and student coding developer circles.',
    beginnerTip:
      'Located directly west of Block 1 along the north perimeter avenue, connected via paved walkway to Kalpana Hostel.',
    facilities: ['Advanced Cloud Computing Lab', 'AI & Machine Learning Hub', 'Software Testing Center', 'Faculty Research Lounge'],
    roadPoint: [-2, 0.35, -18]
  },
  {
    id: 'kalpana-hostel',
    code: 'HST-KL',
    name: 'Kalpana Hostel (Girls Residence)',
    shortName: 'Kalpana Hostel',
    category: 'Hostels',
    position: [-18, 0, -23],
    size: [12, 9.0, 10],
    shape: 'hostel',
    color: '#8965e0',
    accentColor: '#5e72e4',
    floors: '5 Floors (G + 4)',
    hours: 'Resident Access 24/7 (Visitors: 9 AM - 6 PM)',
    description:
      'Premier on-campus residence for female students with 24/7 security, high-speed Wi-Fi, reading halls, indoor gym, and in-house mess dining.',
    beginnerTip:
      'Situated in the quiet North-West quadrant right beside the expansive green COE sports ground.',
    facilities: ['Air-Cooled & AC Rooms', 'Dining Hall & Night Canteen', 'Gymnasium & Badminton Court', 'Resident Warden Office'],
    roadPoint: [-14, 0.35, -16]
  },
  {
    id: 'coe-ground',
    code: 'GRD-COE',
    name: 'COE Ground (Sports Arena)',
    shortName: 'COE Ground',
    category: 'Grounds & Parks',
    position: [-26, 0, -7],
    size: [18, 0.4, 24],
    shape: 'turf',
    color: '#2dce89',
    accentColor: '#ffffff',
    floors: 'Open Outdoor Arena',
    hours: '6:00 AM – 7:30 PM',
    description:
      'Major open sports field situated between Kalpana Hostel and Block 11/10. Used for football tournaments, cricket leagues, athletics conditioning, and NCC drills.',
    beginnerTip:
      'Walk along the West Avenue between Kalpana Hostel and Block 11 & 10 to access the spectator lawns.',
    facilities: ['Full-Size Football Pitch', 'Cricket Practice Pitches', 'Spectator Pavilion', 'Floodlight Night Towers'],
    roadPoint: [-14, 0.35, -4]
  },
  {
    id: 'block-11-10',
    code: 'BLK-11-10',
    name: 'Block 11 and 10 (Engineering Complex)',
    shortName: 'Block 11 & 10',
    category: 'Academic Blocks',
    position: [-38, 0, 1],
    size: [11, 10.5, 34],
    shape: 'elongated',
    color: '#32325d',
    accentColor: '#5e72e4',
    floors: '5 Floors (G + 4)',
    hours: '8:00 AM – 6:00 PM',
    description:
      'The largest academic building on campus spanning the entire western perimeter. Houses Chandigarh Engineering College mechanical workshops, robotics arenas, civil labs, and central research wings.',
    beginnerTip:
      'Follow the long West Arterial Road all the way past COE Ground. You cannot miss this massive elongated landmark complex.',
    facilities: ['Heavy Mechanical Workshops', 'Robotics & Automation Arena', 'Civil CAD & Structural Labs', '2x 300-Seat Amphitheaters'],
    roadPoint: [-26, 0.35, 6]
  },
  {
    id: 'parivartan-ground',
    code: 'GRD-PRV',
    name: 'Parivartan Ground (Cultural & Fest Arena)',
    shortName: 'Parivartan Ground',
    category: 'Grounds & Parks',
    position: [-22, 0, 22],
    size: [18, 0.4, 20],
    shape: 'turf',
    color: '#2dce89',
    accentColor: '#fb6340',
    floors: 'Festival Grounds + Grand Stage',
    hours: 'Open for Events & Student Gatherings',
    description:
      'Legendary home of CGC Landran’s annual national fest "PARIVARTAN". Featuring a grand performance stage, expansive manicured lawns, and festival exhibition pavilions.',
    beginnerTip:
      'Located at the south-western quadrant past the Count and Block 11/10 walkway.',
    facilities: ['Concert Main Stage', 'Sound & Light Control Booth', 'Exhibition Stalls Zone', 'Open Air Amphitheater Seating'],
    roadPoint: [-11, 0.35, 18]
  },
  {
    id: 'count',
    code: 'ACT-CNT',
    name: 'Count (Recreation & Court Sports)',
    shortName: 'Count',
    category: 'Grounds & Parks',
    position: [-10, 0, -2],
    size: [7, 2.5, 7],
    shape: 'court',
    color: '#fb6340',
    accentColor: '#ffd600',
    floors: 'Synthetic Flooring Court',
    hours: '6:30 AM – 8:00 PM',
    description:
      'Dedicated synthetic court area for basketball, lawn tennis, and student recreational activities. Marked with the prominent orange target icon on the campus map.',
    beginnerTip:
      'Located right between the central crossroads and the path leading to COE Ground.',
    facilities: ['All-Weather Basketball Court', 'Safety Net Enclosure', 'Reflective LED Night Lights', 'Equipment Locker'],
    roadPoint: [-5, 0.35, -2]
  },
  {
    id: 'sip-n-bit',
    code: 'FD-SNB',
    name: 'Sip-n-bit (Central Food Court & Lounge)',
    shortName: 'Sip-n-bit',
    category: 'Food & Dining',
    position: [2, 0, 4],
    size: [11, 5.0, 12],
    shape: 'dining',
    color: '#f5365c',
    accentColor: '#fb6340',
    floors: '2 Levels (Food Hall + Rooftop Patio)',
    hours: '8:00 AM – 9:30 PM (Daily)',
    description:
      'The bustling heartbeat of CGC Landran student life. Features multi-cuisine dining outlets, espresso cafes, fast-food counters, and shaded outdoor parasol seating.',
    beginnerTip:
      'Centrally located right along the main north-south pedestrian spine opposite Central Park and Herbal Garden.',
    facilities: ['Subway & Italian Kiosks', 'Traditional Punjabi Thali Counter', 'Outdoor Courtyard Patio', 'Digital Express Kiosks'],
    roadPoint: [2, 0.35, -2]
  },
  {
    id: 'central-park',
    code: 'PRK-CTL',
    name: 'Central Park (Lush Campus Green)',
    shortName: 'Central Park',
    category: 'Grounds & Parks',
    position: [14, 0, -14],
    size: [16, 0.35, 15],
    shape: 'park',
    color: '#2dce89',
    accentColor: '#11cdef',
    floors: 'Landscaped Botanical Greenery',
    hours: 'Open 24/7',
    description:
      'Lush green central lawn adorned with flowering shrubs, shaded stone benches, central artistic fountain, and paved circular walking pathways for student relaxation.',
    beginnerTip:
      'Located directly in the center of the campus, bordered by Block 1, Block 3, and Sip-n-bit.',
    facilities: ['Aesthetic Center Fountain', 'Paved Walking Promenade', 'Solar Garden Lights', 'Quiet Study Benches'],
    roadPoint: [6, 0.35, -12]
  },
  {
    id: 'block-3',
    code: 'BLK-03',
    name: 'Block 3 (Applied Management & Commerce)',
    shortName: 'Block 3',
    category: 'Academic Blocks',
    position: [31, 0, -17],
    size: [15, 8.5, 9],
    shape: 'academic',
    color: '#5e72e4',
    accentColor: '#2dce89',
    floors: '4 Floors (G + 3)',
    hours: '8:30 AM – 5:00 PM',
    description:
      'Major academic block on the East Avenue. Houses MBA, BBA, B.Com classrooms, corporate boardroom simulators, and the CGC Landran Finance Center.',
    beginnerTip:
      'Walk east along the promenade past Central Park. Block 3 is situated directly north of CDX and Tagore Block.',
    facilities: ['Stock Trading Simulation Lab', 'Corporate Interview Rooms', 'Business Library Annex', 'Faculty Research Chambers'],
    roadPoint: [21, 0.35, -12]
  },
  {
    id: 'cdx',
    code: 'FD-CDX',
    name: 'CDX (Cafe, Bakery & Student Express)',
    shortName: 'CDX',
    category: 'Food & Dining',
    position: [21, 0, -3],
    size: [8, 4.5, 8],
    shape: 'cafe',
    color: '#fb6340',
    accentColor: '#11cdef',
    floors: 'Single Level Cafe Pavilion',
    hours: '8:30 AM – 8:30 PM',
    description:
      'Popular eastern campus cafe hub featuring freshly baked pastries, specialty coffee, smoothies, and quick snacks right next to Block 4 Tagore Block.',
    beginnerTip:
      'Nestled between Central Park, Block 4 Tagore Block, and Basera Hostel. Look for the yellow coffee marker!',
    facilities: ['Barista Coffee Counter', 'Bakery & Dessert Section', 'Co-Working Counter Benches', 'Phone Charging Bar'],
    roadPoint: [14, 0.35, -2]
  },
  {
    id: 'block-4-tagore',
    code: 'BLK-04',
    name: 'Block 4 Tagore Block (Humanities & Basic Sciences)',
    shortName: 'Tagore Block',
    category: 'Academic Blocks',
    position: [33, 0, -4],
    size: [10, 8.0, 9],
    shape: 'academic',
    color: '#11cdef',
    accentColor: '#5e72e4',
    floors: '4 Floors (G + 3)',
    hours: '8:30 AM – 5:00 PM',
    description:
      'Named in honor of Rabindranath Tagore, this wing houses Department of Basic Sciences, Language Labs, Creative Arts Studio, and Student Grievance Cell.',
    beginnerTip:
      'Directly adjacent to CDX cafe and just north of the Basera Hostel courtyard.',
    facilities: ['Digital Language Laboratory', 'Fine Arts & Drama Studio', 'Mathematics & Stats Lab', 'Student Council Office'],
    roadPoint: [24, 0.35, 1]
  },
  {
    id: 'basera-hostel',
    code: 'HST-BSR',
    name: 'Basera Hostel (Boys Residence)',
    shortName: 'Basera Hostel',
    category: 'Hostels',
    position: [24, 0, 7],
    size: [12, 9.0, 9],
    shape: 'hostel',
    color: '#8965e0',
    accentColor: '#11cdef',
    floors: '5 Floors (G + 4)',
    hours: 'Resident Access 24/7',
    description:
      'Spacious boys’ residential facility with dedicated study halls, sports equipment rental, high-speed campus intranet, and mess facility.',
    beginnerTip:
      'Located directly south of CDX and overlooking the serene Herbel Garden on its southern flank.',
    facilities: ['Spacious 2/3 Seater Rooms', 'Indoor Table Tennis Room', 'Common Television Lounge', 'Medical First-Aid Room'],
    roadPoint: [15, 0.35, 7]
  },
  {
    id: 'herbel-garden',
    code: 'GRD-HRB',
    name: 'Herbel Garden (Botanical & Medicinal Flora)',
    shortName: 'Herbel Garden',
    category: 'Grounds & Parks',
    position: [18, 0, 19],
    size: [13, 0.35, 11],
    shape: 'park',
    color: '#2dce89',
    accentColor: '#8965e0',
    floors: 'Medicinal Flora & Nursery',
    hours: '7:00 AM – 6:30 PM',
    description:
      'Specialized botanical sanctuary curated with over 150+ species of Ayurvedic, herbal, and therapeutic plants utilized by Pharmacy and Biotechnology students.',
    beginnerTip:
      'Walk south past Basera Hostel. A tranquil green oasis perfect for calm reflection and botanical study.',
    facilities: ['Ayurvedic Medicinal Beds', 'Greenhouse Plant Nursery', 'Paved Cobblestone Trails', 'Botanical Info Plates'],
    roadPoint: [12, 0.35, 18]
  },
  {
    id: 'santhikunj-hostel',
    code: 'HST-SKJ',
    name: 'Santhikunj Hostel (Senior Student Residence)',
    shortName: 'Santhikunj Hostel',
    category: 'Hostels',
    position: [14, 0, 31],
    size: [13, 8.5, 8],
    shape: 'hostel',
    color: '#8965e0',
    accentColor: '#f5365c',
    floors: '4 Floors (G + 3)',
    hours: 'Resident Access 24/7',
    description:
      'Peaceful residential quarters located at the quiet southern edge of the campus, featuring dedicated study wings for senior year and postgraduate scholars.',
    beginnerTip:
      'Located at the south-most end of the campus, past Herbel Garden and adjacent to the Thomson Block loop.',
    facilities: ['Single & Double Occupancy', 'Silent Study Floor', 'High-Speed LAN Ports', 'Dining Hall Annex'],
    roadPoint: [10, 0.35, 27]
  },
  {
    id: 'block-8-thomson',
    code: 'BLK-08',
    name: 'Block 8 Thomson Block (Pharmacy & Biotech Wings)',
    shortName: 'Thomson Block',
    category: 'Academic Blocks',
    position: [29, 0, 26],
    size: [15, 9.5, 16],
    shape: 'twin',
    color: '#172b4d',
    accentColor: '#fb6340',
    floors: '5 Floors (G + 4 Twin Blocks)',
    hours: '8:30 AM – 5:30 PM',
    description:
      'Prestigious research-driven twin academic block (Block 8) dedicated to Chandigarh College of Pharmacy and Applied Biotechnology. Characterized by two parallel long blocks joined by an elevated skybridge walkway.',
    beginnerTip:
      'Located on the South-East corner of campus right across from Santhikunj Hostel and Herbel Garden.',
    facilities: ['Formulation & Pharmaceutics Labs', 'Microbiology Clean Rooms', 'Biotech Animal Cell Culture Lab', '200-Seat Seminar Auditorium'],
    roadPoint: [22, 0.35, 25]
  }
];

export const CAMPUS_BUILDINGS = CGC_MAP_BUILDINGS;
