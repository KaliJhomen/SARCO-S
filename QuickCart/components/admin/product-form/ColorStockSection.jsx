'use client';
import React from 'react';
import { Palette } from 'lucide-react';
import { ColorCard } from './ColorCard';

export const ColorStockSection = ({
  colores,
  errors,
  stockTotal,
  addColor,
  removeColor,
  updateColor,
  addColorImages,
  removeColorImage,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Palette className="text-orange-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">
            Colores y Stock
          </h2>
        </div>
        <div className="text-sm text-gray-600">
          Stock Total: <span className="font-semibold text-gray-900">{stockTotal} unidades</span>
        </div>
      </div>

      {/* Lista de colores */}
      <div className="space-y-4">
        {colores.map((color, index) => (
          <ColorCard
            key={color.id}
            color={color}
            index={index}
            canRemove={colores.length > 1}
            onRemove={removeColor}
            onUpdate={updateColor}
            onAddImages={addColorImages}
            onRemoveImage={removeColorImage}
          />
        ))}
      </div>

      {/* Error general de colores */}
      {errors && (
        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
          {errors}
        </p>
      )}

      {/* Botón agregar color */}
      <button
        type="button"
        onClick={addColor}
        className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium"
      >
        + Agregar Color
      </button>
    </div>
  );
};