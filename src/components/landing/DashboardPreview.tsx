import React from 'react'
import Container from '@/components/Container'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'

const DashboardPreview: React.FC = () => {
  const features = [
    { title: "Acceso QR", desc: "Entrada instantánea sin contacto con tu credencial digital.", icon: "📱" },
    { title: "Progreso Físico", desc: "Visualiza tus métricas biométricas y evolución en gráficos.", icon: "📈" },
    { title: "Gestión de Turnos", desc: "Reserva y cancela tus sesiones de entrenamiento en segundos.", icon: "📅" },
    { title: "Planes Objetivo", desc: "Accede a rutinas dinámicas según tu meta (Masa/Fuerza).", icon: "🎯" }
  ]

  return (
    <section className="py-32 bg-black overflow-hidden relative border-t border-white/5">
      {/* Background Tech Net */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Text Content */}
          <div className="flex-1 order-2 lg:order-1">
            <SectionHeader 
              lead="Ecosistema Digital"
              title="TU CLUB EN TU BOLSILLO"
              subtitle="Nuestro dashboard exclusivo te da el control total de tu entrenamiento. Sincronización instantánea, datos reales y gestión sin fricciones."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-5 p-6 bg-zinc-900 border border-white/5 rounded-sm hover:border-red-600/30 transition-all group">
                  <div className="text-4xl grayscale group-hover:grayscale-0 transition-all">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase italic tracking-tighter mb-2 group-hover:text-red-600 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed italic">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
               <button className="text-white font-black uppercase tracking-[0.3em] text-xs border-b-2 border-red-600 pb-2 hover:text-red-600 transition-colors">
                  VER DEMO DEL DASHBOARD →
               </button>
            </div>
          </div>

          {/* Visual Mockup - App View style */}
          <div className="flex-1 order-1 lg:order-2 relative w-full aspect-square md:aspect-video lg:aspect-square group">
             {/* Glow Behind */}
             <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
             
             {/* Main App Frame */}
             <div className="relative z-10 w-full h-full border-[10px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] bg-zinc-900">
                {/* Simulated App Header */}
                <div className="h-16 bg-zinc-950 flex items-center justify-between px-8 border-b border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600" />
                      <div className="h-2 w-20 bg-white/20 rounded" />
                   </div>
                   <div className="h-8 w-8 bg-white/10 rounded-lg" />
                </div>
                
                {/* Content Area */}
                <div className="p-8 space-y-8">
                   <div className="h-40 bg-zinc-950 border border-red-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://res.cloudinary.com/dry6dvzoj/image/upload/v1757705950/home1_kloc1u.png')] bg-cover bg-center" />
                      <div className="relative text-center">
                         <div className="text-red-600 font-black text-4xl mb-1 tracking-tighter italic">98%</div>
                         <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Meta Mensual</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="h-32 bg-zinc-950 rounded-2xl border border-white/5 p-5 flex flex-col justify-end">
                         <div className="text-white font-black text-xs uppercase tracking-widest opacity-40">Peso</div>
                         <div className="text-white font-bold text-2xl italic">84.5 KG</div>
                      </div>
                      <div className="h-32 bg-zinc-950 rounded-2xl border border-white/5 p-5 flex flex-col justify-end">
                         <div className="text-white font-black text-xs uppercase tracking-widest opacity-40">Calorías</div>
                         <div className="text-white font-bold text-2xl italic">2.4K</div>
                      </div>
                   </div>

                   <div className="h-48 bg-red-600 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-lg">
                      <div className="text-white font-black text-xl uppercase italic tracking-tighter mb-2">Próximo Turno</div>
                      <div className="text-white font-black text-4xl italic tracking-tighter leading-none mb-4">HOY @ 18:30</div>
                      <div className="bg-white/20 px-4 py-2 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                         HIIT ELITE SESSION
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Floating Elements for depth */}
             <div className="absolute -top-10 -left-10 w-24 h-24 bg-zinc-800 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center text-3xl animate-bounce delay-700 z-20">
                👟
             </div>
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600 rounded-3xl border-4 border-black shadow-2xl flex items-center justify-center text-4xl rotate-12 z-20">
                🔥
             </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default DashboardPreview
