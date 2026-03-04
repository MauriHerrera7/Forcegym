'use client';

import React from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User as UserIcon, Menu } from 'lucide-react';
import Link from 'next/link';
import { NotificationPanel } from './NotificationPanel';
import { useSidebar } from '@/providers/SidebarProvider';

interface DashboardHeaderProps {
  user?: {
    name: string;
    email: string;
    photo?: string;
  };
}

export function DashboardHeader({ user: propUser }: DashboardHeaderProps) {
  const { user: authUser, logout } = useAuthContext();
  const { toggle } = useSidebar();
  const [imgError, setImgError] = React.useState(false);

  // Fallback map matching old or new user state
  const firstName = authUser?.first_name || propUser?.name?.split(' ')[0] || '';
  const lastName = authUser?.last_name || propUser?.name?.split(' ').slice(1).join(' ') || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'Usuario';
  const email = authUser?.email || propUser?.email || '';
  
  const getSafePhoto = () => {
    const raw = (authUser?.profile_picture_url || authUser?.profile_picture || propUser?.photo);
    if (!raw || typeof raw !== 'string' || raw.length < 5) return undefined;
    
    const lower = raw.toLowerCase().trim();
    if (lower.includes('/null') || lower.includes('/undefined') || lower === 'null' || lower === 'undefined') return undefined;
    
    if (raw.startsWith('http')) return raw.trim();
    
    // If it's a relative path, prepend API URL
    if (raw.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      return `${cleanBase}${raw}`;
    }
    
    return undefined;
  }
  
  const photo = getSafePhoto();
  
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-[#0A0A0A] px-6 border-b border-[#404040]/30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggle}
          className="rounded-lg p-2 text-zinc-400 hover:bg-[#191919] hover:text-white md:hidden transition-colors"
          title="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <NotificationPanel />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[#404040]">
              <Avatar className="h-10 w-10 ring-2 ring-[#404040]">
                {photo && !imgError ? (
                  <AvatarImage 
                    src={photo} 
                    alt={fullName} 
                    onError={() => setImgError(true)} 
                  />
                ) : null}
                <AvatarFallback 
                  className="text-white font-bold flex items-center justify-center"
                  style={{ backgroundColor: '#ff0800' }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-white">{fullName}</p>
                <p className="text-xs text-gray-400">{email}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#404040] border-[#404040]">
            <DropdownMenuLabel className="text-gray-300 font-normal">Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#505050]" />
            <Link href={authUser?.role?.toUpperCase() === 'ADMIN' ? '/admin/profile' : '/client/profile'}>
              <DropdownMenuItem className="text-white focus:bg-[#505050] cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                Mi Perfil
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="bg-[#505050]" />
            <DropdownMenuItem
              className="text-[#ff3936] focus:bg-[#191919] focus:text-[#ff0400] cursor-pointer"
              onClick={() => logout()}
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

