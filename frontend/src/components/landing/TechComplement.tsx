import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

const TechComplement: React.FC = () => {
  const features = [
    { title: "Sincronización Total", desc: "Tus datos de entrenamiento viajan contigo de la app al club.", icon: "⚡" },
    { title: "Acceso con un Toque", desc: "Credencial digital inteligente para entradas instantáneas.", icon: "📱" },
    { title: "Progreso Visible", desc: "Métricas claras de tu evolución física en tiempo real.", icon: "📊" },
    { title: "Reserva Inteligente", desc: "Gestiona tu tiempo y asegura tu sesión con un clic.", icon: "🎯" }
  ]

  return (
    <section className="bg-apple-black py-48 overflow-hidden relative">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
      
      <Container>
        <div className="text-center mb-32 space-y-6 fade-up">
           <span className="text-zinc-500 font-bold uppercase tracking-[0.5em] text-xs">EL COMPLEMENTO PERFECTO</span>
           <h2 className="text-white font-black text-6xl md:text-8xl lg:text-9xl italic uppercase tracking-tighter leading-none">
             TU <span className="text-apple-red">PROGRESO.</span> <br /> 
             SINCRONIZADO.
           </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-24">
           {/* Infographic Features */}
           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-12 order-2 lg:order-1">
              {features.map((feat, i) => (
                <div key={i} className="space-y-4 fade-up">
                   <div className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-6">
                      {feat.icon}
                   </div>
                   <h4 className="text-white font-black text-xl md:text-2xl uppercase italic tracking-tighter">
                      {feat.title}
                   </h4>
                   <p className="text-zinc-500 font-medium text-lg leading-relaxed italic border-l-2 border-zinc-800 pl-6">
                      {feat.desc}
                   </p>
                </div>
              ))}
           </div>

           {/* Elegant Mockup - Apple Presentation Style */}
           <div className="flex-1 order-1 lg:order-2 relative w-full aspect-square group">
              <div className="absolute inset-0 bg-apple-red/10 blur-[150px] scale-90 group-hover:scale-100 transition-transform duration-1000" />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                 {/* The "Product" Mockup */}
                 <div className="w-full h-full bg-zinc-900 rounded-[4rem] border-[12px] border-zinc-800 shadow-3xl flex flex-col items-center justify-center p-12 text-center space-y-8 overflow-hidden">
                    <div className="relative w-40 h-40 bg-white rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] p-4">
                       <Image
                         src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1771292814/Commons_QR_code_s1ok6y.png"
                         alt="QR Access Code"
                         width={160}
                         height={160}
                         className="w-full h-full object-contain"
                       />
                    </div>
                    <div className="space-y-4">
                       <div className="text-white font-black text-3xl uppercase italic tracking-tighter">Acceso Autorizado</div>
                       <div className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Sincronizado @ 19:42</div>
                    </div>
                    
                    {/* Floating Health Metric */}
                    <div className="absolute top-1/4 -right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl rotate-12">
                       <span className="block text-[10px] font-black uppercase text-zinc-500 mb-1">Ritmo Cardiaco</span>
                       <span className="text-white font-black text-3xl italic">142 BPM</span>
                    </div>

                    {/* Floating Progress Metric */}
                    <div className="absolute bottom-1/4 -left-10 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl -rotate-6">
                       <span className="block text-[10px] font-black uppercase text-zinc-500 mb-1">Masa Muscular</span>
                       <span className="text-white font-black text-3xl italic">+2.4 KG</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-40 text-center fade-up delay-500">
           <p className="text-zinc-600 font-bold uppercase tracking-[0.4em] text-xs max-w-2xl mx-auto italic">
             La tecnología en ForceGym es invisible, potente y diseñada para dejarte solo una preocupación: tu esfuerzo.
           </p>
        </div>
      </Container>
    </section>
  )
}

export default TechComplement