'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, User, Bot } from 'lucide-react'

interface Message {
    id: number
    text: string
    sender: 'user' | 'admin'
    timestamp: Date
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: '¡Hola! Bienvenido a Forcegym. ¿En qué podemos ayudarte hoy?',
            sender: 'admin',
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputValue.trim()) return

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, newUserMessage])
        setInputValue('')
        setIsTyping(true)

        // Simulate admin response
        setTimeout(() => {
            const adminResponses = [
                "Gracias por tu mensaje. Un administrador te responderá pronto.",
                "Para consultar precios, por favor visita nuestra sección de suscripciones.",
                "¡Claro! Estamos aquí para ayudarte con tu entrenamiento.",
                "¿Te gustaría agendar una visita al gimnasio?"
            ]
            const randomResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)]

            const newAdminMessage: Message = {
                id: Date.now() + 1,
                text: randomResponse,
                sender: 'admin',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, newAdminMessage])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div
                    className="mb-4 w-[350px] h-[500px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300"
                    style={{ boxShadow: '0 0 50px rgba(220, 38, 38, 0.2)' }}
                >
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-red-600 to-red-800 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Soporte Forcegym</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span className="text-xs text-red-100">En línea</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-transparent">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                            ? 'bg-red-600 text-white rounded-tr-none'
                                            : 'bg-red-600 text-white rounded-tl-none'
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                    <span className="text-[10px] mt-1 block">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                    <span className="w-2 h-2 bg-gray-500 text-white rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-500 text-white rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-gray-500 text-white rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-black/50">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-gradient-to-r from-red-600 to-red-800'
                    }`}
                style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)' }}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageSquare className="w-6 h-6 text-white group-hover:animate-pulse" />
                )}
            </button>
        </div>
    )
}
