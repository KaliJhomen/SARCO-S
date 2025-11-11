'use client';
import React from 'react';
import { Shield, CreditCard } from 'lucide-react';
import { WARRANTIES, CREDIT_OPTIONS } from '@/utils/constants';

export const WarrantySection = ({
  formData,
  updateField,
  cuotaMensual,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Shield className="text-purple-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-900">Garantía y Financiamiento</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Garantía */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Garantía
          </label>
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.garantia}
            onChange={(e) => updateField('garantia', e.target.value)}
          >
            <option value="">Sin garantía</option>
            {WARRANTIES.map((garantia) => (
              <option key={garantia} value={garantia}>
                {garantia}
              </option>
            ))}
          </select>
        </div>

        {/* Meses sin Intereses */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meses sin Intereses
          </label>
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.mesesSinInteres}
            onChange={(e) => updateField('mesesSinInteres', e.target.value)}
          >
            {CREDIT_OPTIONS.map((opcion) => (
              <option key={opcion.meses} value={opcion.meses}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cuota Mensual */}
      {formData.mesesSinInteres && cuotaMensual > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-900">
            <CreditCard size={20} />
            <span className="font-medium">
              Cuota mensual: S/. {cuotaMensual.toFixed(2)} x {formData.mesesSinInteres} meses
            </span>
          </div>
        </div>
      )}
    </div>
  );
};