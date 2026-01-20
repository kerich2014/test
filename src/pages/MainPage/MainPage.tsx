import React from 'react';
import styled from 'styled-components';
import { Typography, Card, Button, Row, Col, Alert, Space } from 'antd';
import { Button as SharedButton } from '@shared/ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@features/Auth/hooks/useAuth';

const { Title, Paragraph, Text } = Typography;

const StyledMainPage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const MainPage: React.FC = () => {
  const { data: isAuthenticated, isLoading } = useAuth();
  const token = localStorage.getItem('token');

  return (
    <StyledMainPage>
      <Title level={1}>Добро пожаловать в FSD приложение</Title>
      <Paragraph>
        Это демонстрационное приложение с архитектурой Feature-Sliced Design.
      </Paragraph>

      {/* Статус авторизации */}
      <Card variant="outlined" style={{ marginBottom: 24 }}>
        <Title level={3}>Статус авторизации</Title>
        {isLoading ? (
          <Paragraph>Проверка авторизации...</Paragraph>
        ) : isAuthenticated ? (
          <Alert
            message="Вы авторизованы"
            description={
              <div>
                <Paragraph>
                  Токен: <Text code>{token?.substring(0, 20)}...</Text>
                </Paragraph>
                <Space>
                  <Button type="primary">
                    <Link to="/users">Перейти к пользователям</Link>
                  </Button>
                  <Button onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                  }}>
                    Выйти
                  </Button>
                </Space>
              </div>
            }
            type="success"
            showIcon
          />
        ) : (
          <Alert
            message="Вы не авторизованы"
            description={
              <div>
                <Paragraph>Для доступа к защищенным страницам необходимо войти в систему</Paragraph>
                <Button type="primary">
                  <Link to="/login">Войти в систему</Link>
                </Button>
              </div>
            }
            type="info"
            showIcon
          />
        )}
      </Card>

      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="outlined" title="Авторизация">
            <Paragraph>React Router 6 + TanStack Query</Paragraph>
            <Paragraph>Логин: admin</Paragraph>
            <Paragraph>Пароль: admin</Paragraph>
            <Button type="primary" style={{ marginTop: 16 }}>
              <Link to="/login">Страница входа</Link>
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="outlined" title="Защищенные маршруты">
            <p>Доступ только для авторизованных пользователей</p>
            <Button style={{ marginTop: 16 }}>
              <Link to="/users">Страница пользователей</Link>
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="outlined" title="Промис с таймаутом">
            <p>Имитация запроса на 2000мс</p>
            <Button type="primary" danger style={{ marginTop: 16 }}>
              <Link to="/login">Протестировать</Link>
            </Button>
          </Card>
        </Col>
      </Row>
    </StyledMainPage>
  );
};