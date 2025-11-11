'use client';
import React from 'react';
import { DollarSign } from 'lucide-react';

export const PricingSection = ({
  formData,
  errors,
  updateField,
  precioFinal,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <DollarSign className="text-green-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-900">Precios</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio (S/.) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              errors?.precio ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.precio}
            onChange={(e) => updateField('precio', e.target.value)}
          />
          {errors?.precio && (
            <p className="text-red-500 text-sm mt-1">{errors.precio}</p>
          )}
        </div>

        {/* Descuento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descuento (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="0"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.descuento}
            onChange={(e) => updateField('descuento', e.target.value)}
          />
        </div>

        {/* Precio Final */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio Final
          </label>
          <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 font-semibold">
            S/. {precioFinal.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Info adicional */}
      {formData.descuento > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <span className="font-semibold">
              S/. {(parseFloat(formData.precio || 0) - precioFinal).toFixed(2)} 
              ({formData.descuento} % de descuento)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};