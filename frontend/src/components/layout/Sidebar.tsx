'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Dumbbell,
  Video,
  User,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';

interface SidebarProps {
  role: 'admin' | 'client';
}

const adminMenuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Usuarios', icon: Users },
  { href: '/admin/renewals', label: 'Renovaciones', icon: RefreshCw },
  { href: '/admin/videos', label: 'Videos', icon: Video },
];

const clientMenuItems = [
  { href: '/client', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/client/profile', label: 'Perfil', icon: User },
  { href: '/client/training', label: 'Entrenamiento', icon: Dumbbell },
  { href: '/client/memberships', label: 'Membresías', icon: CreditCard },
  { href: '/client/support', label: 'Soporte', icon: HelpCircle },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const menuItems = role === 'admin' ? adminMenuItems : clientMenuItems;

  return (
    <div className="sticky top-0 flex h-screen w-64 flex-col bg-[#2D0A0A] border-r border-[#450A0A]/30">
      {/* Logo */}
      <div className="flex h-24 items-center justify-center px-4">
        <Image
          src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1757729690/Forcegym_1_nxwdfw.png"
          alt="ForceGym Logo"
          width={180}
          height={60}
          className="h-auto w-auto"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-[#ff0400] text-white shadow-lg shadow-[#ff0400]/20'
                  : 'text-gray-400 hover:bg-[#404040] hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
