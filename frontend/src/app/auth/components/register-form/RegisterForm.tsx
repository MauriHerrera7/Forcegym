'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RegisterFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  weight: string;
  height: string;
  objective: string;
  activity: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  birthDate?: string;
  weight?: string;
  height?: string;
  objective?: string;
  activity?: string;
}

export default function RegisterForm({ className = '' }: RegisterFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    weight: '',
    height: '',
    objective: '',
    activity: 'moderada'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Introduce un correo válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.birthDate) newErrors.birthDate = 'Requerido';
    if (!formData.weight) newErrors.weight = 'Requerido';
    if (!formData.height) newErrors.height = 'Requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('Registro con:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
      // logic handles redirect or success
    } catch (error) {
      console.error('Registration error:', error);
      setError('Error al registrar. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-lg mx-auto px-6 py-8 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Header compact */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Crea tu cuenta</h2>
          <p className="text-zinc-500 text-sm">Inicia tu transformación hoy</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-xs animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        {/* Basic Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5 col-span-2 sm:col-span-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full bg-black/40 text-white px-3 py-2.5 rounded-xl border text-sm transition-all duration-300 outline-none
                ${errors.name ? 'border-red-500/50' : 'border-zinc-800 focus:border-white'}`}
              placeholder="Juan Pérez"
            />
          </div>

          <div className="space-y-1.5 col-span-2 sm:col-span-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full bg-black/40 text-white px-3 py-2.5 rounded-xl border text-sm transition-all duration-300 outline-none
                ${errors.email ? 'border-red-500/50' : 'border-zinc-800 focus:border-white'}`}
              placeholder="nombre@ejemplo.com"
            />
          </div>

          <div className="space-y-1.5 col-span-2 sm:col-span-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full bg-black/40 text-white px-3 py-2.5 rounded-xl border text-sm transition-all duration-300 outline-none
                ${errors.password ? 'border-red-500/50' : 'border-zinc-800 focus:border-white'}`}
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-1.5 col-span-2 sm:col-span-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Confirmar</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full bg-black/40 text-white px-3 py-2.5 rounded-xl border text-sm transition-all duration-300 outline-none
                ${errors.confirmPassword ? 'border-red-500/50' : 'border-zinc-800 focus:border-white'}`}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Physical Data Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1 text-center block">Nacimiento</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className={`w-full bg-black/40 text-white px-2 py-2.5 rounded-xl border text-[11px] text-center transition-all duration-300 outline-none
                ${errors.birthDate ? 'border-red-500/50' : 'border-zinc-800 focus:border-white'}`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1 text-center block">Peso (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className={`w-full bg-black/40 text-white px-2 py-2.5 rounded-xl border text-sm text-center transition-all duration-300 outline-none
                ${errors.weight ? 'border-red-500/50' : 'border-zinc-800 focus:border-white'}`}
              placeholder="70"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1 text-center block">Altura (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              className={`w-full bg-black/40 text-white px-2 py-2.5 rounded-xl border text-sm text-center transition-all duration-300 outline-none
                ${errors.height ? 'border-red-500/50' : 'border-zinc-800 focus:border-white'}`}
              placeholder="175"
            />
          </div>
        </div>

        {/* Activity & Objective */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5 col-span-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Frecuencia de Actividad</label>
            <div className="relative">
              <select
                value={formData.activity}
                onChange={(e) => handleInputChange('activity', e.target.value)}
                className="w-full bg-black text-white px-3 py-2.5 rounded-xl border border-zinc-800 focus:border-white text-sm transition-all duration-300 outline-none appearance-none cursor-pointer"
              >
                <option value="moderada">Moderada (1-3 días)</option>
                <option value="activa">Activa (4-5 días)</option>
                <option value="muy_activa">Muy activa (6+ días)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 col-span-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Objetivo Fitness</label>
            <textarea
              value={formData.objective}
              onChange={(e) => handleInputChange('objective', e.target.value)}
              className="w-full bg-black/40 text-white px-3 py-2 rounded-xl border border-zinc-800 focus:border-white text-sm transition-all duration-300 outline-none resize-none h-14"
              placeholder="¿Qué quieres lograr?"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black hover:!bg-red-700 hover:!text-white py-3.5 rounded-full text-base font-bold transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creando cuenta...' : 'Comenzar Ahora'}
          </button>
          
          <p className="text-center text-xs text-zinc-500 mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-white hover:underline font-bold transition-all">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
