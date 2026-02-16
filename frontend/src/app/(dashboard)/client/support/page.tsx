'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ClientSupportPage() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement support ticket submission
    console.log('Support ticket:', formData);
    alert('Mensaje enviado correctamente!');
    setFormData({ subject: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Soporte</h1>
        <p className="text-gray-400">¿Necesitas ayuda? Estamos aquí para ti</p>
      </div>

      {/* Contact Form */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white">Enviar Mensaje</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-300">
                Asunto
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="bg-dark border-gray-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300">
                Mensaje
              </Label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="flex w-full rounded-md border border-gray-600 bg-dark px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Enviar Mensaje
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white">Preguntas Frecuentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-white">¿Cómo cambio mi membresía?</h3>
            <p className="text-sm text-gray-400">
              Puedes cambiar tu membresía desde la sección de Membresías o contactando a nuestro equipo.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">¿Puedo congelar mi membresía?</h3>
            <p className="text-sm text-gray-400">
              Sí, puedes congelar tu membresía por hasta 30 días. Contacta a soporte para más información.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">¿Cómo funciona el código QR?</h3>
            <p className="text-sm text-gray-400">
              Tu código QR es único y te permite acceder al gimnasio. Simplemente escanéalo en la entrada.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
