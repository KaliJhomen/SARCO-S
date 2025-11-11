'use client'
import React from 'react';
import { SlidersHorizontal, X, Grid, List } from 'lucide-react';
import FilterTag from "@/components/filters/FilterTag";

const FiltersBar = ({
  filters = {},
  onFilterChange,
  onSortChange,
  sortBy = 'featured',
  totalResults = 0,
  totalProducts = 0,
  onToggleSidebar,
  onResetFilters,
  activeFiltersCount = 0,
  viewMode = 'grid',
  onViewModeChange,
  activeFilters = {},
  onClear
}) => {
  const entries = Object.entries(activeFilters).filter(([_, v]) => !!v);
  if (entries.length === 0) return null;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left side - Filters button and count */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{totalResults}</span> de{' '}
            <span className="font-semibold text-gray-900">{totalProducts}</span> productos
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="hidden sm:flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <X size={16} />
              Limpiar
            </button>
          )}
        </div>

        {/* Right side - Sort and view mode */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
            <option value="newest">Más Recientes</option>
            <option value="discount">Mayor Descuento</option>
          </select>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center gap-1 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Vista de cuadrícula"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Vista de lista"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 w-full mt-4">
        {entries.map(([key, val]) => (
          <FilterTag key={key} label={`${key}: ${val}`} onClear={() => onClear?.(key)} />
        ))}
      </div>
    </div>
  );
};

export default FiltersBar;