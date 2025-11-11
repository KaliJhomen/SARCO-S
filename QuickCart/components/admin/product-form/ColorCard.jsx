'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Upload, AlertCircle } from 'lucide-react';
import { COLORS } from '@/utils/constants';

export const ColorCard = ({ 
  color, 
  index, 
  canRemove, 
  onRemove, 
  onUpdate, 
  onAddImages, 
  onRemoveImage 
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    onAddImages(color.id, files);
  };

  const handleColorSelect = (e) => {
    const selectedValue = e.target.value;
    
    console.log('Color seleccionado:', selectedValue); // Debug
    
    if (selectedValue === 'custom') {
      setShowCustomInput(true);
      onUpdate(color.id, 'colorId', 'custom');
      onUpdate(color.id, 'nombreColor', '');
      onUpdate(color.id, 'codigoHex', '#000000');
    } else if (selectedValue) {
      const selectedColor = COLORS.find(c => c.id.toString() === selectedValue);
      console.log('Color encontrado:', selectedColor); // Debug
      
      if (selectedColor) {
        setShowCustomInput(false);
        onUpdate(color.id, 'colorId', selectedColor.id);
        onUpdate(color.id, 'nombreColor', selectedColor.nombre);
        onUpdate(color.id, 'codigoHex', selectedColor.hex);
      }
    } else {
      // Vacío
      setShowCustomInput(false);
      onUpdate(color.id, 'colorId', '');
      onUpdate(color.id, 'nombreColor', '');
      onUpdate(color.id, 'codigoHex', '#E5E7EB');
    }
  };

  const handleCustomColorChange = (e) => {
    onUpdate(color.id, 'codigoHex', e.target.value);
  };

  // Detectar si es personalizado
  useEffect(() => {
    if (color.colorId === 'custom') {
      setShowCustomInput(true);
    } else if (color.colorId && !COLORS.find(c => c.id === color.colorId)) {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
  }, [color.colorId]);

  return (
    <div className="border border-gray-200 rounded-lg p-5 relative bg-white">
      {/* Botón eliminar */}
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(color.id)}
          className="absolute top-3 right-3 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar color"
        >
          <X size={18} />
        </button>
      )}

      <h3 className="font-semibold text-gray-900 mb-4">Color {index + 1}</h3>

      {/* Campos del color */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Selector de Color con indicador visual */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Color <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {/* Indicador visual del color */}
            <div className="flex-shrink-0">
              <div 
                className="w-11 h-11 rounded-lg border-2 border-gray-300 shadow-sm transition-all"
                style={{ backgroundColor: color.codigoHex || '#E5E7EB' }}
                title={color.nombreColor || 'Sin color seleccionado'}
              />
            </div>
            
            {/* Select */}
            <select
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={color.colorId || ''}
              onChange={handleColorSelect}
            >
              <option value="">Seleccionar color</option>
              {COLORS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} ({c.hex})
                </option>
              ))}
              <option value="custom">➕ Color personalizado</option>
            </select>
          </div>
          
          {/* Debug info */}
          <p className="text-xs text-gray-500 mt-1">
            Valor actual: {color.colorId || 'ninguno'} | Nombre: {color.nombreColor || 'vacío'}
          </p>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="0"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={color.stock || ''}
            onChange={(e) => onUpdate(color.id, 'stock', e.target.value)}
          />
        </div>
      </div>

      {/* Input personalizado si selecciona "custom" */}
      {showCustomInput && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-3">
            Configurar color personalizado
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre personalizado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Color <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Azul Cielo, Verde Menta"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={color.nombreColor || ''}
                onChange={(e) => onUpdate(color.id, 'nombreColor', e.target.value)}
              />
            </div>

            {/* Selector de código hex */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="w-12 h-11 rounded border border-gray-300 cursor-pointer"
                  value={color.codigoHex || '#000000'}
                  onChange={handleCustomColorChange}
                />
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                  value={color.codigoHex || ''}
                  onChange={(e) => onUpdate(color.id, 'codigoHex', e.target.value)}
                  placeholder="#000000"
                  maxLength="7"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview del color seleccionado (solo si NO es personalizado) */}
      {color.nombreColor && !showCustomInput && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
            style={{ backgroundColor: color.codigoHex }}
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{color.nombreColor}</p>
            <p className="text-xs text-gray-500">{color.codigoHex}</p>
          </div>
        </div>
      )}

      {/* Imágenes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imágenes del Color (máximo 4) <span className="text-red-500">*</span>
        </label>
        
        <div className="flex flex-wrap gap-3">
          {/* Preview de imágenes subidas */}
          {color.imagenes && color.imagenes.map((img, imgIdx) => (
            <div 
              key={imgIdx} 
              className="relative w-24 h-24 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 group"
            >
              <Image
                src={URL.createObjectURL(img)}
                alt={`Preview ${imgIdx + 1}`}
                fill
                className="object-contain p-2"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(color.id, imgIdx)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Eliminar imagen"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Botón para subir más imágenes */}
          {(!color.imagenes || color.imagenes.length < 4) && (
            <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Upload size={20} className="text-gray-400" />
              <span className="text-xs text-gray-500 mt-1">Subir</span>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* Mensaje de advertencia si no hay imágenes */}
        {(!color.imagenes || color.imagenes.length === 0) && (
          <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
            <AlertCircle size={16} />
            Este color necesita al menos una imagen
          </p>
          )}
      </div>
    </div>
  );
};


