'use client'
import React, { useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({
  label = 'Password',
  value = '',
  onChange = () => {},
  name = 'password',
  animationDelay = '',
}) {
  const [visible, setVisible] = useState(false);

  const strength = useMemo(() => {
    const s = {
      length: value.length >= 8,
      lower: /[a-z]/.test(value),
      upper: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value),
    };
    const score = Object.values(s).reduce((acc, v) => acc + (v ? 1 : 0), 0); // 0..5
    let color = 'bg-gray-200';
    let labelText = 'Muy débil';
    if (score <= 1) { color = 'bg-red-500'; labelText = 'Muy débil'; }
    else if (score === 2) { color = 'bg-orange-400'; labelText = 'Débil'; }
    else if (score === 3) { color = 'bg-yellow-400'; labelText = 'Media'; }
    else if (score === 4) { color = 'bg-green-400'; labelText = 'Fuerte'; }
    else if (score === 5) { color = 'bg-green-600'; labelText = 'Muy fuerte'; }

    return { score, color, labelText };
  }, [value]);

  return (
    <div className={`animate-slide-up ${animationDelay}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="relative">
        <input
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
          aria-label={label}
          autoComplete="current-password"
        />

        <button
          type="button"
          onClick={() => setVisible((s) => !s)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {value.length > 0 && (
        <div className="mt-2">
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`${strength.color} h-2`}
              style={{ width: `${(strength.score / 5) * 100}%`, transition: 'width 180ms ease' }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-600 flex items-center justify-between">
            <span>{strength.labelText}</span>
            <span>{value.length} caracteres</span>
          </div>
        </div>
      )}
    </div>
  );
}