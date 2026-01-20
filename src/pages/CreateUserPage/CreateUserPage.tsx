import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useCreateUser } from '@features/Users/hooks/useUsers';

const { Title } = Typography;

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

export const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const createMutation = useCreateUser();

  const onFinish = async (values: FormValues) => {
    try {
      await createMutation.mutateAsync({
        name: values.name,
        avatar: values.avatar || undefined,
      });
      message.success('Пользователь создан');
      navigate('/users');
    } catch (error) {
      message.error('Ошибка при создании пользователя');
    }
  };

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
          Создание пользователя
        </Title>

        <Form
          form={form}
          name="createUser"
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
              disabled={createMutation.isPending}
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
              disabled={createMutation.isPending}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => navigate('/users')}
                disabled={createMutation.isPending}
                size="large"
              >
                Отмена
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={createMutation.isPending}
                disabled={createMutation.isPending}
                size="large"
              >
                Создать
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </StyledCard>
    </PageContainer>
  );
};