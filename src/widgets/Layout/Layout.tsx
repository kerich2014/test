import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

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

const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">Главная</Link>,
  },
  {
    key: '/about',
    icon: <InfoCircleOutlined />,
    label: <Link to="/about">О проекте</Link>,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <StyledLayout>
      <StyledHeader>
        <Logo>FSD</Logo>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1 }}
        />
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
      <StyledFooter>FSD Architecture ©2023</StyledFooter>
    </StyledLayout>
  );
};