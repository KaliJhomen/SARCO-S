'use client';
import { useState, useMemo } from 'react';
import { validateProductForm } from '@/utils/helpers/productValidators';
import {calculateFinalPrice, calculateMonthlyPayment, calculateTotalStock } from '@/utils/helpers/calculators';

export const useProductForm = () => {
  const [formData, setFormData] = useState({
    // Campos básicos del producto
    nombre: '',
    modelo: '',         
    descripcion: '',
    precioTope: '',
    precioVenta: '',
    descuento: 0,
    
    // Relaciones (IDs) - según tu BD
    idMarca: '',
    idCategoria: '',
    idTienda: '',       // <--- Faltaba
    
    // Información adicional
    garantia: '',
    mesesCredito: 0,
/*    
    // Colores con sus imágenes y stock
    colores: [{
      id: Date.now(),
      nombreColor: '',
      codigoHex: '#000000',
      stock: 0,
      imagenes: [] // URLs de imágenes subidas
    }]
*/      
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcular valores derivados usando helpers
  const precioFinal = useMemo(() => 
    calculateFinalPrice(formData.precio, formData.descuento),
    [formData.precio, formData.descuento]
  );

  const pagoMensual = useMemo(() => 
    calculateMonthlyPayment(formData.precio, formData.mesesSinInteres),
    [formData.precio, formData.mesesSinInteres]
  );

  const stockTotal = useMemo(() => 
    calculateTotalStock(formData.colores),
    [formData.colores]
  );

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo al editar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colores: [
        ...prev.colores,
        {
          id: Date.now(),
          nombreColor: '',
          codigoHex: '#000000',
          stock: 0,
          imagenes: []
        }
      ]
    }));
  };

  const removeColor = (colorId) => {
    if (formData.colores.length > 1) {
      setFormData(prev => ({
        ...prev,
        colores: prev.colores.filter(c => c.id !== colorId)
      }));
    }
  };

  const updateColor = (colorId, field, value) => {
    setFormData(prev => ({
      ...prev,
      colores: prev.colores.map(c =>
        c.id === colorId ? { ...c, [field]: value } : c
      )
    }));
  };

  const addColorImages = (colorId, newImages) => {
    setFormData(prev => ({
      ...prev,
      colores: prev.colores.map(c => {
        if (c.id === colorId) {
          const combinedImages = [...c.imagenes, ...newImages].slice(0, 4);
          return { ...c, imagenes: combinedImages };
        }
        return c;
      })
    }));
  };

  const removeColorImage = (colorId, imageIndex) => {
    setFormData(prev => ({
      ...prev,
      colores: prev.colores.map(c => {
        if (c.id === colorId) {
          return {
            ...c,
            imagenes: c.imagenes.filter((_, idx) => idx !== imageIndex)
          };
        }
        return c;
      })
    }));
  };

  // Validar usando productValidators existente
  const validate = () => {
    const validation = validateProductForm({
      nombre: formData.nombre,
      idMarca: formData.idMarca,
      precio: formData.precio,
      idCategoria: formData.idCategoria,
      colores: formData.colores,
      imagen: formData.imagen, // si usas imagen principal
      modelo: formData.modelo, // si usas modelo
      idTienda: formData.idTienda, // si usas tienda
      // ...otros campos necesarios
    });

    setErrors(validation.errors);
    return validation.isValid;
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      modelo: '',         // <--- Faltaba
      descripcion: '',
      precio: '',
      descuento: 0,
      idMarca: '',
      idCategoria: '',
      idTienda: '',       // <--- Faltaba
      imagen: '',         // <--- Faltaba
      garantia: '',
      mesesSinInteres: 0,
      colores: [{
        id: Date.now(),
        nombreColor: '',
        codigoHex: '#000000',
        stock: 0,
        imagenes: []
      }]
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    updateField,
    addColor,
    removeColor,
    updateColor,
    addColorImages,
    removeColorImage,
    validate,
    resetForm,
    // Valores calculados
    precioFinal,
    pagoMensual,
    stockTotal,
  };
};