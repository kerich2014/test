import { useQuery } from '@tanstack/react-query';
import { verifyToken } from '../api/authApi';

export const useAuth = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['auth', token],
    queryFn: () => {
      if (!token) {
        return Promise.resolve(false);
      }
      return verifyToken(token);
    },
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });
};