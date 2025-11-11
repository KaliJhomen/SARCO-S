import client from './client';

// Interceptor de REQUEST
client.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('📤 REQUEST:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error('❌ Error en request:', error);
    return Promise.reject(error);
  }
);

// Interceptor de RESPONSE
client.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 RESPONSE:', response.status, response.config.url);
      console.log('📦 Data recibida:', response.data);
    }

    // ✅ IMPORTANTE: Devolver response.data, NO solo response
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data, config } = error.response;

      console.error(`❌ Error ${status}:`, config.url, data);

      switch (status) {
        case 401:
          if (typeof window !== 'undefined') {
            console.warn('⚠️ Sesión expirada, redirigiendo a login...');
            localStorage.removeItem('auth-token');
            sessionStorage.removeItem('auth-token');
            
            if (!window.location.pathname.includes('/auth/login')) {
              window.location.href = '/auth/login';
            }
          }
          break;

        case 403:
          console.error('🚫 Acceso prohibido');
          break;

        case 404:
          console.error('🔍 Recurso no encontrado:', config.url);
          break;

        case 422:
          console.error('⚠️ Errores de validación:', data);
          break;

        case 500:
          console.error('💥 Error del servidor');
          break;

        default:
          console.error('❌ Error:', data?.message || 'Error desconocido');
      }

      return Promise.reject({
        status,
        message: data?.message || 'Error en la petición',
        errors: data?.errors || null,
        data: data,
      });
    } else if (error.request) {
      console.error('🌐 Error de red: No se pudo conectar al servidor');
      
      return Promise.reject({
        status: 0,
        message: 'Error de red. No se pudo conectar al servidor.',
        errors: null,
      });
    } else {
      console.error('⚙️ Error de configuración:', error.message);
      
      return Promise.reject({
        status: -1,
        message: error.message || 'Error desconocido',
        errors: null,
      });
    }
  }
);

export default client;