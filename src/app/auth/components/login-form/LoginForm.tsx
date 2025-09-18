'use client';

import { useState } from 'react';

interface LoginFormProps {
  className?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm({ className = '' }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }

    // Validar password
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Aquí iría la lógica de autenticación
      console.log('Login attempt:', { email, password });
      
      // Simulamos una petición async
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('¡Login exitoso! Bienvenido a ForceGym');
      
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Hubo un error en el login. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('Google sign in attempt');
    // Aquí iría la lógica de Google Sign In
    alert('Funcionalidad de Google Sign In - En desarrollo');
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Bienvenido de vuelta
        </h2>
        <p className="text-gray-400">
          Ingresa a tu cuenta para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Email */}
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: undefined }));
              }
            }}
            className={`w-full px-4 py-3 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
              errors.email ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="Correo electrónico"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Campo Password */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: undefined }));
                }
              }}
              className={`w-full px-4 py-3 pr-12 rounded-lg border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-gray-700 transition-all duration-200 font-medium ${
                errors.password ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
              }`}
              placeholder="Contraseña"
              disabled={isLoading}
            />
            {/* Botón de ojo para mostrar/ocultar contraseña */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-200"
              disabled={isLoading}
            >
              {showPassword ? (
                // Icono de ojo cerrado (ocultar)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                // Icono de ojo abierto (mostrar)
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
          
          {/* Checkbox "Recordarme" y Forgot password */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-500 rounded bg-gray-800"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Recordarme
              </label>
            </div>
            <a href="#" className="text-sm text-gray-400 hover:text-red-400 transition-colors duration-200">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {/* Botón de Login */}
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Iniciando sesión...</span>
            </div>
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="text-gray-400 text-sm">o</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Botón de Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continuar con Google</span>
        </button>

        {/* Link para ir al registro */}
        <div className="text-center">
          <p className="text-gray-400">
            ¿No tienes cuenta?{' '}
            <a href="/auth/register" className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200">
              Regístrate aquí
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
