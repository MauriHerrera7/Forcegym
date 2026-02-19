import React from 'react'
import Container from '@/components/Container'
import SectionHeader from '@/components/ui/SectionHeader'

const plans = [
  {
    title: "Plan Básico",
    price: "$10.500",
    period: "Por mes",
    features: [
      "Acceso ilimitado 24/7",
      "Credencial Digital (QR)",
      "Seguimiento básico en App",
      "Equipamiento profesional",
      "Lockers disponibles"
    ],
    popular: false,
    cta: "EMPEZAR AHORA"
  },
  {
    title: "Plan Pro Force",
    price: "$45.000",
    period: "Pago Anual",
    features: [
      "Todo el plan Básico",
      "Sincronización Biométrica Pro",
      "Evaluación física mensual",
      "1 Invitado digital/mes",
      "Soporte prioritario",
      "Descuento en Suplementos"
    ],
    popular: true,
    cta: "ASEGURAR CUPO",
    badge: "OFERTA RECOMENDADA"
  },
  {
    title: "Plan Semestral",
    price: "$35.000",
    period: "Pago Único",
    features: [
      "Todo el plan Básico",
      "Evaluación inicial",
      "Plan nutricional base",
      "Acceso a clases grupales",
      "2 Invitados digitales"
    ],
    popular: false,
    cta: "VER DETALLES"
  }
]

const PricingSection: React.FC = () => {
  return (
    <section id="ofertas" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none overflow-hidden">
         <div className="text-[30rem] font-black italic text-white absolute -bottom-40 -left-20 tracking-tighter uppercase leading-none">FORCE</div>
      </div>

      <Container className="relative z-10">
        <SectionHeader 
          lead="Membresías Elite"
          title="TU INVERSIÓN EN PODER"
          subtitle="Elige el plan que mejor se adapte a tu ritmo. Todos nuestros planes incluyen acceso total al ecosistema digital sincronizado."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5 bg-black shadow-3xl">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`flex flex-col p-10 md:p-14 lg:p-20 transition-all duration-500 border-x border-white/5 ${plan.popular ? 'bg-zinc-900 z-10 scale-y-[1.05] shadow-2xl border-x-red-600/20' : 'bg-transparent hover:bg-zinc-900/50'}`}
            >
              {plan.popular && (
                <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.4em] py-2 px-6 mb-10 w-max mx-auto shadow-lg italic animate-pulse">
                  {plan.badge}
                </div>
              )}
              
              <div className="text-center mb-10">
                <h3 className={`text-xl font-black italic uppercase tracking-[0.2em] mb-4 ${plan.popular ? 'text-red-600' : 'text-zinc-500'}`}>
                  {plan.title}
                </h3>
                <div className="flex flex-col items-center">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white drop-shadow-md">
                    {plan.price}
                  </span>
                  <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-6 mb-16 flex-grow border-t border-white/5 pt-12">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white/70 text-sm font-medium italic tracking-wide group">
                    <span className={`w-2 h-2 rounded-sm rotate-45 transition-colors ${plan.popular ? 'bg-red-600' : 'bg-zinc-700 group-hover:bg-red-600'}`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-6 font-black uppercase italic tracking-[0.3em] text-sm transition-all shadow-xl active:scale-95 ${plan.popular ? 'bg-red-600 text-white hover:bg-white hover:text-red-600' : 'bg-white text-black hover:bg-red-600 hover:text-white'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 fade-up">
           <div className="flex items-center gap-4 px-8 py-3 bg-zinc-900 border border-white/10 rounded-full shadow-lg">
              <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <p className="text-zinc-400 text-xs font-black uppercase tracking-widest italic">
                 Precios Preferenciales para Nuevos Miembros - Sincronización Inmediata
              </p>
           </div>
        </div>
      </Container>
    </section>
  )
}

export default PricingSection
