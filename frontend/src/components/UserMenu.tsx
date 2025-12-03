'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

interface UserMenuProps {
  userImage?: string
  userName: string
}

export default function UserMenu({ userImage = '', userName }: UserMenuProps) {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cierra el menú al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/auth/login'
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500 hover:border-red-400 transition-colors duration-200">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-red-600 flex items-center justify-center text-white text-xl font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-gray-900 border border-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-2 border-b border-gray-800">
            <p className="text-sm text-white font-medium truncate">{userName}</p>
          </div>

          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Mi Perfil
          </Link>
          <Link
            href="/stats"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            📊 Mi Progreso
          </Link>
          <button
            onClick={() => {
              handleLogout()
              setIsOpen(false)
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}