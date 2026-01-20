import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Space, 
  message, 
  Alert,
  Spin,
  Divider
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useUpdateUser, useDeleteUser } from '@features/Users/hooks/useUsers';
import { usersApi } from '@features/Users/api/usersApi';

const { Title, Paragraph, Text } = Typography;

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

interface FormValues {
  name: string;
  avatar: string;
}

export const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await usersApi.getUserById(id!);
      setUser(userData);
      form.setFieldsValue({
        name: userData.name,
        avatar: userData.avatar || '',
      });
    } catch (error) {
      setError('Не удалось загрузить данные пользователя');
      message.error('Ошибка при загрузке пользователя');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: FormValues) => {
    if (!id) return;
    
    try {
      await updateMutation.mutateAsync({
        id,
        data: {
          name: values.name,
          avatar: values.avatar || undefined,
        },
      });
      message.success('Пользователь обновлен');
      navigate('/users');
    } catch (error) {
      message.error('Ошибка при обновлении пользователя');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await deleteMutation.mutateAsync(id);
      message.success('Пользователь удален');
      navigate('/users');
    } catch (error) {
      message.error('Ошибка при удалении пользователя');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Alert
          message={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate('/users')}>
              Назад
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/users')}
        style={{ marginBottom: 24 }}
      >
        Назад к пользователям
      </Button>

      <StyledCard>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
          Редактирование пользователя
        </Title>

        {user && (
          <>
            <Paragraph>
              <Text strong>ID:</Text> {user.id}
            </Paragraph>
            <Divider />
          </>
        )}

        <Form
          form={form}
          name="editUser"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Имя"
            name="name"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя пользователя!' },
              { min: 2, message: 'Имя должно быть не менее 2 символов' },
              { max: 50, message: 'Имя не должно превышать 50 символов' },
            ]}
          >
            <Input 
              placeholder="Введите имя пользователя" 
              size="large"
              disabled={updateMutation.isPending}
            />
          </Form.Item>

          <Form.Item
            label="Ссылка на аватарку"
            name="avatar"
            rules={[
              { type: 'url', message: 'Пожалуйста, введите корректную ссылку!' },
            ]}
          >
            <Input 
              placeholder="https://example.com/avatar.jpg" 
              size="large"
              disabled={updateMutation.isPending}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button
                danger
                onClick={handleDelete}
                loading={deleteMutation.isPending}
                disabled={updateMutation.isPending}
                size="large"
              >
                Удалить
              </Button>
              
              <Space>
                <Button
                  onClick={() => navigate('/users')}
                  disabled={updateMutation.isPending}
                  size="large"
                >
                  Отмена
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateMutation.isPending}
                  disabled={updateMutation.isPending}
                  size="large"
                >
                  Сохранить
                </Button>
              </Space>
            </Space>
          </Form.Item>
        </Form>
      </StyledCard>
    </PageContainer>
  );
};