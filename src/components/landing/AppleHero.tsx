'use client'

import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

const AppleHero: React.FC = () => {
  return (
    <section className="relative h-screen w-full bg-apple-black overflow-hidden flex items-center justify-center">
      {/* Background Visual: Treat it like a product beauty shot */}
      <div className="absolute inset-0 z-0 scale-105">
        <Image
          src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1757706127/home5_u0gjut.png"
          alt="ForceGym Premium Environment"
          fill
          priority
          className="object-cover brightness-[0.4] contrast-[1.1] animate-in fade-in zoom-in duration-1000 fill-mode-forwards"
        />
      </div>

      {/* Subtle Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-apple-black/20 to-apple-black z-1" />

      <Container className="relative z-10 text-center flex flex-col items-center">
        <div className="space-y-6 max-w-4xl fade-up">
           <span className="text-apple-red font-black uppercase tracking-[0.6em] text-[10px] md:text-sm drop-shadow-sm">
             Force Personal Performance
           </span>
           
           <h1 className="text-white font-black text-6xl md:text-8xl lg:text-[11rem] leading-[0.85] tracking-tight uppercase italic transition-all duration-700">
             No es solo <br /> 
             <span className="text-apple-red">entrenamiento.</span>
           </h1>
           
           <p className="text-zinc-400 font-bold text-lg md:text-2xl uppercase italic tracking-tighter max-w-2xl mx-auto drop-shadow-md">
             Es la evolución técnica de tu propia fuerza.
           </p>
           
        </div>
      </Container>

      {/* Liquid Drop Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <style jsx>{`
          @keyframes drip {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(15px) scale(0.8); opacity: 0.6; }
            100% { transform: translateY(30px) scale(0.3); opacity: 0; }
          }
          .drop {
            animation: drip 2s ease-in-out infinite;
          }
          .drop:nth-child(2) { animation-delay: 0.3s; }
          .drop:nth-child(3) { animation-delay: 0.6s; }
        `}</style>
        
        <span className="text-[11px] font-black tracking-[0.4em] text-apple-red/90 mb-6 drop-shadow-[0_0_8px_rgba(225,6,0,0.6)]">
          DESLIZA
        </span>
        
        <div className="relative w-16 h-24">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="drop absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500  shadow-[0_0_12px_rgba(225,6,0,0.8)]"
              style={{ top: `${i * 8}px` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AppleHero