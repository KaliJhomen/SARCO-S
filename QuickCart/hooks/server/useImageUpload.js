"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadService } from '@/lib/api/uploadService';

/**
 * Hook para subir imágenes de productos
 */
export function useUploadProductImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ files, token }) => uploadService.uploadProductImages(files, token),
    onSuccess: () => {
      // Opcional: invalidar productos si es necesario
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

/**
 * Hook para eliminar una imagen
 */
export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageUrl, token }) => uploadService.deleteImage(imageUrl, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}