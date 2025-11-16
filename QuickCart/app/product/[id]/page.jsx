"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDescription from "@/components/product/ProductDescription";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductActions from "@/components/product/ProductActions";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useProductDetails } from "@/hooks/server/useProductDetails";

import {formatPrice} from '@/utils/helpers/formatters';

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useAppContext();

  const { productData, relatedProducts, loading, error } = useProductDetails(id);

  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (productData?.colores?.length > 0) {
      setColorSeleccionado(productData.colores[0]);
    }
  }, [productData]);

  useEffect(() => setImagenActiva(0), [colorSeleccionado]);

  // Notificación temporal
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 1800);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 text-orange-600 animate-spin mb-4" />
        <p className="text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="px-6 md:px-16 lg:px-32 py-20 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-2xl text-gray-800 font-semibold mb-2">
          {error || 'Producto no encontrado'}
        </p>
        <p className="text-gray-600 mb-6">
          El producto que buscas no está disponible o no existe.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Volver al inicio
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }

  const precioOriginal = Number(productData.precioVenta || 0);
  const descuento = Number(productData.descuento || 0);
  const precioFinal = descuento > 0 ? precioOriginal * (1 - descuento / 100) : precioOriginal;

  const handleAddToCart = () => {
    if (!productData) return;
    if (productData.colores?.length > 0 && (!colorSeleccionado || colorSeleccionado.stock === 0)) {
      setNotification("Por favor selecciona un color disponible");
      return;
    } else if (productData.stock === 0) {
      setNotification("Producto agotado");
      return;
    }
    addToCart({
      id: productData.idProducto,
      nombre: productData.nombre,
      precio: precioFinal,
      color: colorSeleccionado?.color?.nombre || 'Sin color',
      cantidad,
      imagen: colorSeleccionado?.imagen || productData.imagen
    });
    setNotification(`Agregado al carrito: ${productData.nombre}`);
  };

  const imagenesDelColor = colorSeleccionado?.imagenes ||
    (colorSeleccionado?.imagen ? [colorSeleccionado.imagen] :
      (productData.imagen ? [productData.imagen] : []));
  const imagenPrincipal = imagenesDelColor[imagenActiva] || productData.imagen;
  const imageUrl = imagenPrincipal
    ? `/productos/${imagenPrincipal}`
    : '/productos/placeholder.svg';
  const stockDisponible = colorSeleccionado?.stock || productData.stock || 0;

  // Funciones para acciones
  const handleToggleFavorite = () => {
    setIsFavorite((fav) => !fav);
    setNotification(isFavorite ? "Quitado de favoritos" : "Agregado a favoritos");
  };
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setNotification("¡Enlace copiado!");
  };

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      {/* Notificación simple */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all">
          {notification}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Imagen */}
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <Image
              src={imageUrl}
              alt={productData.nombre}
              fill
              className="object-contain p-8"
              unoptimized
            />
            {descuento > 0 && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                {Math.round(descuento)}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Información del producto */}
        <div className="relative flex flex-col">
          {/* ProductActions en la esquina superior derecha */}
          <ProductActions
            className="absolute top-0 right-0 z-10"
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShare}
          />
          <p className="text-sm text-orange-600 font-semibold mb-2 uppercase">
            {productData.idMarca2?.nombre || 'MARCA'}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {productData.nombre}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            {descuento > 0 ? (
              <>
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(precioFinal)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(precioOriginal)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(precioOriginal)}
              </span>
            )}    
          </div>
          <ProductDescription descripcion={productData.descripcion} />
          {/* SECCIÓN DE COLORES */}
          {productData.colores && productData.colores.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-800 font-semibold mb-2">
                Colores disponibles:
              </p>
              <div className="flex flex-wrap gap-2">
                {productData.colores.map((color) => (
                  <button
                    key={color.idColor}
                    onClick={() => setColorSeleccionado(color)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${colorSeleccionado?.idColor === color.idColor
                        ? 'ring-2 ring-orange-500'
                        : 'border-transparent'}
                    `}
                    title={color.color.nombre}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: color.color.hex }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={stockDisponible === 0}
              className="w-full py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              {stockDisponible === 0 ? 'Agotado' : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts}/>
      )}  
    </div>
  );
};

export default Product;