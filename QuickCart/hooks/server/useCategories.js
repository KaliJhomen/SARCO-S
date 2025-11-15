"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';

// ============================================
// QUERIES (GET - Lectura)
// ============================================

/**
 * Hook para obtener todas las categorías
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
    staleTime: 10 * 60 * 1000, 
  });
}

/**
 * Hook para obtener una categoría por ID
 */
export function useCategory(id) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

// ============================================
// MUTATIONS (POST/PUT/DELETE - Escritura)
// ============================================

/**
 * Hook para crear una categoría
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryData, token }) => categoryService.create(categoryData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

/**
 * Hook para actualizar una categoría
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, categoryData, token }) => categoryService.update(id, categoryData, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
    },
  });
}

/**
 * Hook para eliminar una categoría
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, token }) => categoryService.delete(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}