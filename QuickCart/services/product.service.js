import client from './api/client';
import endpoints from './api/endpoints';

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
      nombre: formData.nombre.trim(),
      modelo: formData.modelo.trim(),
      idMarca: parseInt(formData.idMarca),
      descripcion: formData.descripcion.trim(),
      stock: parseInt(formData.stock) || 0,
      imagen: formData.imagen.trim(),
      precioTope: parseFloat(formData.precioTope),
      precioVenta: parseFloat(formData.precioVenta),
      estado: formData.estado !== undefined ? formData.estado : 1,
      fechaIngreso: new Date().toISOString(), // Asignación de fecha y hora actual
      descuento: parseFloat(formData.descuento) || 0,
      garantia: formData.garantia?.trim() || null,
      mesesCredito: parseInt(formData.mesesCredito) || 0,
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
      precio: data.precio ? parseFloat(data.precio) : undefined,
      descuento: data.descuento !== undefined ? parseFloat(data.descuento) : undefined,
      stock: data.stock ? parseInt(data.stock) : undefined,
      imagen: data.imagen?.trim(),
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

export async function getProductById(id) {
  const res = await fetch(`http://localhost:4000/api/producto/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}

export async function getAllProducts() {
  const res = await fetch(`http://localhost:4000/api/producto`);
  if (!res.ok) throw new Error("No se pudieron cargar los productos");
  return res.json();
}