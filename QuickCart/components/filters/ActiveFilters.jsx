'use client'
import React from 'react';
import FilterTag from './FilterTag';

const ActiveFilters = ({ filters, activeFiltersCount, onRemoveFilter, onResetFilters }) => {
  if (activeFiltersCount === 0) return null;

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1920px] mx-auto py-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-600 font-medium">
          Filtros activos ({activeFiltersCount}):
        </span>
        
        {filters.search && (
          <FilterTag label={`Búsqueda: "${filters.search}"`} onRemove={() => onRemoveFilter('search')} />
        )}
        
        {filters.category && (
          <FilterTag label={`Categoría: ${filters.category}`} onRemove={() => onRemoveFilter('category')} />
        )}
        
        {filters.brand && (
          <FilterTag label={`Marca: ${filters.brand}`} onRemove={() => onRemoveFilter('brand')} />
        )}
        
        {(filters.minPrice > 0 || filters.maxPrice < Infinity) && (
          <FilterTag label={`Precio: S/ ${filters.minPrice} - S/ ${filters.maxPrice}`} onRemove={() => onRemoveFilter('priceRange')} />
        )}
        
        {filters.inStock && (
          <FilterTag label="En stock" onRemove={() => onRemoveFilter('inStock')} />
        )}
        
        {filters.onSale && (
          <FilterTag label="En oferta" onRemove={() => onRemoveFilter('onSale')} />
        )}

        <button onClick={onResetFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium ml-2">
          Limpiar todo
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;