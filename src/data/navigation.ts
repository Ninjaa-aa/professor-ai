// data/navigation.ts
import { NavSection } from '@/types/navigation';
import { Menu, X, Home, MessageCircle, CreditCard, Phone } from 'lucide-react';
export const navigationData: NavSection = {
    main: [
        { name: 'Home', icon: Home, href: '/' },
        {name: 'Chatbot', icon: MessageCircle, href: '/chatbot'},   
        {name: 'Pricing',icon: CreditCard, href: '/pricing'},
        {name: 'Contact Us',icon:Phone ,href: '/contact'}
    ]
};