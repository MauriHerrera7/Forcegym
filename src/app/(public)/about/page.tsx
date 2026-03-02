import React from 'react';
import Container from '@/components/Container';
import { Code2, Trophy, Rocket, Heart, LucideIcon } from 'lucide-react';

interface FutureProp {
  icon: React.ReactElement<any>;
  title: string;
  desc: string;
}

export default function AboutPage() {
  return (
    <main className="bg-[#121212] text-white min-h-screen pt-32 pb-20 selection:bg-[#ff0400] selection:text-white">
      <Container>
        {/* Cinematic Header */}
        <div className="max-w-4xl mx-auto text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 text-white uppercase">
            Acerca de Nosotros
          </h1>
          <div className="h-1 w-24 bg-[#ff0400] mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(255,4,0,0.5)]" />
        </div>

        {/* Introduction Section */}
        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="flex justify-center md:justify-end">
             <div className="relative max-w-[280px] rounded-[40px] overflow-hidden group transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1756590188/profile-pic_2_bfzl6x.png" 
                  alt="Mauricio Herrera" 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
             </div>
          </div>

          <div className="md:col-span-2 space-y-8 text-zinc-300 font-light leading-relaxed text-lg text-center md:text-left">
            <p className="text-white font-black italic text-2xl md:text-3xl border-l-4 border-[#ff0400] pl-6">
              "Esta plataforma nace de la combinación de dos pasiones: la tecnología y el entrenamiento físico."
            </p>
            <p className="pl-6">
              Desarrollé esta página con el objetivo principal de optimizar la organización y administración de un gimnasio, facilitando la gestión tanto para los administradores como para los entrenadores. Mi meta fue crear una herramienta práctica, intuitiva y eficiente que permita llevar un mejor control de clientes, planes de entrenamiento, progreso y datos administrativos en un solo lugar.
            </p>
          </div>
        </section>

        {/* Why I Created This Section */}
        <section className="max-w-5xl mx-auto mb-32">
          <div className="space-y-8 bg-zinc-900/40 p-10 md:p-14 rounded-[50px] border border-white/5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Code2 size={120} />
            </div>
            
            <h3 className="text-white font-black italic uppercase text-2xl tracking-tight flex items-center gap-3 relative z-10">
              <Rocket className="text-[#ff0400] w-7 h-7" />
              ¿Por qué creé esta plataforma?
            </h3>
            
            <p className="relative z-10 text-zinc-300 font-light leading-relaxed">
              En muchos gimnasios, la gestión de clientes y rutinas aún se realiza de forma manual o con herramientas poco integradas. Esto puede generar desorganización, pérdida de información y dificultad para dar seguimiento real al progreso de cada persona.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 relative z-10">
               {[
                 "Administrar clientes eficientemente",
                 "Organizar planes personalizados",
                 "Seguimiento claro del progreso",
                 "Gestión estructurada de datos",
                 "Acceso útil para el rendimiento"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 text-sm font-bold text-zinc-200">
                   <div className="w-2 h-2 rounded-full bg-[#ff0400] shadow-[0_0_8px_#ff0400]" />
                   {item}
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Mid Section: Vision */}
        <section className="mb-32">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#121212] rounded-[60px] p-8 md:p-20 border border-white/10 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                Más que un sistema, una herramienta de <span className="text-[#ff0400]">crecimiento</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Esta plataforma no solo busca facilitar la gestión interna del gimnasio, sino también convertirse en un apoyo para los clientes, proporcionándoles información clara y herramientas que les ayuden a alcanzar sus objetivos físicos de manera organizada y medible.
              </p>
              <p className="text-zinc-500 italic">
                Mi enfoque como desarrollador es crear soluciones funcionales, escalables y centradas en la experiencia del usuario. Este proyecto representa una aplicación práctica de mis conocimientos en desarrollo web, bases de datos y arquitectura de software, orientados a resolver necesidades reales.
              </p>
            </div>
          </div>
        </section>

        {/* Future Vision Section */}
        <section className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Visión a futuro</h2>
            <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mt-2">Este es solo el comienzo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: <Trophy />, title: "Reportes Avanzados", desc: "Análisis profundo de rendimiento físico." },
              { icon: <Code2 />, title: "Automatización", desc: "Pagos y membresías sin fricción." },
              { icon: <Heart />, title: "Paneles Coaching", desc: "Herramientas de análisis para entrenadores." },
              { icon: <Rocket />, title: "Integración", desc: "Sincronización con apps de seguimiento." },
              { icon: <Rocket />, title: "Optimización", desc: "Experiencia móvil nativa y fluida." }
            ].map((prop, i) => (
              <div key={i} className="bg-zinc-900/50 border border-white/5 p-8 rounded-[32px] hover:border-[#ff0400]/30 transition-all group">
                <div className="text-[#ff0400] mb-4 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(prop.icon as React.ReactElement, { size: 28 } as any)}
                </div>
                <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">{prop.title}</h4>
                <p className="text-zinc-500 text-[10px] leading-relaxed italic">{prop.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-zinc-400 font-bold italic tracking-wide max-w-xl mx-auto pt-8">
            "Estoy comprometido con la mejora continua y con el desarrollo de soluciones tecnológicas que generen impacto real."
          </p>
        </section>
      </Container>
    </main>
  );
}
