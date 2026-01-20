import axios from 'axios';
import { API_URL, IS_DEBUG } from '@shared/lib/constants';


const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Включаем логирование всех запросов в development
axiosInstance.interceptors.request.use(
  (config) => {
    if (IS_DEBUG) {
      console.log(`➡️ [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`, config.params || '');
      console.log('Headers:', config.headers);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Включаем логирование всех ответов
axiosInstance.interceptors.response.use(
  (response) => {
    if (IS_DEBUG) {
      console.log(`⬅️ [${response.status}] ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// Интерцептор для добавления токена
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Обертка с правильной типизацией
export const apiClient = {
  get: <T = any>(url: string, config?: any): Promise<T> => 
    axiosInstance.get(url, config).then(res => res.data),
  
  post: <T = any>(url: string, data?: any, config?: any): Promise<T> => 
    axiosInstance.post(url, data, config).then(res => res.data),
  
  put: <T = any>(url: string, data?: any, config?: any): Promise<T> => 
    axiosInstance.put(url, data, config).then(res => res.data),
  
  delete: <T = any>(url: string, config?: any): Promise<T> => 
    axiosInstance.delete(url, config).then(res => res.data),
  
  _axios: axiosInstance,
};