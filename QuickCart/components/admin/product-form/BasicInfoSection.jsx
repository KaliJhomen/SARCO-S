'use client';
import React from 'react';
import { Package, Loader2 } from 'lucide-react';
import { useBrands } from '@/hooks/server/useBrands';
import { useCategories } from '@/hooks/server/useCategories';

export const BasicInfoSection = ({
  formData,
  errors,
  updateField,
}) => {
  // ✅ Obtener datos reales de BD
  const { data: brands = [], isLoading: loadingBrands } = useBrands();
  const { data: categories = [], isLoading: loadingCategories } = useCategories();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Package className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-900">Información Básica</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nombre del Producto */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Producto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder='Ej: Smart TV LED 55" 4K Ultra HD'
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              errors?.nombre ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.nombre}
            onChange={(e) => updateField('nombre', e.target.value)}
          />
          {errors?.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

        {/* Modelo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej: XPS 13 9310"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              errors?.modelo ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.modelo}
            onChange={(e) => updateField('modelo', e.target.value)}
          />
          {errors?.modelo && (
            <p className="text-red-500 text-sm mt-1">{errors.modelo}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            placeholder="Ej: 100"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              errors?.stock ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.stock}
            onChange={(e) => updateField('stock', e.target.value)}
          />
          {errors?.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
          )}
        </div>

        {/* Marca - desde BD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                errors?.marca || errors?.idMarca ? 'border-red-500' : 'border-gray-300'
              } ${loadingBrands ? 'opacity-50' : ''}`}
              value={formData.idMarca || formData.marca}
              onChange={(e) => updateField('idMarca', e.target.value)}
              disabled={loadingBrands}
            >
              <option value="">
                {loadingBrands ? 'Cargando marcas...' : 'Seleccionar marca'}
              </option>
              {brands.map((marca) => (
                <option key={marca.id || marca.idMarca} value={marca.id || marca.idMarca}>
                  {marca.nombre}
                </option>
              ))}
            </select>
            {loadingBrands && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-400" />
            )}
          </div>
          {(errors?.marca || errors?.idMarca) && (
            <p className="text-red-500 text-sm mt-1">{errors.marca || errors.idMarca}</p>
          )}
        </div>

        {/* Categoría - desde BD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                errors?.categoria || errors?.idCategoria ? 'border-red-500' : 'border-gray-300'
              } ${loadingCategories ? 'opacity-50' : ''}`}
              value={formData.idCategoria || formData.categoria}
              onChange={(e) => updateField('idCategoria', e.target.value)}
              disabled={loadingCategories}
            >
              <option value="">
                {loadingCategories ? 'Cargando categorías...' : 'Seleccionar categoría'}
              </option>
              {categories.map((categoria) => (
                <option key={categoria.id || categoria.idCategoria} value={categoria.id || categoria.idCategoria}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
            {loadingCategories && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-400" />
            )}
          </div>
          {(errors?.categoria || errors?.idCategoria) && (
            <p className="text-red-500 text-sm mt-1">{errors.categoria || errors.idCategoria}</p>
          )}
        </div>

        {/* Imagen principal */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen principal <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            placeholder="URL de la imagen principal"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              errors?.imagen ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.imagen}
            onChange={(e) => updateField('imagen', e.target.value)}
          />
          {errors?.imagen && (
            <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>
          )}
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            placeholder="Descripción detallada del producto..."
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none ${
              errors?.descripcion ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.descripcion}
            onChange={(e) => updateField('descripcion', e.target.value)}
          />
          {errors?.descripcion && (
            <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
          )}
        </div>
      </div>
    </div>
  );
};