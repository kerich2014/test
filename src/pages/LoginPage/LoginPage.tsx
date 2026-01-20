import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button, Card, Typography, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { loginUser, LoginCredentials } from '@features/Auth/api/authApi';

const { Title } = Typography;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Типы для формы
interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [error, setError] = useState<string>('');

  // Проверяем, авторизован ли уже пользователь
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/users" replace />;
  }

  // Мутация для логина
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/users');
    },
    onError: (error: any) => {
      setError(error.message || 'Ошибка авторизации');
    },
  });

  const onFinish = (values: LoginFormValues) => {
    setError('');
    loginMutation.mutate({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <LoginContainer>
      <StyledCard variant="outlined">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Авторизация</Title>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
            closable
            onClose={() => setError('')}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя пользователя!' },
              { min: 3, message: 'Имя пользователя должно быть не менее 3 символов' },
            ]}
          >
            <Input
              placeholder="Логин"
              size="large"
              disabled={loginMutation.isPending}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 3, message: 'Пароль должен быть не менее 3 символов' },
            ]}
          >
            <Input.Password
              placeholder="Пароль"
              size="large"
              disabled={loginMutation.isPending}
            />
          </Form.Item>

          <Form.Item style={{display: 'flex', justifyContent: 'end'}}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: '100%' }}
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </LoginContainer>
  );
};