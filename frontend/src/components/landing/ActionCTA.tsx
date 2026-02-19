import React from 'react'
import Container from '@/components/Container'
import Link from 'next/link'

const ActionCTA: React.FC = () => {
  return (
    <section className="bg-apple-black py-64 overflow-hidden relative">
      {/* Dynamic Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-full bg-apple-red/5 -skew-y-6 z-0" />
      
      <Container className="relative z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-16 fade-up">
           <h2 className="text-white font-black text-6xl md:text-9xl lg:text-[12rem] italic uppercase tracking-tighter leading-[0.8] mb-12 drop-shadow-2xl">
             TU FUTURO <br /> <span className="text-apple-red">ES HOY.</span>
           </h2>
           
           <div className="flex flex-col items-center gap-12">
              <p className="text-zinc-500 font-bold text-xl md:text-2xl italic uppercase tracking-widest max-w-2xl leading-relaxed">
                 La evolución no espera. Únete al club de entrenamiento más avanzado y redefine tus propios límites.
              </p>
              
              <Link 
                href="/auth/register" 
                className="group relative bg-white text-black px-20 py-8 text-3xl font-black italic uppercase tracking-tighter transition-all duration-500 hover:bg-[#DC143C] hover:text-white active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">UNIRSE A LA ÉLITE</span>
                <div className="absolute inset-0 bg-[#DC143C] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  UNIRSE A LA ÉLITE
                </span>
              </Link>
           </div>
        </div>
      </Container>
    </section>
  )
}

export default ActionCTA
