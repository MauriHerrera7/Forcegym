import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

const AppleTestimonials: React.FC = () => {
  const testimonials = [
    {
       quote: "“ForceGym me dio la precisión que buscaba. No es solo peso, es técnica.”",
       author: "Alex V.",
       role: "Atleta Elite",
       image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757739337/carlosramirez_nchcbg.png"
    },
    {
       quote: "“El dashboard es impecable. Todo mi progreso en un solo lugar.”",
       author: "Sofia L.",
       role: "Miembro 24/7",
       image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757739343/mariagonzales_bdbtj2.png"
    },
    {
       quote: "“Un nivel de equipamiento y atmósfera inigualable en la ciudad.”",
       author: "Camila P.",
       role: "Powerlifter",
       image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757739333/anamartin_s2u72f.png"
    }
  ]

  return (
    <section className="bg-apple-black py-48 overflow-hidden relative border-t border-white/5">
      <Container>
        <div className="flex flex-col gap-32">
           {testimonials.map((t, i) => (
             <div key={i} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 fade-up ${i % 2 !== 0 ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-apple-red/20 shadow-2xl flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-1000">
                   <Image src={t.image} alt={t.author} fill className="object-cover" />
                </div>
                <div className="space-y-6">
                   <p className="text-white text-3xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-tight max-w-4xl">
                      {t.quote}
                   </p>
                   <div className={`flex flex-col ${i % 2 !== 0 ? 'items-end' : 'items-start'}`}>
                      <span className="text-apple-red font-black text-xl italic uppercase tracking-tighter">{t.author}</span>
                      <span className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">{t.role}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </Container>
    </section>
  )
}

export default AppleTestimonials
