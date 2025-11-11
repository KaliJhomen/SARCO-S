'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Phone } from 'lucide-react';

export const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    setError('');
  };

  const validateForm = () => {
    const newErrors = {};

    // Nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    // Teléfono (opcional pero debe ser válido si se ingresa)
    if (formData.telefono && !/^\d{9}$/.test(formData.telefono)) {
      newErrors.telefono = 'Ingrese un número de teléfono válido';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Debe contener mayúscula, minúscula y número';
    }

    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono || null,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la cuenta');
      }

      // Mostrar mensaje de éxito
      setSuccess(true);

      // Esperar animación de entrada y luego salir
      setTimeout(() => {
        setIsExiting(true);
      }, 2000);

      // Redirigir después de la animación de salida
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verificar fortaleza de contraseña
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { level: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { level: 1, text: 'Muy débil', color: 'bg-red-500' },
      { level: 2, text: 'Débil', color: 'bg-orange-500' },
      { level: 3, text: 'Media', color: 'bg-yellow-500' },
      { level: 4, text: 'Fuerte', color: 'bg-green-500' },
      { level: 5, text: 'Muy fuerte', color: 'bg-green-600' }
    ];

    return levels[strength - 1] || { level: 0, text: '', color: '' };
  };

  const passwordStrength = getPasswordStrength();

  if (success) {
    return (
      <div className={`w-full max-w-md transition-all duration-500 ${
        isExiting 
          ? 'opacity-0 scale-95 translate-y-4' 
          : 'opacity-100 scale-100 translate-y-0'
      }`}>
        <div className={`bg-white rounded-2xl shadow-xl p-8 text-center transition-all duration-700 ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}>
          {/* Icono con animación */}
          <div className={`w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
            isExiting ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
          }`}>
            <CheckCircle2 className="text-green-600 animate-bounce" size={40} />
          </div>

          {/* Texto con fade in */}
          <h2 className={`text-2xl font-bold text-gray-900 mb-2 transition-all duration-500 delay-100 ${
            isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            ¡Cuenta creada!
          </h2>
          <p className={`text-gray-600 mb-6 transition-all duration-500 delay-200 ${
            isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            Tu cuenta ha sido creada exitosamente.
          </p>

          {/* Spinner con fade */}
          <div className={`flex justify-center transition-all duration-500 delay-300 ${
            isExiting ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}>
            <div className="animate-spin h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full"></div>
          </div>

          <p className={`text-sm text-gray-500 mt-4 transition-all duration-500 delay-400 ${
            isExiting ? 'opacity-0' : 'opacity-100'
          }`}>
            Redirigiendo al login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      {/* Card con animación de entrada */}
      <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
        {/* Logo con animación */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">SARCO'S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Crear cuenta</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-shake">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="animate-slide-up animation-delay-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombres <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={20} />
              <input
                type="text"
                required
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 ${
                  errors.nombre ? 'border-red-500 shake' : 'border-gray-300'
                }`}
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
              />
            </div>
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.nombre}</p>
            )}
          </div>

          {/* Email */}
          <div className="animate-slide-up animation-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                required
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="animate-slide-up animation-delay-400">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 ${
                  errors.telefono ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.telefono}
                onChange={(e) => handleChange('telefono', e.target.value)}
                maxLength="9"
              />
            </div>
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.telefono}</p>
            )}
          </div>

          {/* Password */}
          <div className="animate-slide-up animation-delay-500">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.password}</p>
            )}
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 animate-fade-in">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded transition-all duration-500 ${
                        level <= passwordStrength.level
                          ? `${passwordStrength.color} scale-y-150`
                          : 'bg-gray-200'
                      }`}
                      style={{ transitionDelay: `${level * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 transition-all duration-300">
                  Fortaleza: <span className="font-medium">{passwordStrength.text}</span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="animate-slide-up animation-delay-600">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                  value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="animate-slide-up animation-delay-700">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className={`w-4 h-4 mt-1 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.acceptTerms ? 'border-red-500' : ''
                }`}
                checked={formData.acceptTerms}
                onChange={(e) => handleChange('acceptTerms', e.target.checked)}
              />
              <span className="text-sm text-gray-700">
                Acepto los{' '}
                <Link href="/terms" className="text-purple-600 hover:underline transition-all">
                  Términos y Condiciones
                </Link>
                {' '}y la{' '}
                <Link href="/privacy" className="text-purple-600 hover:underline transition-all">
                  Política de Privacidad
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.acceptTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] animate-slide-up animation-delay-800"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creando cuenta...
              </span>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 animate-slide-up animation-delay-900">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">O regístrate con</span>
          </div>
        </div>

        {/* Social Register */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up animation-delay-1000">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6 animate-slide-up animation-delay-1100">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="text-purple-600 font-semibold hover:underline transition-all">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};