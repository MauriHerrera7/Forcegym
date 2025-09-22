'use client'

import React from 'react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Contacto</h1>
        <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700 shadow-lg">
          <p className="text-gray-300 mb-6">
            ¿Tienes alguna pregunta? No dudes en contactarnos.
          </p>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
