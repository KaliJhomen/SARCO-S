"use client";
import React from "react";
import ProductsGrid from "@/components/ProductsGrid";

const ProductsSection = ({
  displayedProducts,
  filteredProducts,
  allProducts,
  searchQuery,
  isLoading,
  isLoadingMore,
  hasMoreProducts,
  viewMode,
  onLoadMore,
  observerRef,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="mb-12">
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <ProductsGrid products={displayedProducts} loading={isLoading} viewMode={viewMode} />
          

          {!hasMoreProducts && filteredProducts.length > 20 && (
            <div className="text-center mt-8 py-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600">Has visto todos los productos</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-2 text-orange-600 hover:text-orange-700 font-medium"
              >
                Volver arriba ↑
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState hasFilters={hasActiveFilters} onClearFilters={onClearFilters} />
      )}
    </div>
  );
};

export default ProductsSection;