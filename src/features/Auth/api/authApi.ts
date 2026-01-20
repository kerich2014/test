import { apiClient } from '@shared/api/apiClient';
import { User } from '@entities/User';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Функция для получения текущего пользователя из localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Функция для имитации авторизации
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Проверяем демо учетные данные
  if (credentials.username === 'admin' && credentials.password === 'admin') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: 'Администратор',
          avatar: 'https://example.com/avatar.jpg',
          createdAt: new Date().toISOString(),
        };
        
        resolve({
          token: 'mock-jwt-token-admin-1234567890',
          user: mockUser,
        });
      }, 2000);
    });
  }
  
  throw new Error('Неверное имя пользователя или пароль');
};

// Проверка токена
export const verifyToken = async (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(token.startsWith('mock-jwt-token-'));
    }, 500);
  });
};

// Выход
export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};