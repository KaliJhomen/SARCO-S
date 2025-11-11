'use client'
import React, { useMemo } from 'react';
import { getUniqueBrands, getPriceRange } from './filters.utils';

const FiltersSidebar = ({
  filters = {},
  onFilterChange,
  onResetFilters,
  products = [],
}) => {
  // Obtener marcas únicas de los productos
  const brands = useMemo(() => getUniqueBrands(products), [products]);

  // Obtener rango de precios
  const priceRange = useMemo(() => getPriceRange(products), [products]);

  const handleBrandChange = (brandId) => {
    onFilterChange({
      brand: filters.brand === brandId ? null : brandId,
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      [name]: Number(value),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6 sticky top-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Limpiar todo
        </button>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Rango de Precio</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Precio Mínimo</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice || 0}
              onChange={handlePriceChange}
              min={0}
              max={priceRange.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={`S/ ${priceRange.min}`}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Precio Máximo</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice === Infinity ? priceRange.max : filters.maxPrice}
              onChange={handlePriceChange}
              min={0}
              max={priceRange.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={`S/ ${priceRange.max}`}
            />
          </div>
          <div className="text-xs text-gray-500">
            Rango disponible: S/ {priceRange.min} - S/ {priceRange.max}
          </div>
        </div>
      </div>

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Marcas</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {brands.map((brand) => (
              <label
                key={brand.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.brand === brand.id}
                  onChange={() => handleBrandChange(brand.id)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Stock Status */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Disponibilidad</h4>
        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => onFilterChange({ inStock: e.target.checked })}
            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Solo con stock disponible</span>
        </label>
      </div>

      {/* Sale Status */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Ofertas</h4>
        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            checked={filters.onSale || false}
            onChange={(e) => onFilterChange({ onSale: e.target.checked })}
            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Solo productos en oferta</span>
        </label>
      </div>

      {/* Active Filters Count */}
      {(filters.brand || filters.inStock || filters.onSale || filters.minPrice > 0 || filters.maxPrice < Infinity) && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {Object.values(filters).filter(Boolean).length} filtro(s) activo(s)
          </p>
        </div>
      )}
    </div>
  );
};

export default FiltersSidebar;

