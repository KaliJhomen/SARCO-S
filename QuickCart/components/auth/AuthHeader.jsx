'use client'
import React from 'react';

export default function AuthHeader({ title, subtitle, logoColor = 'bg-blue-600', logoText = 'QC' }) {
  return (
    <div className="mb-6 text-center">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${logoColor} text-white font-bold mb-3`}>
        {logoText}
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}