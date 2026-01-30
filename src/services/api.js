import axios from 'axios';
import { API_BASE_URL } from '@/utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    
    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      error.userMessage = 'La solicitud tardó demasiado tiempo';
    } else if (error.response?.status === 429) {
      error.userMessage = 'Demasiadas solicitudes. Intenta de nuevo en un momento';
    } else if (error.response?.status >= 500) {
      error.userMessage = 'Error del servidor. Intenta de nuevo más tarde';
    } else if (!error.response) {
      error.userMessage = 'Error de conexión. Verifica tu internet';
    } else {
      error.userMessage = error.response?.data?.message || 'Error desconocido';
    }
    
    return Promise.reject(error);
  }
);

export default api;