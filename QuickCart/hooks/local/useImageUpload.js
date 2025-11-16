"use client";
import { useState } from "react";
import { uploadService } from "@/services/upload.service";
import { useAuth } from "@/hooks/server/useAuth";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);
    try {
      const imageUrl = await uploadService.uploadProductImage(file, token);
      setUploading(false);
      return imageUrl;
    } catch (err) {
      setError("Error al subir la imagen");
      setUploading(false);
      return null;
    }
  };

  return { uploadImage, uploading, error };
}