import { apiClient } from '@shared/api/apiClient';
import { User, CreateUserDto, UpdateUserDto } from '@entities/User';

export const usersApi = {
  // Получить всех пользователей
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/users');
      console.log('Users API Response:', response);
      return response || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  // Получить пользователя по ID
  getUserById: (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`);
  },
  
  // Создать пользователя
  createUser: (userData: CreateUserDto): Promise<User> => {
    const data = {
      ...userData,
      createdAt: new Date().toISOString(),
      avatar: userData.avatar || 'https://via.placeholder.com/150',
      name: userData.name || 'Новый пользователь',
    };
    return apiClient.post<User>('/users', data);
  },
  
  // Обновить пользователя
  updateUser: (id: string, userData: UpdateUserDto): Promise<User> => {
    return apiClient.put<User>(`/users/${id}`, userData);
  },
  
  // Удалить пользователя
  deleteUser: (id: string): Promise<void> => {
    return apiClient.delete(`/users/${id}`);
  },
};