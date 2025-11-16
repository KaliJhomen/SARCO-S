import client from './api/client';
import endpoints from './api/endpoints';
import { colorService } from './color.service';

export const productService = {
  async getAll(token) {
    const response = await client.get(endpoints.products.all, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data || response;
  },

  async getById(id, token) {
    return client.get(endpoints.products.byId(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async search(query, token) {
    return client.get(endpoints.products.search(query), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getByBrand(idMarca, token) {
    return client.get(endpoints.products.byBrand(idMarca), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  async getByBrands(marcas, token) {
    return client.get(endpoints.products.byBrands(marcas), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  async getByCategory(idCategoria, token) {
    return client.get(endpoints.products.byCategory(idCategoria), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  
  async getBySubCategory(idSubCategoria, token) {
    return client.get(endpoints.products.bySubCategory(idSubCategoria), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  async getByProductType(idTipoProducto, token) {
    return client.get(endpoints.products.byProductType(idTipoProducto), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  async getByStore(tienda_id, token) {
    return client.get(endpoints.products.byStore(tienda_id), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  async getByStores(tiendas, token) {
    return client.get(endpoints.products.byStores(tiendas), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async create(formData, token) {
    const payload = {
      nombre: formData.nombre?.trim() || "",
      modelo: formData.modelo?.trim() || "",
      descripcion: formData.descripcion?.trim() || "",
      stock: parseInt(formData.stock) || 0,
      imagen: formData.imagen?.trim() || "",
      precioTope: parseFloat(formData.precioTope),
      precioVenta: parseFloat(formData.precioVenta),   
      descuento: parseFloat(formData.descuento) || 0,
      fechaIngreso: formData.fechaIngreso || "",      

      idMarca: parseInt(formData.idMarca),
      /*
      idCategoria: parseInt(formData.idCategoria),
      idTienda: parseInt(formData.idTienda),
      */
      garantiaFabrica: formData.garantiaFabrica?.trim() || null,
/*
      productoColor: formData.colores.map(color => ({
        idColor: color.idColor, 
        stock: color.stock,
        imagen: color.imagenes?.[0] || "",
        nombre: color.nombre?.trim() || "",
        codigoHex: color.codigoHex || "#000000",
      }))
      */
      /*
      estado: formData.estado !== undefined ? formData.estado : 1,
      mesesCredito: parseInt(formData.mesesCredito) || 0,
      */
    };

    const response = await client.post(endpoints.products.base, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async update(id, data, token) {
    const payload = {
      nombre: data.nombre?.trim(),
      modelo: data.modelo?.trim(),
      descripcion: data.descripcion?.trim(),
      stock: data.stock ? parseInt(data.stock) : undefined,
      imagen: data.imagen?.trim(),
      precioTope: data.precioTope ? parseFloat(data.precioTope) : undefined,
      precioVenta: data.precioVenta ? parseFloat(data.precioVenta) : undefined,
      descuento: data.descuento !== undefined ? parseFloat(data.descuento) : undefined,
      fechaIngreso: data.fechaIngreso,
  
      idMarca: data.idMarca ? parseInt(data.idMarca) : undefined,
      idCategoria: data.idCategoria ? parseInt(data.idCategoria) : undefined,
      idTienda: data.idTienda ? parseInt(data.idTienda) : undefined,

      garantiaFabrica: data.garantiaFabrica?.trim() || null,
      productoColor: data.colores ? data.colores.map(color => ({
        idColor: color.idColor,
        nombre: color.nombre?.trim() || "",
        codigoHex: color.codigoHex || "#000000",
      })) : undefined,
/*
      estadio: data.estado !== undefined ? data.estado : undefined,
      mesesCredito: data.mesesCredito ? parseInt(data.mesesCredito) : undefined,
*/
      };

    return client.put(endpoints.products.byId(id), payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async delete(id, token) {
    return client.delete(endpoints.products.byId(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};