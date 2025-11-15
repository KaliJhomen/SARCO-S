/* Validaciones específicas de productos*/

const validateProductForm = (formData) => {
  const errors = {};
/*
  SECCION BASICA 
*/
  // Nombre requerido
  if (!formData.nombre?.trim()) {
    errors.nombre = 'El nombre es requerido';
  }

  // Modelo 
  if (!formData.modelo?.trim()) {
    errors.modelo = 'El modelo es requerido';
  }

  // Marca (select, debe tener idMarca seleccionado)
  if (!formData.idMarca || isNaN(Number(formData.idMarca))) {
    errors.idMarca = 'La marca es requerida';
  }

  // Categoría (select, debe tener idCategoria seleccionado)
  if (!formData.idCategoria || isNaN(Number(formData.idCategoria))) {
    errors.idCategoria = 'La categoría es requerida';
  }
/* SECCION DE PRECIOS Y STOCK */
  // Precio válido
  if (!formData.precio || parseFloat(formData.precio) <= 0) {
    errors.precio = 'El precio debe ser mayor a 0';
  } 

  // Descuento válido (0-100)
  if (formData.descuento !== undefined && formData.descuento !== null) {
    const desc = parseFloat(formData.descuento);
    if (desc < 0 || desc > 100) {
      errors.descuento = 'Ingrese un descuento válido entre 0 y 100';
    }
  }
/* SECCION DE COLORES Y STOCK */
  // Validar al menos un color con nombre y stock mayor a 0 (imagenes ya no es obligatorio)
  const hasValidColor = formData.colores?.some(
    c => c.nombreColor?.trim() && 
         parseInt(c.stock) > 0
  );

  if (!hasValidColor) {
    errors.colores = 'Al menos un color debe tener nombre y stock mayor a 0';
  }

  // Validar cada color individualmente
  formData.colores?.forEach((color, idx) => {
    if (color.nombreColor?.trim()) {
      // Si tiene nombre, debe tener stock
      if (!color.stock || parseInt(color.stock) <= 0) {
        errors[`color_${idx}_stock`] = 'El stock debe ser mayor a 0';
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateProductForm,
};