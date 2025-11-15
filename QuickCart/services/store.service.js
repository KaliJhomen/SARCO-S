import client from './api/client';
import endpoints from './api/endpoints';

export const storeService = {
  async getAll() {
    const response = await client.get(endpoints.stores.all);
    return response.data || response;
  },
    async getById(id) {
    const response = await client.get(endpoints.stores.byId(id));
    return response.data || response;
  },
};