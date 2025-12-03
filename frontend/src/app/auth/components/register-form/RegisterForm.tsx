'use client';

import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar fecha de nacimiento
    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 100) {
        newErrors.birthDate = 'Debes tener entre 13 y 100 años';
      }
    }

    // Validar peso
    if (!formData.weight) {
      newErrors.weight = 'El peso es requerido';
    } else {
      const weight = parseFloat(formData.weight);
      if (isNaN(weight) || weight < 30 || weight > 300) {
        newErrors.weight = 'Ingresa un peso válido (30-300 kg)';
      }
    }

    // Validar altura
    if (!formData.height) {
      newErrors.height = 'La altura es requerida';
    } else {
      const height = parseFloat(formData.height);
      if (isNaN(height) || height < 100 || height > 250) {
        newErrors.height = 'Ingresa una altura válida (100-250 cm)';
      }
    }

    // Validar objetivo
    if (!formData.objective.trim()) {
      newErrors.objective = 'El objetivo es requerido';
    } else if (formData.objective.trim().length < 10) {
      newErrors.objective = 'Describe tu objetivo con más detalle (mín. 10 caracteres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Aquí iría la lógica de registro
      console.log('Datos de registro:', formData);
      
      // Simulamos una petición async
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('¡Registro exitoso! Bienvenido a ForceGym');
      
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un error en el registro. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Únete a ForceGym
        </h2>
        <p className="text-gray-400">
          Crea tu cuenta y comienza tu transformación
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nombre */}
        <div>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
              errors.name ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="Nombre completo"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.name}</p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
              errors.email ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="Correo electrónico"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full px-4 py-2.5 pr-12 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
                errors.password ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
              }`}
              placeholder="Contraseña"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-200"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.password}</p>
          )}
        </div>

        {/* Campo Confirmar Contraseña */}
        <div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full px-4 py-2.5 pr-12 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
                errors.confirmPassword ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
              }`}
              placeholder="Confirmar contraseña"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-200"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Campo Fecha de Nacimiento */}
        <div>
          <input
            type="date"
            id="birthDate"
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
              errors.birthDate ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
            }`}
            disabled={isLoading}
          />
          {errors.birthDate && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.birthDate}</p>
          )}
        </div>

        {/* Campo Peso */}
        <div>
          <input
            type="number"
            id="weight"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
              errors.weight ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="Peso (kg)"
            min="30"
            max="300"
            step="0.1"
            disabled={isLoading}
          />
          {errors.weight && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.weight}</p>
          )}
        </div>

        {/* Campo Altura */}
        <div>
          <input
            type="number"
            id="height"
            value={formData.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
              errors.height ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="Altura (cm)"
            min="100"
            max="250"
            disabled={isLoading}
          />
          {errors.height && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.height}</p>
          )}
        </div>

        {/* Campo Objetivo */}
        <div>
          <textarea
            id="objective"
            value={formData.objective}
            onChange={(e) => handleInputChange('objective', e.target.value)}
            rows={2}
            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium resize-none ${
              errors.objective ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="Describe tu objetivo fitness..."
            disabled={isLoading}
          />
          {errors.objective && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.objective}</p>
          )}
        </div>

        {/* Campo Nivel de Actividad */}
        <div>
          <select
            id="activity"
            value={formData.activity}
            onChange={(e) => handleInputChange('activity', e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
              errors.activity ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
            }`}
            disabled={isLoading}
          >
            <option value="moderada">Actividad Moderada (1-3 días/semana)</option>
            <option value="activa">Actividad Activa (4-5 días/semana)</option>
            <option value="regular">Actividad Regular (6-7 días/semana)</option>
          </select>
          {errors.activity && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.activity}</p>
          )}
        </div>

        {/* Botón de Registro */}
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creando cuenta...</span>
            </div>
          ) : (
            'Crear cuenta'
          )}
        </button>

        {/* Link para ir al login */}
        <div className="text-center">
          <p className="text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <a href="/auth/login" className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}