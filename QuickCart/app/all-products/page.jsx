'use client';
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/filters/Breadcrumbs';
import CategoriesMenu from '@/components/filters/CategoriesMenu';
import FiltersBar from '@/components/filters/FiltersBar';
import FiltersSidebar from '@/components/filters/FiltersSidebar';
import InlineFilters from '@/components/filters/InlineFilters';
import { useFilters } from '@/hooks/local/useFilters';
import { Loader2, Grid3x3, List, SlidersHorizontal } from 'lucide-react';

const AllProducts = () => {
  //Hook de filtros personalizado
  const {
    filteredProducts = [],
    isLoading,
    error,
    activeFilters = [],
    setSearchQuery,
    setBrandFilter,
    setCategoryFilter,
    setPriceRange,
    setInStockOnly,
    clearFilters,
    clearFilter,
    sortBy,
    setSortBy,
  } = useFilters();

  // Estados locales
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const PRODUCTS_PER_PAGE = 20;
  const [displayedProductsCount, setDisplayedProductsCount] = useState(PRODUCTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // Ref para observer de scroll infinito
  const observerTarget = useRef(null);

  // Productos a mostrar (paginados)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayedProductsCount);
  }, [filteredProducts, displayedProductsCount]);

  // Indicadores de paginación
  const hasMoreProducts = displayedProductsCount < filteredProducts.length;

  // Cargar más productos
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMoreProducts) return;

    setIsLoadingMore(true);
    
    // Simular delay de red (opcional)
    setDisplayedProductsCount(prev => 
      Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length)
    );
    setIsLoadingMore(false);
  }, [isLoadingMore, hasMoreProducts, filteredProducts.length, PRODUCTS_PER_PAGE]);

  // Intersection Observer para scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreProducts && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMoreProducts, isLoadingMore, loadMore]);

  // Resetear paginación cuando cambian los filtros
  useEffect(() => {
    setDisplayedProductsCount(PRODUCTS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filteredProducts.length]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-red-800 font-bold mb-2">Error al cargar productos</h2>
          <p className="text-red-600 text-sm mb-4">{error.message || 'Error desconocido'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-4" />

        {/* Menú de categorías */}
        <CategoriesMenu className="mb-6" />

        {/* Barra de filtros superior */}
        <FiltersBar 
          onSearchChange={setSearchQuery}
          onClearFilters={clearFilters}
          activeFiltersCount={activeFilters.length}
          className="mb-6"
        />

        {/* Layout con sidebar */}
        <div className="flex gap-6">

          {/* Sidebar de filtros (desktop) */}
          {showSidebar && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FiltersSidebar
                onBrandChange={setBrandFilter}
                onCategoryChange={setCategoryFilter}
                onPriceRangeChange={setPriceRange}
                onInStockChange={setInStockOnly}
                onClearFilters={clearFilters}
              />
            </aside>
          )}

          {/* Contenido principal */}
          <main className="flex-1 min-w-0">
            
            {/* Header con controles */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                
                {/* Info de resultados */}
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Productos
                  </h1>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-semibold">
                      Mostrando {displayedProducts.length} de {filteredProducts.length}
                    </p>
                  </div>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-3">
                  
                  {/* Botón filtros móvil */}
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <SlidersHorizontal size={18} />
                    Filtros
                    {activeFilters.length > 0 && (
                      <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {activeFilters.length}
                      </span>
                    )}
                  </button>

                  {/* Toggle sidebar (desktop) */}
                  <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="hidden lg:block px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    title={showSidebar ? 'Ocultar filtros' : 'Mostrar filtros'}
                  >
                    <SlidersHorizontal size={18} />
                  </button>

                  {/* Ordenar */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="newest">Más recientes</option>
                    <option value="price-asc">Precio: Menor a mayor</option>
                    <option value="price-desc">Precio: Mayor a menor</option>
                    <option value="name-asc">Nombre: A-Z</option>
                    <option value="name-desc">Nombre: Z-A</option>
                    <option value="popular">Más populares</option>
                  </select>

                  {/* Vista grid/list */}
                  <div className="hidden sm:flex gap-1 border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-orange-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="Vista en cuadrícula"
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list'
                          ? 'bg-orange-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="Vista en lista"
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Filtros activos (tags) */}
              {activeFilters.length > 0 && (
                <InlineFilters
                  activeFilters={activeFilters}
                  onRemoveFilter={clearFilter}
                  onClearAll={clearFilters}
                  className="mt-4"
                />
              )}
            </div>

            {/* Filtros móviles (drawer) */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6">
                <FiltersSidebar
                  onBrandChange={setBrandFilter}
                  onCategoryChange={setCategoryFilter}
                  onPriceRangeChange={setPriceRange}
                  onInStockChange={setInStockOnly}
                  onClearFilters={() => {
                    clearFilters();
                    setShowMobileFilters(false);
                  }}
                />
              </div>
            )}

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeFilters.length > 0
                      ? 'Intenta ajustar los filtros para ver más resultados'
                      : 'No hay productos disponibles en este momento'}
                  </p>
                  {activeFilters.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </div>
            )}

            {/*Grid de productos */}
            {filteredProducts.length > 0 && (
              <>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }>
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id || product.idProducto}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Loading More Indicator */}
                {isLoadingMore && (
                  <div className="flex justify-center items-center py-8 mt-6">
                    <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
                    <span className="ml-3 text-gray-600">Cargando más productos...</span>
                  </div>
                )}

                {/* Intersection Observer Target (para scroll infinito) */}
                {hasMoreProducts && !isLoadingMore && (
                  <div ref={observerTarget} className="h-20 flex items-center justify-center mt-6">
                    <div className="text-gray-400 text-sm">
                      Desplázate para cargar más...
                    </div>
                  </div>
                )}

                {/* Mensaje final */}
                {!hasMoreProducts &&(
                  <div className="text-center mt-8 py-4 bg-gray-100 rounded-lg">
                    <p className="text-gray-600">
                      Has visto todos los {filteredProducts.length} productos
                    </p>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="mt-2 text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Volver arriba ↑
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;


