'use client'

import React from 'react'
import { Mail, User, MessageSquare, Send, Dumbbell, HeartPulse, Bolt } from 'lucide-react'
import ChatWidget from '@/components/ChatWidget'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#000000' }}>

      {/* NEW — Modern Dynamic Fitness Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(239,68,68,0.12), transparent 60%)'
        }} />
        <div className="absolute top-0 right-0 w-full h-full" style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(220,38,38,0.15), transparent 65%)'
        }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full" style={{
          background: 'radial-gradient(circle at 50% 90%, rgba(239,68,68,0.18), transparent 70%)'
        }} />

        {/* Animated energy lines */}
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="w-full h-full bg-[url('/energy-lines.svg')] bg-cover bg-center animate-pan-slow" />
        </div>

        {/* Floating fitness icons */}
        <Dumbbell className="absolute top-16 left-12 w-28 h-28 opacity-10 animate-float-slow" />
        <HeartPulse className="absolute bottom-24 right-16 w-28 h-28 opacity-10 animate-float-delay" />
        <Bolt className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 opacity-10 animate-float-fast" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* NEW — Dynamic Fitness Header */}
        <div className="text-center mb-16">
          <h1
            className="text-6xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(to right, #ef4444, #b91c1c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Entrená con Nosotros
          </h1>
         
        </div>

        {/* NEW — Dynamic Feature Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
            <Bolt className="w-10 h-10 text-red-500 mb-3" />
            <h4 className="text-white font-bold">Rendimiento</h4>
            <p className="text-gray-400 text-sm">Entrenamientos adaptados para avanzar más rápido.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
            <HeartPulse className="w-10 h-10 text-red-500 mb-3" />
            <h4 className="text-white font-bold">Salud</h4>
            <p className="text-gray-400 text-sm">Planificación segura para tu bienestar.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
            <Dumbbell className="w-10 h-10 text-red-500 mb-3" />
            <h4 className="text-white font-bold">Fuerza</h4>
            <p className="text-gray-400 text-sm">Superá tus marcas con nuestra guía profesional.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="rounded-2xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.14)' 
          }}
        >
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-gray-300 ml-1">Nombre Completo</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-red-400 transition" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    className="w-full pl-10 py-3 bg-gray-900/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-300 ml-1">Correo Electrónico</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-red-400 transition" />
                  <input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-10 py-3 bg-gray-900/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-gray-300 ml-1">Tu Mensaje</label>
              <div className="relative group">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-red-400 transition" />
                <textarea
                  id="message"
                  placeholder="Contanos tu objetivo fitness"
                  rows={5}
                  className="w-full pl-10 py-3 bg-gray-900/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 flex justify-center items-center gap-2 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}
            >
              Enviar Mensaje
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
