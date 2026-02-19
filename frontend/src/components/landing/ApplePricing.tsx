import React from 'react'
import Container from '@/components/Container'

const plans = [
  {
    name: "Mensual",
    price: "$50.000",
    period: "1 Mes",
    benefits: [
      "Acceso total al gimnasio",
      "Uso de musculación y cardio",
      "Duchas y lockers",
      "Sin permanencia"
    ],
    color: "orange",
    note: null,
    emoji: "🟠"
  },
  {
    name: "Trimestral",
    price: "$100.000",
    period: "3 Meses",
    benefits: [
      "Todo lo del plan mensual",
      "Precio reducido por compromiso",
      "Ideal para empezar un cambio real"
    ],
    color: "red",
    note: "💡 Ahorrás pagando por adelantado",
    emoji: "🔴"
  },
  {
    name: "Semestral",
    price: "$200.000",
    period: "6 Meses",
    benefits: [
      "Todo lo anterior",
      "Seguimiento básico",
      "Mejor relación precio/beneficio"
    ],
    color: "purple",
    note: "🔥 Compromiso serio = resultados reales",
    emoji: "🟣"
  },
  {
    name: "Anual",
    price: "$450.000",
    period: "12 Meses",
    benefits: [
      "Acceso ilimitado todo el año",
      "Beneficios exclusivos",
      "Máximo ahorro"
    ],
    color: "yellow",
    note: "🏆 El mejor valor por mes",
    emoji: "🟡"
  }
]

const ApplePricing: React.FC = () => {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-32">
          <h2 className="text-white font-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 leading-[0.95]">
            Invierte en tu{' '}
            <span className="block mt-2 text-red-500 bg-clip-text bg-gradient-to-r from-[#DC143C] via-[#FF6B35] to-[#F59E0B] animate-gradient">
              transformación
            </span>
          </h2>
          
          <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Elige el compromiso que se adapta a tus objetivos.<br />
            <span className="text-white font-semibold">Sin letras chicas. Sin sorpresas.</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1400px] mx-auto mb-20">
           {plans.map((plan, i) => {
             const colorClasses = {
               orange: {
                 gradient: 'from-[#FF6B35] to-[#FF8C42]',
                 border: 'border-[#FF6B35]/30',
                 dot: 'bg-[#FF6B35]',
                 cardGlow: 'group-hover:shadow-[0_20px_80px_rgba(255,107,53,0.2)]'
               },
               red: {
                 gradient: 'from-[#DC143C] to-[#FF1744]',
                 border: 'border-[#DC143C]/30',
                 dot: 'bg-[#DC143C]',
                 cardGlow: 'group-hover:shadow-[0_20px_80px_rgba(220,20,60,0.2)]'
               },
               purple: {
                 gradient: 'from-[#9333EA] to-[#A855F7]',
                 border: 'border-[#9333EA]/30',
                 dot: 'bg-[#9333EA]',
                 cardGlow: 'group-hover:shadow-[0_20px_80px_rgba(147,51,234,0.2)]'
               },
               yellow: {
                 gradient: 'from-[#F59E0B] to-[#FBBF24]',
                 border: 'border-[#F59E0B]/30',
                 dot: 'bg-[#F59E0B]',
                 cardGlow: 'group-hover:shadow-[0_20px_80px_rgba(245,158,11,0.2)]'
               }
             }

             const colors = colorClasses[plan.color as keyof typeof colorClasses]

             return (
               <div 
                 key={i} 
                 className={`group relative bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 flex flex-col border ${colors.border} transition-all duration-700 hover:scale-105 ${colors.cardGlow}`}
               >
                  {/* Animated glow effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700`} />
                  
                  {/* Emoji header */}
                  <div className="relative mb-6 flex items-center gap-4">
                    <span className="text-5xl">{plan.emoji}</span>
                    <div>
                      <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight">
                        {plan.name}
                      </h3>
                      <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${colors.gradient} mt-2`} />
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="relative mb-8">
                     <div className="text-white font-black text-5xl md:text-6xl tracking-tight mb-2">
                        {plan.price}
                     </div>
                     <div className="text-zinc-400 font-semibold text-base uppercase tracking-wider">
                        {plan.period}
                     </div>
                  </div>

                  {/* Benefits */}
                  <ul className="relative space-y-4 mb-6 flex-grow">
                     {plan.benefits.map((benefit, idx) => (
                       <li key={idx} className="flex items-start gap-3 text-zinc-300 group/item">
                          <div className={`w-2 h-2 rounded-full ${colors.dot} mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform`} />
                          <span className="text-sm md:text-base leading-relaxed">{benefit}</span>
                       </li>
                     ))}
                  </ul>

                  {/* Note */}
                  {plan.note && (
                    <div className={`relative mb-8 p-4 bg-gradient-to-br ${colors.gradient} bg-opacity-10 rounded-2xl border ${colors.border} backdrop-blur-sm`}>
                      <p className="text-white text-sm font-semibold text-center leading-relaxed">
                        {plan.note}
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button className="relative w-full py-5 rounded-2xl font-black text-base md:text-lg uppercase tracking-wider transition-all duration-300 bg-white text-black hover:bg-[#DC143C] hover:text-white shadow-2xl active:scale-95 overflow-hidden group/btn">
                    <span className="relative z-10">Comenzar ahora</span>
                  </button>
               </div>
             )
           })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center max-w-4xl mx-auto">
           <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 md:p-12">
             <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6">
               <span className="text-white font-bold">Todos los planes incluyen:</span> Acceso completo al ecosistema tecnológico ForceGym, 
               credencial digital inteligente y soporte prioritario sin costo adicional.
             </p>
             <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
               <span className="flex items-center gap-2">
                 ✓ <span>Sin permanencia forzada</span>
               </span>
               <span className="flex items-center gap-2">
                 ✓ <span>Cancela cuando quieras</span>
               </span>
               <span className="flex items-center gap-2">
                 ✓ <span>Pago 100% seguro</span>
               </span>
             </div>
           </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}

export default ApplePricing