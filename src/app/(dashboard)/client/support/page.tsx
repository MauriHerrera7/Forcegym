'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/providers/AuthProvider';
import { CheckCircle, Loader2, Send, AlertCircle } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function ClientSupportPage() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.subject.trim() || !formData.message.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${user?.first_name || 'Usuario'} ${user?.last_name || ''}`.trim(),
          email: user?.email,
          message: `ASUNTO: ${formData.subject}\n\nMENSAJE:\n${formData.message}`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ subject: '', message: '' });
      } else {
        setError(data.error || 'Hubo un error enviando el mensaje.');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">¡Mensaje Enviado!</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Hemos recibido tu mensaje de soporte. Nuestro equipo se contactará contigo pronto a {user?.email}.
        </p>
        <Button 
          onClick={() => setSuccess(false)}
          className="bg-[#ff0400] hover:bg-[#cc0300] text-white px-8 rounded-full"
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Soporte y Ayuda</h1>
        <p className="text-gray-400">Contanos en qué podemos ayudarte hoy</p>
      </div>

      <Card className="bg-[#111111] border-[#2a2a2a] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Send className="h-5 w-5 text-[#ff0400]" />
            Enviar Mensaje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-300 ml-1 font-medium">
                Asunto del ticket
              </Label>
              <Input
                id="subject"
                placeholder="Ej: Problema con el acceso, consulta de pago..."
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="bg-[#0A0A0A] border-[#333] text-white focus:border-[#ff0400] focus:ring-[#ff0400]/20 h-12 transition-all"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300 ml-1 font-medium">
                Tu mensaje detallado
              </Label>
              <textarea
                id="message"
                rows={6}
                placeholder="Escribe aquí tu consulta..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="flex w-full rounded-xl border border-[#333] bg-[#0A0A0A] px-4 py-3 text-base text-white ring-offset-background placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0400]/30 focus-visible:ring-offset-0 focus-visible:border-[#ff0400] transition-all resize-none shadow-inner"
                disabled={isLoading}
              />
              <p className="text-[10px] text-gray-500 ml-1">
                Asegúrate de ser lo más descriptivo posible.
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in slide-in-from-top-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-[#ff0400] hover:bg-[#cc0300] text-white h-12 text-base font-bold rounded-xl transition-all active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-[#111111] border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white text-lg font-bold">Preguntas Frecuentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-l-2 border-[#333] pl-4 hover:border-[#ff0400] transition-colors">
            <h3 className="font-semibold text-white mb-1">¿Cómo cambio mi membresía?</h3>
            <p className="text-sm text-gray-400">
              Puedes ver tus planes actuales en la sección de Membresías o enviarnos un ticket aquí mismo.
            </p>
          </div>
          <div className="border-l-2 border-[#333] pl-4 hover:border-[#ff0400] transition-colors">
            <h3 className="font-semibold text-white mb-1">¿Cómo funciona el código QR?</h3>
            <p className="text-sm text-gray-400">
              Tu código QR es dinámico y contiene tu información de socio. Escanéalo en la recepción para ingresar.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
