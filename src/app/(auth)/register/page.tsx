'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dni: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // TODO: Implement actual registration logic
    console.log('Register:', formData);
    router.push('/auth/login');
  };

  return (
    <Card className="bg-dark-soft border-gray-700">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <h1 className="text-4xl font-black text-primary">FORCEGYM</h1>
        </div>
        <CardTitle className="text-2xl text-center text-white">
          Crear Cuenta
        </CardTitle>
        <p className="text-center text-gray-400">
          Únete a la familia ForceGym
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Nombre Completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Juan Pérez"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-dark border-gray-600 text-white"
              required
            />
          </div>

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
            <Label htmlFor="dni" className="text-gray-300">
              DNI
            </Label>
            <Input
              id="dni"
              type="text"
              placeholder="12345678"
              value={formData.dni}
              onChange={(e) =>
                setFormData({ ...formData, dni: e.target.value })
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-300">
              Confirmar Contraseña
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="bg-dark border-gray-600 text-white"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Registrarse
          </Button>

          <div className="text-center text-sm text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              Inicia sesión aquí
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
