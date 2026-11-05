import { CampusEvent } from '../types';

// Sample Events Dataset (Explicitly marked as Sample / Demo Events)
export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-101',
    title: 'TechHorizon 2025 – National AI & Robotics Expo',
    category: 'Technical',
    date: '2025-05-18',
    time: '09:30 AM – 04:30 PM',
    venueId: 'block-2',
    organizer: 'Department of Computer Science & Innovation Cell',
    status: 'Upcoming',
    isSample: true,
    featured: true,
    registrationsCount: 142,
    posterTheme: 'theme-indigo',
    customPosterUrl: '',
    description:
      'A sample demonstration showcase of student-built autonomous rovers, generative AI prototypes, and interactive coding challenges designed for visiting high school students and freshers.',
    agenda: [
      '09:30 AM – Registration & Welcome Kit at Block 2 Foyer',
      '10:15 AM – Live Robotics Arena Demonstration',
      '12:00 PM – Hands-on Prompt Engineering Mini-Lab',
      '02:30 PM – Project Pitch & Visitor Q&A'
    ]
  },
  {
    id: 'evt-102',
    title: 'Fresher & Visiting School Student Campus Orientation',
    category: 'Orientation',
    date: '2025-05-20',
    time: '10:00 AM – 01:00 PM',
    venueId: 'auditorium',
    organizer: 'Student Welfare & Admissions Guidance Wing',
    status: 'Upcoming',
    isSample: true,
    featured: true,
    registrationsCount: 310,
    posterTheme: 'theme-emerald',
    customPosterUrl: '',
    description:
      'Sample introductory session welcoming prospective students, parents, and school delegations. Includes an overview of academic tracks, campus life, and guided walking tours.',
    agenda: [
      '10:00 AM – Welcome Address at Main Auditorium',
      '11:00 AM – Interactive Q&A with Senior Student Ambassadors',
      '11:45 AM – Guided 3D & Physical Campus Walkthrough',
      '12:30 PM – Refreshments at Central Cafeteria'
    ]
  },
  {
    id: 'evt-103',
    title: 'Rhythm & Roots – Spring Cultural Fest Showcase',
    category: 'Cultural',
    date: '2025-05-24',
    time: '02:00 PM – 07:00 PM',
    venueId: 'auditorium',
    organizer: 'Cultural Committee & Performing Arts Club',
    status: 'Upcoming',
    isSample: true,
    featured: true,
    registrationsCount: 275,
    posterTheme: 'theme-orange',
    customPosterUrl: '',
    description:
      'Sample cultural celebration featuring folk dances, battle of bands, theatre skits, and fine arts exhibitions in the Main Campus Auditorium.',
    agenda: [
      '02:00 PM – Inaugural Folk Dance Performance',
      '03:30 PM – Acoustic & Fusion Band Showcase',
      '05:00 PM – Theatre & Street Play Finals',
      '06:30 PM – Prize Distribution Ceremony'
    ]
  },
  {
    id: 'evt-104',
    title: 'Full-Stack Web & Cloud Architecture Bootcamp',
    category: 'Workshop',
    date: '2025-05-27',
    time: '11:00 AM – 03:30 PM',
    venueId: 'library',
    organizer: 'Digital Knowledge Center & Coding Guild',
    status: 'Upcoming',
    isSample: true,
    featured: false,
    registrationsCount: 88,
    posterTheme: 'theme-cyan',
    customPosterUrl: '',
    description:
      'Sample beginner-friendly workshop held in the Central Library Digital Wing introducing modern React UI design, 3D web graphics, and cloud deployment.',
    agenda: [
      '11:00 AM – UI/UX Design Systems Overview',
      '12:15 PM – Building Interactive Components',
      '02:00 PM – Live Deployment Lab'
    ]
  },
  {
    id: 'evt-105',
    title: 'Young Entrepreneurs & Startup Pitch Day',
    category: 'Seminar',
    date: '2025-06-02',
    time: '10:30 AM – 02:30 PM',
    venueId: 'block-4',
    organizer: 'Entrepreneurship Development Cell (Block 4)',
    status: 'Upcoming',
    isSample: true,
    featured: false,
    registrationsCount: 96,
    posterTheme: 'theme-purple',
    customPosterUrl: '',
    description:
      'Sample interactive seminar where student founders present retail, tech, and sustainability startup concepts to mentors and visiting students.',
    agenda: [
      '10:30 AM – Keynote: Idea to Campus Startup',
      '11:30 AM – Student Startup Pitch Deck Round',
      '01:15 PM – Networking & Mentor Feedback'
    ]
  },
  {
    id: 'evt-106',
    title: 'Inter-Departmental Athletics & Basketball Meet',
    category: 'Sports',
    date: '2025-04-12',
    time: '08:00 AM – 05:00 PM',
    venueId: 'sports',
    organizer: 'Department of Physical Education & Sports',
    status: 'Completed',
    isSample: true,
    featured: false,
    registrationsCount: 220,
    posterTheme: 'theme-emerald',
    customPosterUrl: '',
    description:
      'Sample completed sports tournament featuring 100m sprints, relay races, and floodlit basketball finals at the Sports Complex.',
    agenda: [
      '08:00 AM – Track & Field Heats',
      '11:30 AM – Basketball Semi-Finals',
      '03:30 PM – Championship Finals & Medals'
    ]
  }
];
