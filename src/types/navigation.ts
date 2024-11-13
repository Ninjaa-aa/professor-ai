// types/navigation.ts
import { LucideIcon } from 'lucide-react';


export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  main: NavItem[];
}