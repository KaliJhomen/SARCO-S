'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import { Package, MapPin, Calendar, CreditCard, Eye, Truck } from 'lucide-react';

import {formatPrice} from '@/utils/helpers/formatters';
// Generar órdenes dummy
const generateDummyOrders = (count = 20) => {
  const estados = ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'];
  const metodosPago = ['Tarjeta', 'Efectivo', 'Yape', 'Plin', 'Transferencia'];
  const departamentos = ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura'];
  
  const orders = [];
  
  for (let i = 0; i < count; i++) {
    const itemsCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let totalAmount = 0;    
    for (let j = 0; j < itemsCount; j++) {
      const precio = Math.floor(Math.random() * 2000) + 200;
      const cantidad = Math.floor(Math.random() * 3) + 1;
      items.push({
        nombre: `Producto ${Math.floor(Math.random() * 100) + 1}`,
        cantidad: cantidad,
        precio: precio
      });
      totalAmount += precio * cantidad;
    }
    
    orders.push({
      id_pedido: 1000 + i,
      fecha: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      estado: estados[Math.floor(Math.random() * estados.length)],
      metodoPago: metodosPago[Math.floor(Math.random() * metodosPago.length)],
      total: totalAmount,
      items: items,
      cliente: {
        nombre: `Cliente ${i + 1}`,
        telefono: `9${Math.floor(Math.random() * 100000000)}`,
        direccion: `Av. Principal ${Math.floor(Math.random() * 1000) + 1}`,
        distrito: `Distrito ${Math.floor(Math.random() * 43) + 1}`,
        departamento: departamentos[Math.floor(Math.random() * departamentos.length)]
      }
    });
  }
  
  return orders;
};

const Orders = () => {
    const { currency } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroEstado, setFiltroEstado] = useState('Todos');

    const fetchSellerOrders = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const dummyOrders = generateDummyOrders(20);
            setOrders(dummyOrders);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar órdenes:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellerOrders();
    }, []);

    const getEstadoColor = (estado) => {
        const colores = {
            'Pendiente': 'bg-yellow-100 text-yellow-700 border-yellow-300',
            'Procesando': 'bg-blue-100 text-blue-700 border-blue-300',
            'Enviado': 'bg-purple-100 text-purple-700 border-purple-300',
            'Entregado': 'bg-green-100 text-green-700 border-green-300',
            'Cancelado': 'bg-red-100 text-red-700 border-red-300'
        };
        return colores[estado] || 'bg-gray-100 text-gray-700';
    };

    const ordenesFiltradas = filtroEstado === 'Todos' 
        ? orders 
        : orders.filter(o => o.estado === filtroEstado);

    return (
        <div className="flex-1 min-h-screen flex flex-col justify-between">
            {loading ? (
                <Loading />
            ) : (
                <div className="md:p-10 p-4 space-y-5">
                    {/* Header con filtros */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Órdenes ({ordenesFiltradas.length})
                        </h2>
                        
                        {/* Filtros por estado */}
                        <div className="flex gap-2">
                            {['Todos', 'Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'].map(estado => (
                                <button
                                    key={estado}
                                    onClick={() => setFiltroEstado(estado)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                        filtroEstado === estado
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {estado}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lista de órdenes */}
                    <div className="space-y-4">
                        {ordenesFiltradas.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <Package size={48} className="mx-auto text-gray-400 mb-3" />
                                <p className="text-gray-600">No hay órdenes para mostrar</p>
                            </div>
                        ) : (
                            ordenesFiltradas.map((order) => (
                                <div 
                                    key={order.id_pedido} 
                                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    {/* Header de la orden */}
                                    <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <p className="text-xs text-gray-500">Orden</p>
                                                <p className="font-semibold text-gray-900">#{order.id_pedido}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Fecha</p>
                                                <p className="text-sm text-gray-700">
                                                    {new Date(order.fecha).toLocaleDateString('es-PE', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Total</p>
                                                <p className="font-bold text-gray-900">{formatPrice(order.total)}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getEstadoColor(order.estado)}`}>
                                                {order.estado}
                                            </span>
                                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                                <Eye size={18} className="text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contenido de la orden */}
                                    <div className="p-5">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Items */}
                                            <div className="md:col-span-2">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Package size={16} className="text-gray-500" />
                                                    <p className="font-semibold text-gray-700">
                                                        Productos ({order.items.length})
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                            <p className="text-sm text-gray-700">
                                                                <span className="font-medium">{item.nombre}</span>
                                                                <span className="text-gray-500"> x{item.cantidad}</span>
                                                            </p>
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {formatPrice(item.precio * item.cantidad)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Info del cliente y envío */}
                                            <div className="space-y-4">
                                                {/* Cliente */}
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <MapPin size={16} className="text-gray-500" />
                                                        <p className="font-semibold text-gray-700">Cliente</p>
                                                    </div>
                                                    <div className="text-sm text-gray-600 space-y-1 bg-gray-50 p-3 rounded-lg">
                                                        <p className="font-medium text-gray-900">{order.cliente.nombre}</p>
                                                        <p>{order.cliente.telefono}</p>
                                                        <p>{order.cliente.direccion}</p>
                                                        <p>{order.cliente.distrito}, {order.cliente.departamento}</p>
                                                    </div>
                                                </div>

                                                {/* Método de pago */}
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CreditCard size={16} className="text-gray-500" />
                                                        <p className="font-semibold text-gray-700">Pago</p>
                                                    </div>
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-medium">{order.metodoPago}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Acciones */}
                                        <div className="mt-5 pt-5 border-t border-gray-200 flex gap-3">
                                            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                                                <Truck size={16} />
                                                Actualizar Estado
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                                Imprimir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;