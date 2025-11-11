import client from './api/client';
import endpoints from './api/endpoints';
export const categoryService = {
  async getAll() {
    const response = await client.get(endpoints.categories.all);
    return response.data || response;
  },
  async getById(id) {
    return client.get(endpoints.categories.byId(id));
  }
}