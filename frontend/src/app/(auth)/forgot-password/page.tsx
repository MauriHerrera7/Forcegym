'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { fetchApi } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fetchApi('/users/password-reset/', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setSuccess(true);
    } catch (err: unknown) {
      const apiError = err as { message?: string };
      setError(apiError.message || 'Ocurrió un error. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-dark-soft border-gray-700">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <h1 className="text-4xl font-black text-primary">FORCEGYM</h1>
        </div>
        <CardTitle className="text-2xl text-center text-white">
          Recuperar Contraseña
        </CardTitle>
        <p className="text-center text-gray-400">
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
        </p>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-900/30 border border-green-700 p-4 text-center">
              <p className="text-green-400 font-medium">¡Correo enviado!</p>
              <p className="text-gray-400 text-sm mt-1">
                Si el email existe en nuestra base de datos, recibirás un enlace
                para restablecer tu contraseña.
              </p>
            </div>
            <div className="text-center text-sm text-gray-400">
              <Link href="/auth/login" className="text-primary hover:underline">
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-dark border-gray-600 text-white"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-900/30 border border-red-700 p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </Button>

            <div className="text-center text-sm text-gray-400">
              <Link href="/auth/login" className="text-primary hover:underline">
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
