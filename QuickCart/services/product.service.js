import client from './api/client';
import endpoints from './api/endpoints';

export const productService = {
  async getAll() {
    const response = await client.get(endpoints.products.all);
    return response.data || response;
  },

  async getById(id) {
    return client.get(endpoints.products.byId(id));
  },

  async search(query) {
    return client.get(endpoints.products.search(query));
  },

  async getByBrand(idMarca) {
    return client.get(endpoints.products.byBrand(idMarca));
  },
  async getByBrands(marcas) {
    return client.get(endpoints.products.byBrand(marcas));
  },
  async getByCategory(idCategoria) {
    return client.get(endpoints.products.byCategory(idCategoria));
  },
  
  async getBySubCategory(idSubCategoria) {
    return client.get(endpoints.products.bySubCategory(idSubCategoria));
  },
  async getProductType(idTipoProducto) {
    return client.get(endpoints.products.byProductType(idTipoProducto));
  },
  async getByStore(tienda_id) {
    return client.get(endpoints.products.byStore(tienda_id));
  },
  async getByStores(tiendas) {
    return client.get(endpoints.products.byStores(tiendas));
  },
  /*
  async getInStock() {
    return client.get(endpoints.products.inStock);
  },

  async getFeatured() {
    return client.get(endpoints.products.featured);
  },

  async getByPriceRange(min, max) {
    return client.get(endpoints.products.byPriceRange(min, max));
  },
  */
  // CREAR PRODUCTO
  async create(formData) {
    const payload = {
      nombre: formData.nombre.trim(),
      modelo: formData.modelo.trim(),
      descripcion: formData.descripcion.trim(),
      precio: parseFloat(formData.precio),
      descuento: parseFloat(formData.descuento) || 0,
      stock: parseInt(formData.stock) || 0,
      imagen: formData.imagen.trim(),
      // IDs de relaciones
      idMarca: parseInt(formData.idMarca),
      
      // Información adicional
      garantia: formData.garantia?.trim() || null,
      mesesCredito: parseInt(formData.mesesCredito) || 0,
      
      // Colores con imágenes (solo válidos)
      colores: formData.colores
        .filter(c => c.nombreColor?.trim() && c.imagenes?.length > 0)
        .map(c => ({
          nombreColor: c.nombreColor.trim(),
          codigoHex: c.codigoHex || '#000000',
          stock: parseInt(c.stock) || 0,
          imagenes: c.imagenes // URLs ya subidas a Cloudinary
        }))
    };

    const response = await client.post(endpoints.products.base, payload);
    return response.data || response;
  },

  async update(id, data) {
    // Similar transformación que create
    const payload = {
      nombre: data.nombre?.trim(),
      modelo: data.modelo?.trim(),
      descripcion: data.descripcion?.trim(),
      precio: data.precio ? parseFloat(data.precio) : undefined,
      descuento: data.descuento !== undefined ? parseFloat(data.descuento) : undefined,
      stock: data.stock ? parseInt(data.stock) : undefined,
      imagen: data.imagen?.trim(),
      // IDs de relaciones
      idMarca: data.idMarca ? parseInt(data.idMarca) : undefined,
      idCategoria: data.idCategoria ? parseInt(data.idCategoria) : undefined,
      garantia: data.garantia?.trim() || null,
      mesesCredito: data.mesesCredito ? parseInt(data.mesesCredito) : undefined,
      
      colores: data.colores?.filter(c => c.nombreColor?.trim()).map(c => ({
        nombreColor: c.nombreColor.trim(),
        codigoHex: c.codigoHex || '#000000',
        stock: parseInt(c.stock) || 0,
        imagenes: c.imagenes
      }))
    };

    return client.put(endpoints.products.byId(id), payload);
  },

  async delete(id) {
    return client.delete(endpoints.products.byId(id));
  },
};