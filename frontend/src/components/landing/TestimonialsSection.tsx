import React from 'react'
import Container from '@/components/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Atleta Elite",
    content: "La tecnología de ForceGym es de otro nivel. El tracking biométrico me ha permitido ajustar mi entrenamiento con una precisión que nunca imaginé.",
    avatar: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757705950/home1_kloc1u.png"
  },
  {
    name: "Elena Soto",
    role: "Miembro Force 24/7",
    content: "Poder entrar al gimnasio solo con mi QR y ver mi rutina actualizada al instante es lo que necesitaba. Es un gimnasio pensado para el futuro.",
    avatar: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_800,h_600/v1757738254/gym_ntrfn0.png"
  },
  {
    name: "Marco Pozzi",
    role: "Powerlifter",
    content: "Equipamiento robusto y una comunidad sincronizada. En ForceGym no solo entrenas, evolucionas dentro de un club de alto rendimiento.",
    avatar: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_800,h_600/v1757706127/home5_u0gjut.png"
  }
]

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
       {/* Decorative Lines */}
       <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-red-600/0 via-red-600/20 to-red-600/0 translate-x-[-10vw]" />
       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 translate-y-[-10vh]" />

      <Container>
        <SectionHeader 
          lead="Comunidad Force"
          title="TU ÉXITO ES NUESTRA FUERZA"
          subtitle="Escucha a quienes ya han transformado su rendimiento con nuestro modelo híbrido de fuerza y tecnología."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-zinc-900 border border-white/5 p-10 flex flex-col gap-8 shadow-2xl relative group">
              {/* Quote Mark */}
              <div className="text-6xl text-red-600 opacity-20 absolute top-8 right-8 group-hover:opacity-40 transition-opacity">
                "
              </div>
              
              <p className="text-white/80 text-lg font-medium italic leading-relaxed relative z-10 tracking-tight">
                {t.content}
              </p>

              <div className="flex items-center gap-5 mt-auto border-t border-white/5 pt-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-600 transition-transform group-hover:scale-110">
                  <Image 
                    src={t.avatar} 
                    alt={t.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase italic tracking-tighter text-lg">
                    {t.name}
                  </h4>
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TestimonialsSection
