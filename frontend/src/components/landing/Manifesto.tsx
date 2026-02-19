import React from 'react'
import Container from '@/components/Container'

const Manifesto: React.FC = () => {
  return (
    <section className="py-48 md:py-64 bg-apple-black flex items-center justify-center overflow-hidden">
      <Container>
        <div className="max-w-6xl mx-auto text-center space-y-20">
           {/* Huge Primary Manifesto */}
           <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold italic uppercase tracking-tighter text-white leading-none fade-up">
             "En Force Gym, cada <span className="text-apple-red">repetición</span> cuenta."
           </h2>

           {/* Detailed Narrative Block */}
           <div className="grid md:grid-cols-2 gap-16 text-left border-t border-white/10 pt-20 fade-up delay-200">
              <p className="text-white text-xl md:text-3xl font-bold leading-tight italic uppercase tracking-tighter">
                Diseñado para quienes entienden que la disciplina no es una opción, sino un estándar de vida.
              </p>
              <div className="space-y-8">
                 <p className="text-red-600 text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-apple-red pl-8">
                   En Force Gym, cada metro cuadrado está optimizado para el rendimiento. Desde equipamiento de precisión hasta un ambiente diseñado para eliminar distracciones. No somos un gimnasio, somos tu zona de impacto.
                 </p>
                 <div className="flex gap-12 font-black uppercase tracking-widest text-[10px] text-apple-pink">
                    <span>Equipamiento Pro</span>
                    <span>Cultura Élite</span>
                    <span>Espacio Premium</span>
                 </div>
              </div>
           </div>
        </div>
      </Container>
    </section>
  )
}

export default Manifesto