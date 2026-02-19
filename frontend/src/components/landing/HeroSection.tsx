'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import Link from 'next/link'

interface Slide {
  id: number
  image: string
  title: string
  description: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_1920,h_1080/v1757706127/home5_u0gjut.png",
    title: "Acceso Inteligente 24/7",
    description: "Tecnología QR sincronizada para que entrenes sin límites, cuando quieras."
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_1920,h_1080/v1757705950/home1_kloc1u.png",
    title: "Seguimiento Biométrico",
    description: "Monitorea tu progreso real desde tu dashboard personal en tiempo real."
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757738254/gym_ntrfn0.png",
    title: "Equipamiento Pro Elite",
    description: "Entrena con la mejor maquinaria del mercado diseñada para resultados."
  }
]

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black flex items-center">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover brightness-[0.35] contrast-[1.1]"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-1" />
      </div>

      <Container className="relative z-10 pt-20">
        <div className="max-w-4xl">
          {/* Manifesto Intro */}
          <div className="fade-up mb-8 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-red-600" />
              <span className="text-red-600 font-bold tracking-[0.4em] uppercase text-xs md:text-sm">Force Performance Elite</span>
            </div>
            <h2 className="text-white/80 font-bold text-sm md:text-xl italic uppercase tracking-tight max-w-2xl border-l-4 border-red-600 pl-6 bg-red-600/5 py-4 backdrop-blur-sm">
                Transformamos tu potencial en fuerza bruta. Bienvido a la era del <span className="text-red-600">rendimiento digital</span>.
            </h2>
          </div>

          {/* Main Headline */}
          <div className="mb-10 fade-up delay-100">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black italic uppercase tracking-tighter leading-[0.8] text-white">
              ENTRENA <br />
              <span className="text-red-600 drop-shadow-[0_20px_50px_rgba(220,38,38,0.4)]">SIN LÍMITES</span>
            </h1>
          </div>

          {/* Dynamic Benefit */}
          <div className="relative h-24 mb-12 fade-up delay-200">
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`absolute top-0 left-0 transition-all duration-700 w-full ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-white font-black text-2xl uppercase italic tracking-tight flex items-center gap-3">
                    <span className="h-4 w-4 bg-red-600" />
                    {slide.title}
                  </span>
                  <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-wide max-w-xl leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="fade-up delay-300 flex flex-wrap gap-6 items-center">
            <Link 
              href="/auth/register" 
              className="bg-red-600 text-white font-black px-12 py-5 text-xl uppercase italic tracking-tighter hover:bg-white hover:text-red-600 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.3)]"
            >
              EMPEZAR AHORA
            </Link>
            <Link 
              href="#ofertas" 
              className="border-2 border-white/20 text-white font-black px-12 py-5 text-xl uppercase italic tracking-tighter hover:bg-white/10 transition-all backdrop-blur-md"
            >
              VER PLANES
            </Link>
          </div>
        </div>
      </Container>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-4 fade-up delay-500">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-500 ${i === currentSlide ? 'w-12 bg-red-600' : 'w-4 bg-white/20'}`} 
          />
        ))}
      </div>
      
      {/* Geometric Cut */}
      <div 
        className="absolute bottom-[-1px] left-0 w-full h-[150px] bg-zinc-950 z-10" 
        style={{ clipPath: 'polygon(0 85%, 100% 100%, 100% 100%, 0 100%)' }} 
      />
    </section>
  )
}

export default HeroSection
