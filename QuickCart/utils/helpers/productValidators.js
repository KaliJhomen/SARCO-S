/* Validaciones específicas de productos*/

const validateProductForm = (formData) => {
  const errors = {};
/*
  SECCION Basica Producto
*/
  // Nombre requerido
  if (!formData.nombre?.trim()) {
    errors.nombre = 'El nombre es requerido';
  }
  // Marca 
  if (!formData.idMarca || isNaN(Number(formData.idMarca))) {
    errors.idMarca = 'La marca es requerida';
  }

  // Descuento válido (0-100)
  if (formData.descuento !== undefined && formData.descuento !== null) {
    const desc = parseFloat(formData.descuento);
    if (desc < 0 || desc > 100) {
      errors.descuento = 'Ingrese un descuento válido entre 0 y 100';
    }
  }
  if (!formData.precioTope || isNaN(Number(formData.precioTope))) {
    errors.precioTope = 'El precio de compra es requerido y debe ser un número';
  }

  if (!formData.precioVenta || isNaN(Number(formData.precioVenta))) {
    errors.precioVenta = 'El precio de venta es requerido y debe ser un número';
  }
  
  if (!formData.idCategoria || isNaN(Number(formData.idCategoria))) {
    errors.idCategoria = 'Debes seleccionar al menos una categoría';
  }
  if (!formData.fechaIngreso) {
    errors.fechaIngreso = 'La fecha de ingreso es requerida';
  }
  /*if (formData.garantiaFabrica || isNaN(Number(formData.garantiaFabrica))) {
    errors.garantiaFabrica = 'La garantía de fábrica es requerida y debe ser un número';
  }
  */
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Seccion Basica Producto-Categoria


module.exports = {
  validateProductForm,
};