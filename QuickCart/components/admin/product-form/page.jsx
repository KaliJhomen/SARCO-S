'use client';
import React from 'react';
import { BasicInfoSection } from './BasicInfoSection';
import { PricingSection } from './PricingSection';
import { WarrantySection } from './WarrantySection';
import { ColorStockSection } from './ColorStockSection';
import { calculateFinalPrice, calculateMonthlyPayment } from '@/utils/helpers/productValidators';

export const ProductForm = ({
  formData,
  errors,
  isSubmitting,
  updateField,
  addColor,
  removeColor,
  updateColor,
  addColorImages,
  removeColorImage,
  onSubmit,
  onCancel,
  stockTotal,
}) => {
  const precioFinal = calculateFinalPrice(formData.precio, formData.descuento);
  const cuotaMensual = calculateMonthlyPayment(precioFinal, formData.mesesSinInteres);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* INFORMACIÓN BÁSICA */}
      <BasicInfoSection
        formData={formData}
        errors={errors}
        updateField={updateField}
      />

      {/* PRECIOS Y DESCUENTO */}
      <PricingSection
        formData={formData}
        errors={errors}
        updateField={updateField}
        precioFinal={precioFinal}
      />

      {/* GARANTÍA Y FINANCIAMIENTO */}
      <WarrantySection
        formData={formData}
        updateField={updateField}
        cuotaMensual={cuotaMensual}
      />

      {/* COLORES Y STOCK */}
      <ColorStockSection
        colores={formData.colores}
        errors={errors.colores}
        stockTotal={stockTotal}
        addColor={addColor}
        removeColor={removeColor}
        updateColor={updateColor}
        addColorImages={addColorImages}
        removeColorImage={removeColorImage}
      />

      {/* BOTONES DE ACCIÓN */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  );
};