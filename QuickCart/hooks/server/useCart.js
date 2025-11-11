"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/lib/api/cartService';

/**
 * Hook para obtener el carrito del usuario
 */
export function useCart(token) {
  return useQuery({
    queryKey: ['cart', token],
    queryFn: () => cartService.getCart(token),
    enabled: !!token,
    staleTime: 30 * 1000, // 30 segundos (el carrito cambia frecuentemente)
  });
}

/**
 * Hook para agregar un item al carrito
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemData, token }) => cartService.addItem(itemData, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart', variables.token] });
    },
  });
}

/**
 * Hook para actualizar cantidad de un item
 */
export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity, token }) => 
      cartService.updateQuantity(itemId, quantity, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart', variables.token] });
    },
  });
}

/**
 * Hook para eliminar un item del carrito
 */
export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, token }) => cartService.removeItem(itemId, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart', variables.token] });
    },
  });
}

/**
 * Hook para vaciar el carrito
 */
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token) => cartService.clearCart(token),
    onSuccess: (_, token) => {
      queryClient.invalidateQueries({ queryKey: ['cart', token] });
    },
  });
}