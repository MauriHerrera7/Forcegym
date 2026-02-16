'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, LogOut, Bell } from 'lucide-react';

interface DashboardHeaderProps {
  user?: {
    name: string;
    email: string;
    photo?: string;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-[#0A0A0A] px-6">
      <div />

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-[#404040] hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#ff0400]"></span>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[#404040]">
              <Avatar className="h-10 w-10 ring-2 ring-[#404040]">
                <AvatarImage src={user?.photo} alt={user?.name} />
                <AvatarFallback className="bg-[#ff0400] text-white font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#404040] border-[#404040]">
            <DropdownMenuLabel className="text-gray-300">Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#191919]" />
            <DropdownMenuItem asChild className="text-gray-300 focus:bg-[#191919] focus:text-white">
              <Link href="/client/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-gray-300 focus:bg-[#191919] focus:text-white">
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configuración
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#191919]" />
            <DropdownMenuItem
              className="text-[#ff3936] focus:bg-[#191919] focus:text-[#ff0400]"
              onClick={() => {
                // TODO: Implement logout
                console.log('Logout');
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
