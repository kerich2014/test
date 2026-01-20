import React from 'react';
import { Typography, List, Card } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const StyledAboutPage = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const data = [
  'React 16.14.0',
  'TypeScript',
  'Webpack + Babel',
  'Ant Design 5',
  'React Router 6',
  'TanStack Query 4',
  'Styled Components',
  'Feature-Sliced Design',
  'ESLint + Prettier',
];

export const AboutPage: React.FC = () => {
  return (
    <StyledAboutPage>
      <Title level={1}>О проекте</Title>
      
      <Card variant="outlined" style={{ marginTop: 24 }}>
        <Title level={2}>Используемые технологии</Title>
        <List
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          style={{ marginTop: 16 }}
        />
      </Card>
      
      <Card variant="outlined" style={{ marginTop: 24 }}>
        <Title level={2}>FSD слои</Title>
        <Paragraph>
          <strong>app</strong> - инициализация приложения, провайдеры<br />
          <strong>pages</strong> - страницы приложения<br />
          <strong>widgets</strong> - сложные составные компоненты<br />
          <strong>features</strong> - пользовательские сценарии<br />
          <strong>entities</strong> - бизнес-сущности<br />
          <strong>shared</strong> - переиспользуемый код
        </Paragraph>
      </Card>
    </StyledAboutPage>
  );
};