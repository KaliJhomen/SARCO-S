"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { colorService } from '@/services/color.service';

// ============================================
// QUERIES (GET - Lectura)
// ============================================
/**
 * Hook para obtener todos los colores
 */
export function useColors() {
  return useQuery({
    queryKey: ['colors'],
    queryFn: colorService.getAll,
  });
}
export function useColor(id) {
  return useQuery({
    queryKey: ['color', id],
    queryFn: () => colorService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

// ============================================
// MUTATIONS (POST/PUT/DELETE - Escritura)
// ============================================
/**
 * Hook para crear un color
 */
export function useCreateColor() {
  const queryClient = useQueryClient();
    return useMutation({
    mutationFn: ({ colorData, token }) => colorService.create(colorData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
    },
  });
}

/**
 * Hook para actualizar un color
 */
export function useUpdateColor() {
  const queryClient = useQueryClient();
    return useMutation({
    mutationFn: ({ id, colorData, token }) => colorService.update(id, colorData, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
        queryClient.invalidateQueries({ queryKey: ['color', variables.id] });
    },
  });
}   
/**
 * Hook para eliminar un color
 */
export function useDeleteColor() {
  const queryClient = useQueryClient();
    return useMutation({
    mutationFn: ({ id, token }) => colorService.delete(id, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
        queryClient.invalidateQueries({ queryKey: ['color', variables.id] });
    },
  });
}