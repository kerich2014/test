import { apiClient } from '@shared/api/apiClient';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../model/types';

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),
    
  register: (credentials: RegisterCredentials) =>
    apiClient.post<AuthResponse>('/auth/register', credentials),
    
  logout: () => apiClient.post('/auth/logout'),
    
  getProfile: () => apiClient.get('/auth/profile'),
};