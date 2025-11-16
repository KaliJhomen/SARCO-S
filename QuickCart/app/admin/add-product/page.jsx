'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useProductForm } from '@/hooks/local/useProductForm';
import { productService } from '@/services/product.service';
import { ProductForm } from '@/components/admin/product-form/page';
import toast from 'react-hot-toast';
import { useImageUpload } from "@/hooks/local/useImageUpload";

const AddProductPage = () => {
  const router = useRouter();
  const productForm = useProductForm();
  const { uploadImage, uploading, error } = useImageUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Valor de fechaIngreso:', productForm.formData.fechaIngreso);
    if (!productForm.validate()) {
      console.log('Errores de validación:', productForm.errors);
      toast.error('Por favor completa todos los campos requeridos correctamente');
      return false;
    }

    productForm.setIsSubmitting(true);

    try {
      const result = await productService.create(productForm.formData);

      toast.success('Producto creado exitosamente');
      productForm.resetForm();
      router.push(`/admin/products/${result.id || result.idProducto}`);
      return true; // <-- aquí retornas true si todo salió bien
    } catch (error) {
      console.log('Error al guardar producto:', error); // <-- aquí
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        'Error al crear el producto';
      toast.error(errorMessage);
      return false; // <-- explícito
    } finally {
      productForm.setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm('¿Seguro que deseas cancelar? Los cambios no guardados se perderán.')) {
      router.back();
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      <div className="md:p-10 p-4 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Agregar Nuevo Producto
          </h1>
          <p className="text-gray-600 mt-1">
            Los campos marcados con (*) son obligatorios
          </p>

          {/* Mostrar precio final y stock total */}
          {productForm.formData.precio && (
            <div className="mt-4 flex gap-6 text-sm">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-gray-600">Precio final: </span>
                <span className="font-bold text-blue-700">
                  S/ {productForm.precioFinal.toFixed(2)}
                </span>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <span className="text-gray-600">Stock total: </span>
                <span className="font-bold text-green-700">
                  {productForm.stockTotal} unidades
                </span>
              </div>
              {productForm.formData.mesesSinInteres > 0 && (
                <div className="bg-purple-50 px-4 py-2 rounded-lg">
                  <span className="text-gray-600">Pago mensual: </span>
                  <span className="font-bold text-purple-700">
                    S/ {productForm.pagoMensual.toFixed(2)} x {productForm.formData.mesesSinInteres} meses
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Formulario */}
        <ProductForm
          {...productForm}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const imageUrl = await uploadImage(file);
              if (imageUrl) {
                productForm.updateField('imagen', imageUrl);
              }
            }
          }}
        />
        {uploading && <span>Subiendo imagen...</span>}
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default AddProductPage;