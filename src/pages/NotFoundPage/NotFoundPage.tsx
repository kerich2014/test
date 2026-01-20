import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { HomeOutlined, FrownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ContentWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentWrapper>
        <Result
          status="404"
          icon={<FrownOutlined style={{ fontSize: 72, color: '#ff4d4f' }} />}
          title="404"
          subTitle="Извините, страница не найдена"
          extra={[
            <Button 
              type="primary" 
              key="home" 
              icon={<HomeOutlined />}
              onClick={() => navigate('/users')}
              size="large"
            >
              На главную
            </Button>,
            <Button 
              key="back" 
              onClick={() => navigate(-1)}
              size="large"
            >
              Назад
            </Button>,
          ]}
        />
      </ContentWrapper>
    </PageContainer>
  );
};