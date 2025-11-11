'use client'
import React from 'react';

/**
 * SocialButtons - botones para login social
 * Props:
 *  - onGoogle: () => void
 *  - onFacebook: () => void
 *  - className: string
 *  - animationDelay: string
 */
export default function SocialButtons({
  onGoogle = () => {},
  onFacebook = () => {},
  className = '',
  animationDelay = '',
}) {
  return (
    <div className={`mt-6 space-y-3 ${animationDelay} ${className}`}>
      <button
        type="button"
        onClick={onGoogle}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:shadow-sm transition"
        aria-label="Iniciar sesión con Google"
      >
        {/* Simple Google mark */}
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21.805 10.023h-9.78v3.954h5.604c-.24 1.536-1.464 3.55-4.238 3.55-2.55 0-4.628-2.102-4.628-4.695s2.078-4.695 4.628-4.695c1.45 0 2.422.616 2.98 1.145l3.212-3.093C17.83 4.06 15.633 3 12 3 6.478 3 2 7.477 2 13s4.478 10 10 10c5.75 0 9.84-4.03 9.84-9.69 0-.65-.055-1.11-.035-1.287z" fill="#EA4335"/>
        </svg>
        <span className="text-sm font-medium text-gray-700">Continuar con Google</span>
      </button>

      <button
        type="button"
        onClick={onFacebook}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        aria-label="Iniciar sesión con Facebook"
      >
        {/* Simple Facebook mark */}
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M22 12.073C22 6.48 17.523 2 12 2S2 6.48 2 12.073c0 4.991 3.657 9.128 8.438 9.924v-7.02H7.898v-2.903h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.903h-2.33v7.02C18.343 21.2 22 17.064 22 12.073z" fill="white"/>
        </svg>
        <span className="text-sm font-medium">Continuar con Facebook</span>
      </button>
    </div>
  );
}