/**
 * Validaciones específicas de productos según esquema BD
 */

const validateProductForm = (formData) => {
  const errors = {};

  // ✅ Nombre requerido
  if (!formData.nombre?.trim()) {
    errors.nombre = 'El nombre es requerido';
  } else if (formData.nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  // ✅ Descripción requerida
  if (!formData.descripcion?.trim()) {
    errors.descripcion = 'La descripción es requerida';
  } else if (formData.descripcion.length < 10) {
    errors.descripcion = 'La descripción debe tener al menos 10 caracteres';
  }

  // ✅ Marca requerida (idMarca)
  if (!formData.marca && !formData.idMarca) {
    errors.marca = 'La marca es requerida';
  }

  // ✅ Categoría requerida (idCategoria)
  if (!formData.categoria && !formData.idCategoria) {
    errors.categoria = 'La categoría es requerida';
  }

  // ✅ Precio válido
  if (!formData.precio || parseFloat(formData.precio) <= 0) {
    errors.precio = 'El precio debe ser mayor a 0';
  } else if (parseFloat(formData.precio) > 999999) {
    errors.precio = 'El precio es demasiado alto';
  }

  // ✅ Descuento válido (0-100)
  if (formData.descuento !== undefined && formData.descuento !== null) {
    const desc = parseFloat(formData.descuento);
    if (desc < 0 || desc > 100) {
      errors.descuento = 'El descuento debe estar entre 0 y 100';
    }
  }

  // ✅ Validar al menos un color con imágenes y stock
  const hasValidColor = formData.colores?.some(
    c => c.nombreColor?.trim() && 
         c.imagenes?.length > 0 && 
         parseInt(c.stock) > 0
  );

  if (!hasValidColor) {
    errors.colores = 'Al menos un color debe tener nombre, imágenes y stock mayor a 0';
  }

  // ✅ Validar cada color individualmente
  formData.colores?.forEach((color, idx) => {
    if (color.nombreColor?.trim()) {
      // Si tiene nombre, debe tener imágenes
      if (!color.imagenes || color.imagenes.length === 0) {
        errors[`color_${idx}_imagenes`] = 'Este color debe tener al menos una imagen';
      }
      // Si tiene nombre, debe tener stock
      if (!color.stock || parseInt(color.stock) <= 0) {
        errors[`color_${idx}_stock`] = 'El stock debe ser mayor a 0';
      }
    }
  });

  // ✅ Validar meses sin interés
  if (formData.mesesSinInteres && ![0, 3, 6, 9, 12, 18, 24].includes(parseInt(formData.mesesSinInteres))) {
    errors.mesesSinInteres = 'Meses sin interés inválido (0, 3, 6, 9, 12, 18, 24)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const calculateFinalPrice = (precio, descuento) => {
  const price = parseFloat(precio) || 0;
  const discount = parseFloat(descuento) || 0;
  return price * (1 - discount / 100);
};

const calculateMonthlyPayment = (precio, meses) => {
  const mesesNum = parseInt(meses) || 1;
  if (mesesNum === 0) return parseFloat(precio) || 0;
  return (parseFloat(precio) || 0) / mesesNum;
};

const calculateTotalStock = (colores) => {
  return colores?.reduce((sum, c) => sum + (parseInt(c.stock) || 0), 0) || 0;
};

const formatPrice = (precio) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(precio);
};

module.exports = {
  validateProductForm,
  calculateFinalPrice,
  calculateMonthlyPayment,
  calculateTotalStock,
  formatPrice,
};