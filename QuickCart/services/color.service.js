import client from './api/client';
import endpoints from './api/endpoints';

export const colorService = {
  async getAll() {
    const response = await client.get(endpoints.colors.all);
    return response.data || response;
  },
  async getById(id) {
    return client.get(endpoints.colors.byId(id));
  }
};
