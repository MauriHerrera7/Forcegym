"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SubscriptionsPage() {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      id: "basic",
      name: "Básico",
      priceMonthly: 35000,
      priceYearly: 350000,
      badge: "Popular",
      description: "Acceso libre al gimnasio y clases grupales básicas.",
      features: [
        "Acceso las 24/7",
        "Clases grupales básicas",
        "Locker compartido",
        "Seguimiento mensual por app",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      priceMonthly: 70000,
      priceYearly: 700000,
      badge: "Recomendado",
      description:
        "Todo lo del básico + clases premium y 2 entrenamientos personales.",
      features: [
        "Clases premium (HIIT / Yoga / Pilates)",
        "2 sesiones con entrenador al mes",
        "Acceso a sauna",
        "Descuentos en suplementos",
      ],
    },
    {
      id: "elite",
      name: "Elite",
      priceMonthly: 105000,
      priceYearly: 1050000,
      badge: "Limitado",
      description:
        "Experiencia completa: entrenamientos, nutrición y prioridad de turnos.",
      features: [
        "Entrenador personal semanal",
        "Plan nutricional",
        "Acceso VIP y prioridad de reservas",
        "Merch pack de bienvenida",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-12">
      <section className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Planes de suscripción
            </h1>
            <p className="text-red-500 mt-2 font-medium">
              Elegí el plan que mejor se adapte a tu ritmo.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Billing toggle */}
            <div className="bg-gray-900 rounded-full p-1 flex items-center border border-red-600">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                  billing === "monthly"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-400"
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                  billing === "yearly"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-400"
                }`}
              >
                Anual
              </button>
            </div>
          </div>
        </header>

        {/* PLANES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-b from-gray-900 to-black border border-red-600 rounded-2xl p-6 shadow-lg flex flex-col"
            >
              {plan.badge && (
                <div className="absolute -top-3 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                  {plan.badge}
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                <p className="text-sm text-gray-300 mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-white">
                  ${billing === "monthly" ? plan.priceMonthly : plan.priceYearly}
                </span>
                <span className="text-sm text-gray-400">
                  / {billing === "monthly" ? "mes" : "año"}
                </span>
              </div>

              <ul className="flex-1 space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-red-500 mt-1" />
                    <span className="text-sm text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition">
                Suscribirme
              </button>

              <p className="mt-3 text-xs text-gray-500 text-center">
                Pago seguro • Cancelación flexible
              </p>
            </motion.article>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="mt-16 bg-gray-900 border border-red-600 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h4 className="font-bold text-lg text-white">¿Necesitás ayuda?</h4>
            <p className="text-gray-400 text-sm">
              Chateá con nuestro equipo
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg border border-red-600 text-sm font-medium text-white hover:bg-red-600 hover:text-white transition"
            >
              Chatear
            </Link>
            
          </div>
        </footer>

        <p className="mt-8 text-center text-xs text-gray-500">
          Precios en pesos argentinos. Impuestos no incluidos.
        </p>
      </section>
    </main>
  );
}