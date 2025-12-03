'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import UserMenu from './UserMenu'
import { useAuthContext } from '@/providers/AuthProvider'

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(17, 24, 39, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ height: '85px' }}>
          {/* Logo (left) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1757729690/Forcegym_1_nxwdfw.png"
                alt="Forcegym"
                width={220}
                height={70}
                priority
                className="transition-all duration-500 hover:brightness-110"
                style={{ height: '125px', width: 'auto', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}
              />
            </Link>
          </div>

          {/* Centered Navigation (desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex items-center" style={{ gap: '48px' }}>
              {[
                { href: '/', label: 'Inicio' },
                { href: '/subscripcions', label: 'Planes' },
                ...(isAuthenticated ? [{ href: '/videos', label: 'Videos' }] : []),
                { href: '/contact', label: 'Contacto' }
              ].map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative font-bold px-6 py-3 transition-all duration-300"
                    style={{
                      fontSize: '17px',
                      color: active ? '#ef4444' : '#ffffff',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = '#ef4444'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = '#ffffff'
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Actions (right) */}
          <div className="hidden md:flex items-center" style={{ gap: '20px' }}>
            {isAuthenticated ? (
              <UserMenu userName={user?.name || 'Usuario'} userImage={user?.image} />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="font-medium px-5 py-2 transition-all duration-300 rounded-md"
                  style={{ 
                    fontSize: '15px',
                    color: '#ffffff',
                    letterSpacing: '0.2px',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ef4444'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff'
                  }}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/auth/register" 
                  className="font-medium px-5 py-2 transition-all duration-300 rounded-md flex items-center gap-2"
                  style={{
                    fontSize: '15px',
                    background: '#ef4444',
                    color: '#ffffff',
                    letterSpacing: '0.2px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#dc2626'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ef4444'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Únete
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 transition-all duration-400 rounded-lg backdrop-blur-sm"
              style={{ 
                color: '#ffffff',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ef4444'
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div 
              className="px-6 pt-6 pb-8 rounded-xl mt-4 backdrop-blur-lg"
              style={{
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                gap: '12px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              {[
                { href: '/', label: 'Inicio' },
                { href: '/subscripcions', label: 'Planes' },
                ...(isAuthenticated ? [{ href: '/videos', label: 'Videos' }] : []),
                { href: '/contact', label: 'Contacto' }
              ].map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-semibold px-5 py-4 rounded-lg transition-all duration-300"
                    style={{ 
                      color: active ? '#ef4444' : '#ffffff',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                      fontSize: '17px',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = '#ef4444'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = '#ffffff'
                      }
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}

              {isAuthenticated ? (
                <div className="mt-4 px-4">
                  <UserMenu userName={user?.name || 'Usuario'} userImage={user?.image} />
                </div>
              ) : (
                <div style={{ paddingTop: '20px', gap: '16px', display: 'flex', flexDirection: 'column' }}>
                  <Link
                    href="/auth/login"
                    className="font-medium px-5 py-3 rounded-md transition-all duration-300 text-center"
                    style={{ 
                      color: '#ffffff',
                      fontSize: '16px',
                      letterSpacing: '0.2px',
                      background: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ef4444'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    href="/auth/register"
                    className="font-medium px-5 py-3 rounded-md transition-all duration-300 text-center flex items-center justify-center gap-2"
                    style={{
                      fontSize: '16px',
                      background: '#ef4444',
                      color: '#ffffff',
                      letterSpacing: '0.2px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#dc2626'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#ef4444'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Únete
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar