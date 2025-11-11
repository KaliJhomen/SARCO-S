"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import ColorSelector from "@/components/ColorSelector";
import { ShoppingCart, Heart, Truck, Shield, Star, Headset, Loader2 } from 'lucide-react';
import React from "react";

const Product = () => {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useAppContext();

    const [productData, setProductData] = useState(null);
    const [colorSeleccionado, setColorSeleccionado] = useState(null);
    const [imagenActiva, setImagenActiva] = useState(0);
    const [cantidad, setCantidad] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ CARGAR DATOS DEL PRODUCTO
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('🔍 Cargando producto ID:', id);

                // ✅ OBTENER PRODUCTO ACTUAL
                const productResponse = await fetch(`http://localhost:4000/api/producto/${id}`);
                
                console.log('📡 Response status:', productResponse.status);
                console.log('📡 Response headers:', productResponse.headers.get('content-type'));

                // ✅ VERIFICAR SI LA RESPUESTA ES JSON
                const contentType = productResponse.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await productResponse.text();
                    console.error('❌ Response no es JSON:', text.substring(0, 200));
                    throw new Error('El servidor no respondió con JSON. Verifica que el endpoint exista.');
                }

                if (!productResponse.ok) {
                    throw new Error(`Error ${productResponse.status}: Producto no encontrado`);
                }

                const productData = await productResponse.json();
                console.log('✅ Producto cargado:', productData);

                // ✅ VERIFICAR SI EL PRODUCTO EXISTE
                if (!productData || productData.statusCode === 404) {
                    throw new Error('Producto no encontrado');
                }

                setProductData(productData);

                // ✅ OBTENER PRODUCTOS RELACIONADOS (mismo idMarca)
                const allProductsResponse = await fetch('http://localhost:4000/api/producto');
                const allProducts = await allProductsResponse.json();
                
                const related = allProducts
                    .filter(p => 
                        p.idMarca === productData.idMarca && 
                        p.idProducto !== productData.idProducto
                    )
                    .slice(0, 5);
                
                console.log('✅ Productos relacionados:', related.length);
                setRelatedProducts(related);

                // ✅ SELECCIONAR PRIMER COLOR SI EXISTE
                if (productData.colores && productData.colores.length > 0) {
                    setColorSeleccionado(productData.colores[0]);
                }

            } catch (err) {
                console.error('❌ Error cargando producto:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (id) fetchData();
    }, [id]);

    // ✅ RESETEAR IMAGEN AL CAMBIAR COLOR
    useEffect(() => {
        setImagenActiva(0);
    }, [colorSeleccionado]);

    // ✅ LOADING STATE
    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <Loader2 className="h-16 w-16 text-orange-600 animate-spin mb-4" />
                    <p className="text-gray-600">Cargando producto...</p>
                </div>
                <Footer />
            </>
        );
    }
    
    // ✅ ERROR STATE
    if (error || !productData) {
        return (
            <>
                <Navbar />
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
                <Footer />
            </>
        );
    }

    // ✅ CÁLCULOS DE PRECIO
    const precioOriginal = Number(productData.precioVenta || 0);
    const descuento = Number(productData.descuento || 0);
    const precioFinal = descuento > 0 
        ? precioOriginal * (1 - descuento / 100)
        : precioOriginal;

    const formatPrice = (precio) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2,
        }).format(precio);
    };

    // ✅ HANDLERS
    const handleAddToCart = () => {
        if (!productData) {
            alert('Error: No se pudo cargar el producto');
            return;
        }

        if (productData.colores && productData.colores.length > 0) {
            if (!colorSeleccionado || colorSeleccionado.stock === 0) {
                alert('Por favor selecciona un color disponible');
                return;
            }
        } else if (productData.stock === 0) {
            alert('Producto agotado');
            return;
        }
        
        addToCart({
            id: productData.idProducto,
            nombre: productData.nombre,
            precio: precioFinal,
            color: colorSeleccionado?.color?.nombre || 'Sin color',
            cantidad: cantidad,
            imagen: colorSeleccionado?.imagen || productData.imagen
        });
        
        alert(`✅ Agregado al carrito:\n${productData.nombre}\nCantidad: ${cantidad}`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push('/cart');
    };

    // ✅ OBTENER IMÁGENES
    const imagenesDelColor = colorSeleccionado?.imagenes || 
                            (colorSeleccionado?.imagen ? [colorSeleccionado.imagen] : 
                            (productData.imagen ? [productData.imagen] : []));
    
    const imagenPrincipal = imagenesDelColor[imagenActiva] || productData.imagen;
    
    const imageUrl = imagenPrincipal 
        ? `/productos/${imagenPrincipal}`
        : '/productos/placeholder.svg';

    const stockDisponible = colorSeleccionado?.stock || productData.stock || 0;

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
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
                    <div className="flex flex-col">
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

                        <p className="text-gray-700 mb-6">
                            {productData.descripcion || 'Sin descripción'}
                        </p>

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

                {/* Productos relacionados */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12 pb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-2xl font-medium">Productos Relacionados</p>
                                <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product.idProducto} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Product;