import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { MainPage } from '@pages/MainPage';
import { AboutPage } from '@pages/AboutPage';
import { LoginPage } from '@pages/LoginPage';
import { UsersPage } from '@pages/UsersPage';
import { CreateUserPage } from '@pages/CreateUserPage';
import { EditUserPage } from '@pages/EditUserPage';
import { Layout } from '@widgets/Layout';
import { ProtectedRoute } from './providers/ProtectedRoute';

import 'antd/dist/reset.css';

dayjs.locale('ru');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={ruRU}
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 6,
            },
          }}
        >
          <Routes>

            <Route path="/login" element={<LoginPage />} />
            

            <Route path="/*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/create" element={<CreateUserPage />} />
                    <Route path="users/:id/edit" element={<EditUserPage />} />
                    <Route path="*" element={<Navigate to="/users" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
            
\
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  );
};