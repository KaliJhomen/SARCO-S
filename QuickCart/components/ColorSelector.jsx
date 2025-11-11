'use client'
import React from 'react';
import { Check } from 'lucide-react';

const ColorSelector = ({ colores, colorSeleccionado, onColorSelect }) => {
  if (!colores || colores.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block font-semibold text-gray-900">
          Color: <span className="font-normal text-gray-600">{colorSeleccionado?.color.nombre}</span>
        </label>
        {colorSeleccionado?.stock > 0 && (
          <span className="text-sm text-green-600">
            {colorSeleccionado.stock} disponibles
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {colores.map((productoColor) => (
          <button
            key={productoColor.id_producto_color}
            onClick={() => onColorSelect(productoColor)}
            disabled={productoColor.stock === 0}
            className={`
              relative group
              ${productoColor.stock === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
            title={`${productoColor.color.nombre} ${productoColor.stock === 0 ? '(Agotado)' : `(${productoColor.stock} disponibles)`}`}
          >
            {/* Círculo de color */}
            <div
              className={`
                w-12 h-12 rounded-full border-2 transition-all duration-200
                ${colorSeleccionado?.id_producto_color === productoColor.id_producto_color
                  ? 'border-blue-600 ring-2 ring-blue-300'
                  : 'border-gray-300 hover:border-blue-400'
                }
                ${productoColor.stock === 0 ? 'relative' : ''}
              `}
              style={{ backgroundColor: productoColor.color.codigo_hex }}
            >
              {/* Check para color seleccionado */}
              {colorSeleccionado?.id_producto_color === productoColor.id_producto_color && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-full p-0.5">
                    <Check size={16} className="text-blue-600" strokeWidth={3} />
                  </div>
                </div>
              )}

              {/* Línea de agotado */}
              {productoColor.stock === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-500 rotate-45" />
                </div>
              )}
            </div>

            {/* Tooltip con nombre del color */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {productoColor.color.nombre}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;