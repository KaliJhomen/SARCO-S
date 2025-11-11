"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { brandService } from '@/services/brand.service';

// ============================================
// QUERIES (GET - Lectura)
// ============================================

/**
 * Hook para obtener todas las marcas
 */
export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: brandService.getAll,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

/**
 * Hook para obtener una marca por ID
 */
export function useBrand(id) {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => brandService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

// ============================================
// MUTATIONS (POST/PUT/DELETE - Escritura)
// ============================================

/**
 * Hook para crear una marca
 */
export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandData, token }) => brandService.create(brandData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
}

/**
 * Hook para actualizar una marca
 */
export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, brandData, token }) => brandService.update(id, brandData, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      queryClient.invalidateQueries({ queryKey: ['brand', variables.id] });
    },
  });
}

/**
 * Hook para eliminar una marca
 */
export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, token }) => brandService.delete(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
}