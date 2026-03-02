'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { fetchApi } from '@/lib/api';

export default function ResetPasswordConfirmPage() {
  const router = useRouter();
  const params = useParams();

  // Parse uid and token from the dynamic route segments
  const uid = params?.uid as string;
  const token = params?.token as string;

  const [formData, setFormData] = useState({
    new_password: '',
    new_password_confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (formData.new_password !== formData.new_password_confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      await fetchApi('/users/password-reset/confirm/', {
        method: 'POST',
        body: JSON.stringify({
          uid,
          token,
          new_password: formData.new_password,
          new_password_confirm: formData.new_password_confirm,
        }),
      });
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (err: unknown) {
      const apiError = err as { message?: string; data?: Record<string, string[]> };
      // Handle field-level errors from Django (e.g. password validation)
      if (apiError.data && typeof apiError.data === 'object') {
        setFieldErrors(apiError.data);
      } else {
        setError(
          apiError.message ||
            'El enlace de recuperación no es válido o ha expirado. Por favor solicita uno nuevo.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!uid || !token) {
    return (
      <Card className="bg-dark-soft border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <h1 className="text-4xl font-black text-primary">FORCEGYM</h1>
          </div>
          <CardTitle className="text-2xl text-center text-white">
            Enlace inválido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-red-900/30 border border-red-700 p-4 text-center">
            <p className="text-red-400 font-medium">
              El enlace de recuperación no es válido.
            </p>
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            <Link
              href="/auth/forgot-password"
              className="text-primary hover:underline"
            >
              Solicitar nuevo enlace
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dark-soft border-gray-700">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <h1 className="text-4xl font-black text-primary">FORCEGYM</h1>
        </div>
        <CardTitle className="text-2xl text-center text-white">
          Nueva Contraseña
        </CardTitle>
        <p className="text-center text-gray-400">
          Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta
        </p>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-900/30 border border-green-700 p-4 text-center">
              <p className="text-green-400 font-medium">
                ¡Contraseña restablecida con éxito!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Serás redirigido al inicio de sesión en unos segundos...
              </p>
            </div>
            <div className="text-center text-sm text-gray-400">
              <Link href="/auth/login" className="text-primary hover:underline">
                Ir al inicio de sesión
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new_password" className="text-gray-300">
                Nueva contraseña
              </Label>
              <Input
                id="new_password"
                type="password"
                placeholder="••••••••"
                value={formData.new_password}
                onChange={(e) =>
                  setFormData({ ...formData, new_password: e.target.value })
                }
                className="bg-dark border-gray-600 text-white"
                required
                disabled={loading}
              />
              {fieldErrors.new_password && (
                <p className="text-red-400 text-sm">
                  {fieldErrors.new_password.join(' ')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new_password_confirm" className="text-gray-300">
                Confirmar nueva contraseña
              </Label>
              <Input
                id="new_password_confirm"
                type="password"
                placeholder="••••••••"
                value={formData.new_password_confirm}
                onChange={(e) =>
                  setFormData({ ...formData, new_password_confirm: e.target.value })
                }
                className="bg-dark border-gray-600 text-white"
                required
                disabled={loading}
              />
              {fieldErrors.new_password_confirm && (
                <p className="text-red-400 text-sm">
                  {fieldErrors.new_password_confirm.join(' ')}
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-red-900/30 border border-red-700 p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {fieldErrors.token && (
              <div className="rounded-lg bg-red-900/30 border border-red-700 p-3">
                <p className="text-red-400 text-sm">
                  {fieldErrors.token.join(' ')} Por favor{' '}
                  <Link
                    href="/auth/forgot-password"
                    className="underline text-primary"
                  >
                    solicita un nuevo enlace
                  </Link>
                  .
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Guardando...' : 'Restablecer contraseña'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
