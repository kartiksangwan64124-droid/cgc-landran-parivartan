import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Theater,
  Coffee,
  Trophy,
  Car,
  DoorOpen,
  Building2
} from 'lucide-react';

interface BuildingCategoryIconProps {
  category: string;
  className?: string;
}

export function BuildingCategoryIcon({ category, className = 'w-4 h-4' }: BuildingCategoryIconProps) {
  switch (category) {
    case 'Academic':
      return <GraduationCap className={className} />;
    case 'Library':
      return <BookOpen className={className} />;
    case 'Auditorium':
      return <Theater className={className} />;
    case 'Cafeteria':
      return <Coffee className={className} />;
    case 'Sports':
      return <Trophy className={className} />;
    case 'Parking':
      return <Car className={className} />;
    case 'Entrance':
      return <DoorOpen className={className} />;
    default:
      return <Building2 className={className} />;
  }
}

