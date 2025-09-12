'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

interface Slide {
  id: number
  image: string
  title: string
  description: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757705950/home1_kloc1u.png",
    title: "Videos con Ejercicios por Músculo",
    description: "Accede a nuestra biblioteca completa de videos instructivos organizados por grupos musculares. Aprende la técnica correcta y maximiza tus resultados con la guía de nuestros entrenadores profesionales."
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757706127/home5_u0gjut.png",
    title: "Credencial con QR Único",
    description: "Tecnología de vanguardia con credenciales digitales únicas. Acceso rápido y seguro a todas las instalaciones, registro automático de entrenamientos y control personalizado de tu progreso."
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757706081/home3_nsxdya.png",
    title: "Instalaciones de Primera Clase",
    description: "Disfruta de nuestras instalaciones modernas con equipamiento de última generación. Espacios amplios, climatizados y diseñados para brindarte la mejor experiencia de entrenamiento."
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757708999/gymlugar_viq8pj.png",
    title: "Zona de Relajación con Buffet",
    description: "Relájate en nuestra zona de descanso equipada con un buffet saludable. El lugar perfecto para trabajar, socializar y recargar energías con opciones nutritivas después de tu entrenamiento."
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757707172/lockerromm_oxshjz.jpg",
    title: "Vestuarios Premium con Lockers",
    description: "Vestuarios amplios y modernos con lockers individuales, duchas de alta presión y espacios cómodos para cambiarte. Mantén tus pertenencias seguras mientras entrenas con total tranquilidad."
  }
]

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
  <section className="relative h-screen w-full overflow-hidden pt-16 lg:pt-28">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/60" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Container>
          {(() => {
            const alignLeft = slides[currentSlide].id === 4
            return (
              <div className={[
                'max-w-5xl mx-auto',
                alignLeft ? 'text-left md:ml-0 md:mr-auto md:pl-10 lg:pl-16' : 'text-center'
              ].join(' ')}>
          <h1
            className="text-4xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.65)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {slides[currentSlide].title}
          </h1>
          {(() => {
            const raw = slides[currentSlide].description
            const highlight = (text: string) => text
              .replace(/buffet saludable/gi, '<span class="font-semibold text-red-400">$&</span>')
              .replace(/socializar/gi, '<span class="font-semibold text-red-400">$&</span>')
              .replace(/energías/gi, '<span class="font-semibold text-red-400">$&</span>')
            const parts = raw.split('. ').filter(Boolean)
            const useLeft = [4].includes(slides[currentSlide].id)
            return (
              <div className={[useLeft ? 'text-left md:pl-10 lg:pl-16' : 'text-center', 'mb-10'].join(' ')}>
                {parts.slice(0, 2).map((p, i) => (
                  <p
                    key={i}
                    className="text-lg md:text-xl lg:text-2xl text-gray-100/90 leading-relaxed drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]"
                    dangerouslySetInnerHTML={{ __html: highlight(p.trim()) + (p.endsWith('.') ? '' : '.') }}
                  />
                ))}
              </div>
            )
          })()}
          {/* CTAs removidos como pediste */}
              </div>
            )
          })()}
        </Container>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.4)] ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-none transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-none transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        aria-label="Slide siguiente"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}

export default Hero