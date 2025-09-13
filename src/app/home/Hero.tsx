'use client'

import React, { useState, useEffect } from 'react'
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
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_1920,h_1080,q_auto,f_auto/v1757705950/home1_kloc1u.png",
    title: "Videos con Ejercicios por Músculo",
    description: "Accede a nuestra biblioteca completa de videos instructivos organizados por grupos musculares. Aprende la técnica correcta y maximiza tus resultados con la guía de nuestros entrenadores profesionales."
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_1920,h_1080,q_auto,f_auto/v1757706127/home5_u0gjut.png",
    title: "Credencial con QR Único",
    description: "Tecnología de vanguardia con credenciales digitales únicas. Acceso rápido y seguro a todas las instalaciones, registro automático de entrenamientos y control personalizado de tu progreso."
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757738254/gym_ntrfn0.png",
    title: "Instalaciones de Primera Clase",
    description: "Disfruta de nuestras instalaciones modernas con equipamiento de última generación. Espacios amplios, climatizados y diseñados para brindarte la mejor experiencia de entrenamiento."
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_1920,h_1080,q_auto,f_auto/v1757708999/gymlugar_viq8pj.png",
    title: "Zona de Relajación con Buffet",
    description: "Relájate en nuestra zona de descanso equipada con un buffet saludable. El lugar perfecto para trabajar, socializar y recargar energías con opciones nutritivas después de tu entrenamiento."
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_1920,h_1080,q_auto,f_auto/v1757707172/lockerromm_oxshjz.jpg",
    title: "Vestuarios Premium con Lockers",
    description: "Vestuarios amplios y modernos con lockers individuales, duchas de alta presión y espacios cómodos para cambiarte. Mantén tus pertenencias seguras mientras entrenas con total tranquilidad."
  }
]

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [allImagesLoaded, setAllImagesLoaded] = useState(false)
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: HTMLImageElement }>({})

  // Aggressive preloading - load all images before showing slider
  useEffect(() => {
    const preloadImages = async () => {
      const imageCache: { [key: string]: HTMLImageElement } = {}
      
      const imagePromises = slides.map((slide) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          
          // Force immediate loading
          img.setAttribute('loading', 'eager')
          img.crossOrigin = 'anonymous'
          
          img.onload = () => {
            imageCache[slide.image] = img
            console.log(`✅ Image preloaded:`, slide.title)
            resolve()
          }
          
          img.onerror = () => {
            console.error('❌ Failed to preload image:', slide.image)
            // Create a fallback element
            const fallbackImg = new Image()
            fallbackImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9Ijk2MCIgeT0iNTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM5Q0E0QUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K'
            imageCache[slide.image] = fallbackImg
            resolve()
          }
          
          img.src = slide.image
        })
      })
      
      await Promise.all(imagePromises)
      setLoadedImages(imageCache)
      setAllImagesLoaded(true)
      console.log('🚀 All images preloaded and cached - slider ready!')
    }

    preloadImages()
  }, [])

  // Auto-scroll functionality - only after images are loaded
  useEffect(() => {
    if (!allImagesLoaded) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [allImagesLoaded])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-16 md:pt-20">
      {!allImagesLoaded ? (
        // Loading state
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-white text-base md:text-lg font-medium">Cargando experiencia ForceGym...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Background Images - Only render when fully loaded */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => {
              const cachedImage = loadedImages[slide.image]
              if (!cachedImage) return null
              
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    zIndex: index === currentSlide ? 2 : 1,
                    willChange: 'opacity'
                  }}
                >
                  {/* Use the cached preloaded image */}
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      // Force hardware acceleration for smooth transitions
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      perspective: '1000px'
                    }}
                  />
                  {/* Dark overlay - More transparent on mobile for better readability */}
                  <div 
                    className="absolute inset-0 bg-black/50 md:bg-black/40" 
                    style={{ zIndex: 3 }}
                  />
                </div>
              )
            })}
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-4 md:px-0">
            <Container>
              <div className="max-w-5xl mx-auto text-center md:text-left md:ml-0 md:mr-auto md:pl-10 lg:pl-16">
                <h1
                  className="hero-title text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl mb-6 md:mb-8 font-black uppercase tracking-wide md:tracking-wider leading-tight md:leading-none text-red-500"
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                  }}
                >
                  {slides[currentSlide].title}
                </h1>
                <div className="text-center md:text-left md:pl-10 lg:pl-16 mb-8 md:mb-10 max-w-3xl mx-auto md:mx-0">
                  {slides[currentSlide].description.split('. ').filter(Boolean).slice(0, 2).map((part, i) => {
                    const highlighted = part
                      .replace(/buffet saludable/gi, '<span class="font-semibold text-red-400">$&</span>')
                      .replace(/socializar/gi, '<span class="font-semibold text-red-400">$&</span>')
                      .replace(/energías/gi, '<span class="font-semibold text-red-400">$&</span>')
                    
                    return (
                      <p
                        key={i}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100/90 leading-relaxed md:leading-relaxed drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)] mb-2 md:mb-0"
                        dangerouslySetInnerHTML={{ 
                          __html: highlighted + (part.endsWith('.') ? '' : '.') 
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </Container>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2 md:space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.4)] ${
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
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-none transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            aria-label="Slide anterior"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-none transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            aria-label="Slide siguiente"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </section>
  )
}

export default Hero