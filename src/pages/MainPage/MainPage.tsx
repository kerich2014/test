import React from 'react';
import styled from 'styled-components';
import { Typography, Card, Row, Col } from 'antd';
import { Button as SharedButton } from '@shared/ui/Button';

const { Title, Paragraph } = Typography;

const StyledMainPage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const MainPage: React.FC = () => {
  return (
    <StyledMainPage>
      <Title level={1}>Добро пожаловать в FSD приложение</Title>
      <Paragraph>
        Это демонстрационное приложение с архитектурой Feature-Sliced Design.
      </Paragraph>

      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card title="React 16" bordered={false}>
            <p>React 16.14.0 с TypeScript</p>
            <SharedButton type="primary" style={{ marginTop: 16 }}>
              Primary Button
            </SharedButton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="Ant Design 5" bordered={false}>
            <p>UI библиотека Ant Design версии 5</p>
            <SharedButton customVariant="secondary" style={{ marginTop: 16 }}>
              Secondary Button
            </SharedButton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="TanStack Query 4" bordered={false}>
            <p>Управление состоянием серверных данных</p>
            <SharedButton 
              type="primary" 
              customVariant="danger" 
              style={{ marginTop: 16 }}
            >
              Danger Button
            </SharedButton>
          </Card>
        </Col>
      </Row>
    </StyledMainPage>
  );
};