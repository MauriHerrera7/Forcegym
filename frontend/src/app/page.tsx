'use client'

import React from 'react'
import AppleHero from '@/components/landing/AppleHero'
import Manifesto from '@/components/landing/Manifesto'
import SpaceExperience from '@/components/landing/SpaceExperience'
import TechComplement from '@/components/landing/TechComplement'
import ApplePricing from '@/components/landing/ApplePricing'
import AppleTestimonials from '@/components/landing/Testimonials' // Refactored as AppleTestimonials
import ActionCTA from '@/components/landing/ActionCTA'
import AppleFooter from '@/components/landing/AppleFooter'

const LandingPage: React.FC = () => {
  return (
    <main className="bg-apple-black text-white selection:bg-apple-red selection:text-white flex flex-col min-h-screen">
      
      {/* 1. Hero Cinemático - Impacto Inicial y Storytelling */}
      <AppleHero />

      {/* 2. Manifesto - El Alma de la Marca */}
      <Manifesto />

      {/* 3. Experiencia del Espacio - El Gimnasio como Producto Hardware */}
      <SpaceExperience />

      {/* 4. Tecnología como Complemento - Ecosistema Invisible */}
      <TechComplement />

      {/* 5. Membresías - Pricing de Élite estilo Apple */}
      <ApplePricing />

      {/* 6. Testimonios - Prueba Social Minimalista */}
      <AppleTestimonials />

      {/* 7. CTA Final - El Llamado al Movimiento */}
      <ActionCTA />

      {/* Footer Icónico */}
      <AppleFooter />

      {/* Keyframe Utilities & Apple-style Polish */}
      <style jsx global>{`
        body {
          background-color: #0B0B0B;
        }

        .fade-up {
          animation: fade-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }

        html {
          scroll-behavior: smooth;
        }

        /* Apple-style Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #0B0B0B;
        }
        ::-webkit-scrollbar-thumb {
          background: #1f1f1f;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #E10600;
        }
      `}</style>
    </main>
  )
}

export default LandingPage
