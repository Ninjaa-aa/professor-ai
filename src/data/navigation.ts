// data/navigation.ts
import { Home, MessageCircle, CreditCard, Phone } from 'lucide-react';
import { IconType } from '@/types/navigation.types';

interface NavigationItem {
  name: string;
  href: string;
  icon: IconType;
}

interface NavigationData {
  main: NavigationItem[];
}

export const navigationData: NavigationData = {
  main: [
    {
      name: 'Home',
      href: '/',
      icon: Home
    },
    {
      name: 'Chatbot',
      href: '/chatbot',
      icon: MessageCircle
    },
    {
      name: 'Pricing',
      href: '/pricing',
      icon: CreditCard
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: Phone
    }
  ]
};