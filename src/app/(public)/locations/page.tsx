import React from 'react';
import Container from '@/components/Container';
import { MapPin, Clock, Phone, Navigation, Globe } from 'lucide-react';

export default function LocationsPage() {
  return (
    <main className="bg-[#121212] text-white min-h-screen pt-32 pb-20 selection:bg-[#ff0400] selection:text-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 text-[#ff0400]">
              Sedes
            </h1>
            <p className="text-zinc-400 text-xl md:text-2xl font-light leading-relaxed">
              Centros de alto rendimiento ubicados estratégicamente para integrarse en tu estilo de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Branch Card */}
            <div className="flex flex-col gap-8">
              <div className="bg-[#111] border border-white/5 p-10 rounded-[50px] space-y-10 relative overflow-hidden group shadow-2xl">
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Globe className="w-64 h-64 text-white" />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-0.5 w-12 bg-[#ff0400]" />
                    <span className="text-[#ff0400] font-black uppercase tracking-[0.3em] text-[10px]">Sede Central</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Mendoza Ciudad</h2>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="bg-zinc-900 p-4 rounded-2xl border border-white/5">
                      <MapPin className="w-6 h-6 text-[#ff0400]" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-xl mb-1">Av. Arístides Villanueva 500</p>
                      <p className="text-zinc-500 font-medium italic">Mendoza, CP 5500, Argentina</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="bg-zinc-900 p-4 rounded-2xl border border-white/5">
                      <Clock className="w-6 h-6 text-[#ff0400]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-xl mb-3 uppercase italic tracking-tight">Horarios</p>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Lunes - Viernes</span>
                        <span className="text-white font-black text-right">06:00 — 23:00</span>
                        <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Sábados</span>
                        <span className="text-zinc-300 font-bold text-right">08:00 — 20:00</span>
                        <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Domingos</span>
                        <span className="text-zinc-600 italic text-right">Cerrado</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="bg-zinc-900 p-4 rounded-2xl border border-white/5">
                      <Phone className="w-6 h-6 text-[#ff0400]" />
                    </div>
                    <p className="text-white font-black text-2xl tracking-tighter">+54 261 455-8899</p>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href="https://www.google.com/maps/dir//Aristides+Villanueva+500,+Mendoza" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-4 bg-[#ff0400] text-white w-full py-6 rounded-3xl font-black uppercase italic tracking-[0.2em] text-sm hover:bg-[#cc0300] transition-all group active:scale-95 shadow-lg shadow-[#ff0400]/20"
                  >
                    Abrir en Google Maps
                    <Navigation className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>

              {/* Expansion Note */}
              <div className="bg-gradient-to-r from-[#111] to-transparent p-8 rounded-[40px] border-l-4 border-[#ff0400]/20">
                <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-2 text-center lg:text-left">Expansión Force Gym {new Date().getFullYear() + 1}</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 opacity-30">
                   <p className="text-white font-black italic uppercase tracking-tighter text-2xl">MAIPÚ</p>
                   <p className="text-white font-black italic uppercase tracking-tighter text-2xl">CHACRAS</p>
                   <p className="text-white font-black italic uppercase tracking-tighter text-2xl">BARRANCAS</p>
                </div>
              </div>
            </div>

            {/* Cinematic Map */}
            <div className="rounded-[60px] overflow-hidden border border-white/10 relative h-[600px] lg:h-auto shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13401.7891785!2d-68.8504008!3d-32.8894587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e09121a9a8157%3A0xe5a1a1f01c87e14a!2zQXVsYSBBcsOtc3RpZGVzIFZpbGxhbnVldmEgNTAwLCBNZW5kb3ph!5e0!3m2!1ses-419!2sar!4v1709400000000!5m2!1ses-419!2sar" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* Overlay Vignette */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
              {/* Floating Badge */}
              <div className="absolute top-10 left-10 bg-[#0B0B0B]/90 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-white font-bold text-xs uppercase tracking-widest italic">Sede Operativa</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
