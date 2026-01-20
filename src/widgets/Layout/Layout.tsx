import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Menu, Button, Avatar } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  UserOutlined,
  TeamOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import { getCurrentUser } from '@features/Auth/api/authApi';

const { Header, Content, Footer } = AntLayout;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0;
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #1890ff;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  margin: 0;
  min-height: 280px;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

const LogoutButton = styled(Button)`
  margin-left: 16px;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const menuItems = [
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: <Link to="/users">Пользователи</Link>,
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">О проекте</Link>,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (isMounted) {
      navigate('/login');
    }
  };

  const token = localStorage.getItem('token');

  return (
    <StyledLayout>
      <StyledHeader>
        <Logo>TestApp</Logo>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1 }}
        />
        {token && currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
            <Avatar 
              src={currentUser.avatar} 
              icon={!currentUser.avatar && <UserOutlined />}
              size="small"
              style={{ marginRight: 8 }}
            />
            <span style={{ marginRight: 16 }}>{currentUser.name}</span>
            <LogoutButton
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Выйти
            </LogoutButton>
          </div>
        )}
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
};