import React from 'react'
import Container from '@/components/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'

const features = [
  {
    id: 1,
    title: "Entrenamiento Elite",
    description: "Programas diseñados por profesionales para maximizar tu fuerza y rendimiento físico.",
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757705950/home1_kloc1u.png",
    icon: "💪"
  },
  {
    id: 2,
    title: "Tecnología Pro",
    description: "Equipamiento de última generación y entorno digital para un control total de tus metas.",
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_800,h_600/v1757738254/gym_ntrfn0.png",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Nutrición & Bio",
    description: "Seguimiento nutricional y biométrico integrado en tu dashboard para resultados reales.",
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_800,h_600/v1757706127/home5_u0gjut.png",
    icon: "🥗"
  },
  {
    id: 4,
    title: "Comunidad Sync",
    description: "Únete al clan digital y compite con otros atletas en nuestro ecosistema conectado.",
    image: "https://res.cloudinary.com/dry6dvzoj/image/upload/c_fill,w_800,h_600/v1757706127/landing_sync.png",
    icon: "🌐"
  }
]

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <Container>
        <SectionHeader 
          lead="Nuestra Propuesta"
          title="PODER SIN COMPETENCIA"
          subtitle="Ofrecemos un entorno donde la fuerza bruta de un gimnasio tradicional se encuentra con la precisión de la tecnología moderna."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div 
              key={feature.id}
              className="group relative h-[500px] overflow-hidden border border-white/5 bg-zinc-900 transition-all duration-500 hover:border-red-600/30 shadow-2xl"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={feature.image} 
                  alt={feature.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-40 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="bg-red-600 w-12 h-12 flex items-center justify-center text-2xl mb-6 shadow-xl transform -skew-x-12 group-hover:skew-x-0 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-white font-black text-2xl uppercase italic tracking-tighter mb-4 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed tracking-wide opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 italic">
                  {feature.description}
                </p>
                
                {/* Visual Line */}
                <div className="w-12 h-1 bg-white/20 mt-6 group-hover:w-full group-hover:bg-red-600 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default FeaturesSection
