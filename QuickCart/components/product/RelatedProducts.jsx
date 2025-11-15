import React from "react";
import ProductCard from "../ProductCard";

const RelatedProducts = ({ products }) => (
  <div className="mt-12 pb-12">
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-2xl font-medium">Productos Relacionados</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard key={product.idProducto} product={product} />
      ))}
    </div>
  </div>
);

export default RelatedProducts;