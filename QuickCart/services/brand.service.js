import client from './api/client';
import endpoints from './api/endpoints';

export const brandService = {
  async getAll() {
    const response = await client.get(endpoints.brands.all);
    return response.data || response;
  },

  async getById(id) {
    return client.get(endpoints.brands.byId(id));
  },

  async create(brandData, token) {
    return client.post(endpoints.brands.base, brandData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async update(id, brandData, token) {
    return client.put(endpoints.brands.byId(id), brandData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async delete(id, token) {
    return client.delete(endpoints.brands.byId(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};