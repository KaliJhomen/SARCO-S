"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/lib/api/orderService';

// ============================================
// QUERIES (GET - Lectura)
// ============================================

/**
 * Hook para obtener todas las órdenes del usuario
 */
export function useOrders(token) {
  return useQuery({
    queryKey: ['orders', token],
    queryFn: () => orderService.getAll(token),
    enabled: !!token,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

/**
 * Hook para obtener una orden por ID
 */
export function useOrder(id, token) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getById(id, token),
    enabled: !!id && !!token,
    staleTime: 1 * 60 * 1000,
  });
}

// ============================================
// MUTATIONS (POST/PUT/DELETE - Escritura)
// ============================================

/**
 * Hook para crear una orden
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderData, token }) => orderService.create(orderData, token),
    onSuccess: (_, variables) => {
      // Invalidar órdenes y carrito
      queryClient.invalidateQueries({ queryKey: ['orders', variables.token] });
      queryClient.invalidateQueries({ queryKey: ['cart', variables.token] });
    },
  });
}

/**
 * Hook para actualizar estado de una orden
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, token }) => orderService.updateStatus(id, status, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders', variables.token] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });
}

/**
 * Hook para cancelar una orden
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, token }) => orderService.cancel(id, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders', variables.token] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });
}