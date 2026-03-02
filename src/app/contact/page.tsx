'use client'

import React, { useState } from 'react'
import { Mail, User, MessageSquare, Send, Dumbbell, HeartPulse, Bolt, CheckCircle, Loader2 } from 'lucide-react'
import ChatWidget from '@/components/ChatWidget'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Por favor completá todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.error || 'Hubo un error enviando el mensaje. Intenta de nuevo.');
      }
    } catch {
      setError('Error de conexión. Verificá tu internet e intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#000000' }}>

      {/* Background */}
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
        <Dumbbell className="absolute top-16 left-12 w-28 h-28 opacity-10 animate-float-slow" />
        <HeartPulse className="absolute bottom-24 right-16 w-28 h-28 opacity-10 animate-float-delay" />
        <Bolt className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 opacity-10 animate-float-fast" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
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

        {/* Feature Blocks */}
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
          {/* Success State */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
              <p className="text-gray-400 mb-6">Nos pondremos en contacto contigo pronto.</p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2 rounded-xl text-sm text-white border border-white/20 hover:bg-white/10 transition"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-300 ml-1">Nombre Completo</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-500 group-focus-within:text-red-400 transition" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className="w-full pl-10 py-3 bg-gray-900/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none"
                      disabled={isLoading}
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
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full pl-10 py-3 bg-gray-900/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none"
                      disabled={isLoading}
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
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Contanos tu objetivo fitness o en qué podemos ayudarte..."
                    rows={5}
                    className="w-full pl-10 py-3 bg-gray-900/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none resize-none"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 flex justify-center items-center gap-2 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Enviar Mensaje
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
