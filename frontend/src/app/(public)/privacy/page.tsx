import React from 'react';
import Container from '@/components/Container';
import { ShieldCheck, Eye, Lock, FileText } from 'lucide-react';

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="bg-[#121212] text-white min-h-screen pt-32 pb-20 selection:bg-[#ff0400] selection:text-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-[#ff0400]">
              Privacidad
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px]">
              Protegiendo tu rendimiento y tus datos
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-zinc-900/30 border border-white/5 p-8 md:p-12 rounded-[40px] backdrop-blur-sm">
               <div className="flex items-center gap-4 mb-8">
                  <ShieldCheck className="text-[#ff0400] w-8 h-8" />
                  <p className="text-white font-bold uppercase tracking-widest text-sm italic">Última actualización: Marzo {currentYear}</p>
               </div>
               <p className="text-zinc-300 font-light leading-relaxed text-lg">
                En Force Gym, la privacidad y seguridad de tus datos son primordiales. Esta política detalla cómo recopilamos, utilizamos y protegemos tu información personal como integrante de nuestro ecosistema de alto rendimiento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 {
                   icon: <Eye />,
                   title: "1. Recopilación",
                   text: "Recopilamos datos identificatorios (Nombre, DNI, Email), históricos de acceso vía QR e información de suscripción para gestionar tu progreso."
                 },
                 {
                   icon: <Lock />,
                   title: "2. Uso de Datos",
                   text: "Utilizados exclusivamente para proporcionar acceso, personalizar tu experiencia en el dashboard y enviarte notificaciones críticas de membresía."
                 },
                 {
                   icon: <FileText />,
                   title: "3. Protección",
                   text: "Utilizamos encriptación de grado industrial. Nunca compartimos tu información personal con terceros para fines comerciales."
                 },
                 {
                   icon: <ShieldCheck />,
                   title: "4. Tus Derechos",
                   text: "Tienes derecho a acceder, rectificar o eliminar tu información en cualquier momento a través de tu perfil privado en el Dashboard."
                 }
               ].map((item, i) => (
                 <div key={i} className="bg-zinc-900/20 border border-white/5 p-10 rounded-[40px] transition-all hover:bg-zinc-900/40 group">
                    <div className="text-[#ff0400] mb-6 group-hover:scale-110 transition-transform duration-500">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 32 } as any)}
                    </div>
                    <h2 className="text-xl font-bold text-white uppercase italic tracking-tight mb-4">{item.title}</h2>
                    <p className="text-zinc-400 font-light leading-relaxed text-sm">{item.text}</p>
                 </div>
               ))}
            </div>

            <section className="pt-20 text-center">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12" />
              <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-600">
                Force Gym Performance Systems S.A. © {currentYear} · Todos los derechos reservados.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
