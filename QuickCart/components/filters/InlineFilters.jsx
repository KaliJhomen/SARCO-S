'use client'
import React, { useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import { buildFilterParams, getUniqueBrands } from "@/components/filters/filters.utils";

const InlineFilters = ({
  filters = {},
  onFilterChange,
  onResetFilters,
  products = [],
  router
}) => {
  // Obtener marcas únicas
  const brands = useMemo(() => getUniqueBrands(products), [products]);

  const apply = useCallback(() => {
    const qs = buildFilterParams(filters);
    router.push(`/all-products?${qs}`);
  }, [filters, router]);

  return (
    <div className="lg:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder="Buscar productos..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange({ inStock: !filters.inStock })}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filters.inStock
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          En Stock
        </button>
        
        <button
          onClick={() => onFilterChange({ onSale: !filters.onSale })}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filters.onSale
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          En Oferta
        </button>

        {(filters.search || filters.inStock || filters.onSale || filters.brand) && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Brand Select */}
      {brands.length > 0 && (
        <select
          value={filters.brand || ''}
          onChange={(e) => onFilterChange({ brand: e.target.value ? Number(e.target.value) : null })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Todas las marcas</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      )}

      <button className="px-3 py-2 bg-orange-600 text-white rounded" onClick={apply}>Aplicar</button>
    </div>
  );
};

export default InlineFilters;