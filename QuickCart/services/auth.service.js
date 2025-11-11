import client from './api/client';
import endpoints from './api/endpoints';

export const authService = {
  async login(email, password) {
    return client.post(endpoints.auth.login, { email, password });
  },

  async register(userData) {
    return client.post(endpoints.auth.register, userData);
  },

  async logout() {
    return client.post(endpoints.auth.logout);
  },

  async getMe() {
    return client.get(endpoints.auth.me);
  },

  async refreshToken() {
    return client.post(endpoints.auth.refresh);
  },

  async forgotPassword(email) {
    return client.post(endpoints.auth.forgotPassword, { email });
  },

  async resetPassword(token, newPassword) {
    return client.post(endpoints.auth.resetPassword, { token, newPassword });
  },

  async verifyEmail(token) {
    return client.post(endpoints.auth.verifyEmail, { token });
  },
};