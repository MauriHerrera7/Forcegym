'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'
import Container from '@/components/Container'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  isLoggedIn?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false }) => {
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
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        scrolled
          ? 'bg-black/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
          : 'bg-transparent backdrop-blur-0 shadow-none'
      ].join(' ')}
    >
      <Container>
  <div className="grid grid-cols-3 items-center h-16 lg:h-28">
          {/* Logo (left) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1757705905/Forcegym_nwhlvh.png"
                alt="Forcegym"
                width={96}
                height={96}
                className="rounded-lg size-16 md:size-20 lg:size-24 hover:scale-110 transition-transform duration-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
              />
            </Link>
          </div>

          {/* Centered Navigation (desktop) */}
          <div className="hidden md:flex justify-center">
            <nav className="flex items-center gap-10">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/subscripcion', label: 'Planes' },
                { href: '/contact', label: 'Contacto' }
              ].map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      'relative group font-semibold px-2 py-1',
                      active ? 'text-white' : 'text-white/80 hover:text-white'
                    ].join(' ')}
                  >
                    <span className="px-1">
                      {item.label}
                      <span
                        className={[
                          'absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0',
                          'bg-[linear-gradient(90deg,rgba(239,68,68,0.9),rgba(249,115,22,0.9))]',
                          'transition-transform duration-300 group-hover:scale-x-100',
                          active ? 'scale-x-100' : ''
                        ].join(' ')}
                      />
                    </span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Actions (right) */}
          <div className="hidden md:flex justify-end items-center gap-5">
            {isLoggedIn ? (
              <Link
                href="/profile"
                className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                Perfil
              </Link>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="text-white/80 hover:text-white transition-colors duration-200 font-medium px-3 py-2 rounded-none bg-white/0 hover:bg-white/10"
                >
                  Iniciar Sesión
                </Link>
                <Link href="/auth?mode=register" className="inline-flex">
                  <Button size="md" variant="primary" className="px-8 rounded-xl">Únete</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button (right-most cell overlaid) */}
          <div className="md:hidden col-start-3 justify-self-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/90 focus:outline-none transition-colors duration-200 p-2 rounded-md bg-white/0 hover:bg-white/10"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-3 py-3 space-y-2 bg-black/70 backdrop-blur-md rounded-xl border border-red-500/20">
              <Link
                href="/"
                className="block text-white/90 hover:text-white px-3 py-2 transition-colors duration-200 font-medium rounded-lg hover:bg-red-500/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/subscripcion"
                className="block text-white/90 hover:text-white px-3 py-2 transition-colors duration-200 font-medium rounded-lg hover:bg-red-500/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Planes
              </Link>
              <Link
                href="/contact"
                className="block text-white/90 hover:text-white px-3 py-2 transition-colors duration-200 font-medium rounded-lg hover:bg-red-500/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>

              {isLoggedIn ? (
                <Link
                  href="/profile"
                  className="block text-white/90 hover:text-white px-3 py-2 transition-colors duration-200 font-medium rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Perfil
                </Link>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href="/auth"
                    className="block text-white/90 hover:text-white px-3 py-2 transition-colors duration-200 font-medium rounded-none text-center bg-white/0 hover:bg-red-500/10 border border-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link href="/auth?mode=register" className="inline-flex">
                    <Button size="md" className="w-full justify-center">Únete</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
  </Container>
      {/* Gradient hairline (only when scrolled) */}
      {scrolled && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      )}
    </nav>
  )
}

export default Navbar