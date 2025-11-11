import client from './api/client';
import endpoints from './api/endpoints';

export const cartService = {
  async get() {
    return client.get(endpoints.cart.get);
  },

  async add(productId, quantity = 1, colorId = null) {
    return client.post(endpoints.cart.add, {
      productId,
      quantity,
      colorId,
    });
  },

  async update(itemId, quantity) {
    return client.put(endpoints.cart.update(itemId), { quantity });
  },

  async remove(itemId) {
    return client.delete(endpoints.cart.remove(itemId));
  },

  async clear() {
    return client.post(endpoints.cart.clear);
  },

  async getCount() {
    return client.get(endpoints.cart.count);
  },
};