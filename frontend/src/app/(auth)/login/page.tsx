'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login:', formData);
    
    // For demo purposes, redirect based on email
    if (formData.email.includes('admin')) {
      router.push('/admin');
    } else {
      router.push('/client');
    }
  };

  return (
    <Card className="bg-dark-soft border-gray-700">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <h1 className="text-4xl font-black text-primary">FORCEGYM</h1>
        </div>
        <CardTitle className="text-2xl text-center text-white">
          Iniciar Sesión
        </CardTitle>
        <p className="text-center text-gray-400">
          Ingresa tus credenciales para acceder
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-dark border-gray-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-dark border-gray-600 text-white"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>

          <div className="text-center text-sm text-gray-400">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/register" className="text-primary hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
