import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Card, 
  List, 
  Avatar, 
  Space, 
  Modal, 
  message as antdMessage,
  Divider,
  Spin,
  Alert,
  Empty
} from 'antd';
import { 
  LogoutOutlined, 
  UserOutlined, 
  EditOutlined, 
  DeleteOutlined,
  PlusOutlined,
  CalendarOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { logoutUser, getCurrentUser } from '@features/Auth/api/authApi';
import { useUsers, useDeleteUser } from '@features/Users/hooks/useUsers';
import { User } from '@entities/User';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const { Title, Paragraph, Text } = Typography;

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const StyledList = styled(List)`
  .ant-list-item {
    padding: 16px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    margin-bottom: 16px;
    transition: all 0.3s;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-color: #d9d9d9;
    }
  }
`;

const UserInfo = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const UserMeta = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    margin-top: 16px;
    
    button {
      width: 100%;
    }
  }
`;

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  const { 
    data: users = [], 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useUsers();
  const deleteMutation = useDeleteUser();

  // Проверяем авторизацию
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login', { replace: true });
  };

  const handleEdit = (user: User) => {
    navigate(`/users/${user.id}/edit`);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await deleteMutation.mutateAsync(userToDelete.id);
        antdMessage.success('Пользователь удален');
        setDeleteModalVisible(false);
        setUserToDelete(null);
      } catch (error) {
        antdMessage.error('Ошибка при удалении пользователя');
      }
    }
  };

  const handleCreate = () => {
    navigate('/users/create');
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </PageContainer>
    );
  }

  if (isError) {
 
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    
    return (
      <PageContainer>
        <Card>
          <Alert
            message="Ошибка при загрузке пользователей"
            description={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
          <Space>
            <Button 
              type="primary" 
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
            >
              Попробовать снова
            </Button>
            <Button onClick={() => navigate('/')}>
              На главную
            </Button>
          </Space>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <div>
          <Title level={2}>Пользователи</Title>
          {currentUser && (
            <Paragraph type="secondary">
              Вы вошли как: {currentUser.name}
            </Paragraph>
          )}
        </div>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
          >
            Создать пользователя
          </Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            size="large"
          >
            Выход
          </Button>
        </Space>
      </Header>

      <Divider />

      {users.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Пользователи не найдены"
        >
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Создать первого пользователя
          </Button>
        </Empty>
      ) : (
        <>
          <Paragraph type="secondary" style={{ marginBottom: 24 }}>
            Найдено пользователей: {users.length}
          </Paragraph>
          

          <StyledList
            dataSource={users}
            renderItem={(user) => {

              const userData = user as User;
              return (
                <List.Item>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%',
                    flexWrap: 'wrap' 
                  }}>
                    <Avatar 
                      size={64}
                      src={userData.avatar} 
                      icon={!userData.avatar && <UserOutlined />}
                    />
                    
                    <UserInfo>
                      <UserName>{userData.name}</UserName>
                      <UserMeta>
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        Зарегистрирован {formatDate(userData.createdAt)}
                      </UserMeta>
                    </UserInfo>
                    
                    <Actions>
                      <Button 
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(userData)}
                      >
                        Редактировать
                      </Button>
                      <Button 
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteClick(userData)}
                        loading={deleteMutation.isPending && userToDelete?.id === userData.id}
                      >
                        Удалить
                      </Button>
                    </Actions>
                  </div>
                </List.Item>
              );
            }}
          />
        </>
      )}


      <Modal
        title="Подтверждение удаления"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setUserToDelete(null);
        }}
        confirmLoading={deleteMutation.isPending}
        okText="Удалить"
        cancelText="Отмена"
      >
        {userToDelete && (
          <Paragraph>
            Вы уверены, что хотите удалить пользователя <Text strong>{userToDelete.name}</Text>?
            Это действие нельзя отменить.
          </Paragraph>
        )}
      </Modal>
    </PageContainer>
  );
};