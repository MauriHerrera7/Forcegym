"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Dumbbell,
  Video,
  User,
  HelpCircle,
  RefreshCw,
  X,
} from "lucide-react";
import { useSidebar } from "@/providers/SidebarProvider";

interface SidebarProps {
  role: "admin" | "client";
}

const adminMenuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Usuarios", icon: Users },
  { href: "/admin/payments", label: "Pagos", icon: CreditCard },
  { href: "/admin/renewals", label: "Renovaciones", icon: RefreshCw },
];

const clientMenuItems = [
  { href: "/client", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/profile", label: "Perfil", icon: User },
  { href: "/client/training", label: "Entrenamiento", icon: Dumbbell },
  { href: "/client/memberships", label: "Membresías", icon: CreditCard },
  { href: "/client/support", label: "Soporte", icon: HelpCircle },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  const menuItems = role === "admin" ? adminMenuItems : clientMenuItems;

  // Prevents hydration mismatch: SSR renders sidebar as closed, client syncs after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Mobile Backdrop — only rendered client-side to avoid SSR mismatch */}
      {mounted && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-[#2D0A0A] border-r border-[#450A0A]/30 transition-transform duration-300 md:sticky md:top-0 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo & Close Button */}
        <div className="flex h-24 items-center justify-between px-6">
          <Link href="/" onClick={close}>
            <Image
              src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1757729690/Forcegym_1_nxwdfw.png"
              alt="ForceGym Logo"
              width={150}
              height={50}
              className="h-auto w-auto hover:opacity-80 transition-opacity"
              priority
            />
          </Link>
          <button
            onClick={close}
            className="rounded-lg p-2 text-gray-400 hover:bg-[#404040] hover:text-white md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#ff0400] text-white shadow-lg shadow-[#ff0400]/20"
                    : "text-gray-400 hover:bg-[#404040] hover:text-white",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
