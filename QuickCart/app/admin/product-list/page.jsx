'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import { ExternalLink, Edit, Trash2 } from 'lucide-react';

const ProductList = () => {
  const { router } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerProduct = async () => {

  };

  useEffect(() => {
    fetchSellerProduct();
  }, []);

  const formatPrice = (precio) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(precio);
  };

  const handleDelete = (productId) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id_producto !== productId));
      alert('Producto eliminado (simulación)');
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Todos los Productos ({products.length})
            </h2>
            <button 
              onClick={() => router.push('/admin/add-product')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Agregar Producto
            </button>
          </div>

          <div className="flex flex-col items-center max-w-full w-full overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="w-full overflow-x-auto">
              <table className="table-fixed w-full">
                <thead className="bg-gray-50 text-gray-700 text-sm text-left border-b border-gray-200">
                  <tr>
                    <th className="w-12 px-4 py-3 font-semibold">#</th>
                    <th className="w-1/3 px-4 py-3 font-semibold">Producto</th>
                    <th className="px-4 py-3 font-semibold max-md:hidden">Marca</th>
                    <th className="px-4 py-3 font-semibold max-sm:hidden">Categoría</th>
                    <th className="px-4 py-3 font-semibold">Precio</th>
                    <th className="px-4 py-3 font-semibold max-sm:hidden">Stock</th>
                    <th className="px-4 py-3 font-semibold text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                        No hay productos disponibles
                      </td>
                    </tr>
                  ) : (
                    products.map((product, index) => {
                      const precioFinal = product.descuento > 0
                        ? product.precio_venta * (1 - product.descuento / 100)
                        : product.precio_venta;

                      const stockTotal = product.colores?.reduce((sum, c) => sum + c.stock, 0) || 0;

                      return (
                        <tr 
                          key={product.id_producto} 
                          className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          {/* Número */}
                          <td className="px-4 py-3 text-gray-500 font-medium">
                            {index + 1}
                          </td>

                          {/* Producto con imagen */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={`/articulos/${product.imagen}`}
                                  alt={product.nombre}
                                  fill
                                  className="object-contain p-2"
                                  unoptimized
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {product.nombre}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {product.modelo}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Marca */}
                          <td className="px-4 py-3 max-md:hidden">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                              {product.marca?.nombre || 'N/A'}
                            </span>
                          </td>

                          {/* Categoría */}
                          <td className="px-4 py-3 max-sm:hidden">
                            <span className="text-gray-600">
                              {product.id_categoria === 1 ? 'Televisores' :
                               product.id_categoria === 2 ? 'Laptops' :
                               product.id_categoria === 3 ? 'Audio' :
                               product.id_categoria === 4 ? 'Smartphones' : 'Otros'}
                            </span>
                          </td>

                          {/* Precio */}
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">
                                {formatPrice(precioFinal)}
                              </span>
                              {product.descuento > 0 && (
                                <span className="text-xs text-gray-500 line-through">
                                  {formatPrice(product.precio_venta)}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Stock */}
                          <td className="px-4 py-3 max-sm:hidden">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              stockTotal === 0 ? 'bg-red-100 text-red-700' :
                              stockTotal < 10 ? 'bg-orange-100 text-orange-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {stockTotal} unidades
                            </span>
                          </td>

                          {/* Acciones */}
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              {/* Ver producto */}
                              <button
                                onClick={() => router.push(`/product/${product.id_producto}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Ver producto"
                              >
                                <ExternalLink size={16} />
                              </button>

                              {/* Editar */}
                              <button
                                onClick={() => router.push(`/admin/edit-product/${product.id_producto}`)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Editar producto"
                              >
                                <Edit size={16} />
                              </button>

                              {/* Eliminar */}
                              <button
                                onClick={() => handleDelete(product.id_producto)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar producto"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación (opcional) */}
            {products.length > 0 && (
              <div className="w-full px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Mostrando {products.length} productos
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                    Anterior
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;