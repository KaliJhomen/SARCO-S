'use client';
import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import AuthHeader from './AuthHeader'; 
import { useLoginForm } from './hooks/useLoginForm';
import PasswordInput from './PasswordInput';
import SocialButtons from './SocialButtons';
import { useRouter } from 'next/navigation';
export const LoginForm = () => {
  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit
  } = useLoginForm();
  const router = useRouter();

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
        
        {/* Header con animación */}
        <AuthHeader 
          title="Bienvenido a SARCO'S"
          subtitle="Inicia sesión en tu cuenta"
          logoColor="bg-blue-600"
          logoText="QC"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email con animación */}
          <div className="animate-slide-up animation-delay-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={20} />
              <input
                type="email"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>

          {/* Password con animación */}
          <PasswordInput
            label="Contraseña"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            animationDelay="animation-delay-300"
          />

          {/* Remember Me + Forgot Password con animación */}
          <div className="flex items-center justify-between animate-slide-up animation-delay-400">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 transition-all"
                checked={formData.rememberMe}
                onChange={(e) => handleChange('rememberMe', e.target.checked)}
              />
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                Recordarme
              </span>
            </label>
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-blue-600 hover:underline transition-all"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

        </form>

        {/* Social Buttons con animación */}
        <SocialButtons animationDelay="animation-delay-600" />

        {/* Continuar como invitado */}
        <div className="mt-4 animate-slide-up animation-delay-650">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Continuar como invitado
          </button>
        </div>

      {/* Register Link con animación */}
      <p className="text-center text-sm text-gray-600 mt-6 animate-slide-up animation-delay-700">
        ¿No tienes cuenta?{' '}
        <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline transition-all">
          Regístrate aquí
        </Link>
      </p>
      </div>

      {/* Footer con animación */}
      <p className="text-center text-xs text-gray-500 mt-6 animate-slide-up animation-delay-800">
        Al continuar, aceptas nuestros{' '}
        <Link href="/terms" className="underline hover:text-gray-700 transition-colors">
          Términos de Servicio
        </Link>
        {' '}y{' '}
        <Link href="/privacy" className="underline hover:text-gray-700 transition-colors">
          Política de Privacidad
        </Link>
      </p>
    </div>
  );
};