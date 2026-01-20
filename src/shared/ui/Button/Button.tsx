import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import styled from 'styled-components';

export interface ButtonProps extends AntButtonProps {
}

const StyledButton = styled(AntButton)`
  /* Можно добавить кастомные стили если нужно */
  
  &.ant-btn-secondary {
    background-color: #f0f0f0;
    color: #333;
    border-color: #d9d9d9;
    
    &:hover:not(:disabled) {
      background-color: #e6e6e6;
      border-color: #adadad;
      color: #333;
    }
    
    &:focus:not(:disabled) {
      color: #333;
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  }
  
  &.ant-btn-danger.ant-btn-primary {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
    
    &:hover:not(:disabled) {
      background-color: #ff7875;
      border-color: #ff7875;
    }
    
    &:focus:not(:disabled) {
      background-color: #ff7875;
      border-color: #ff7875;
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  // Генерируем классы на основе props
  let buttonClassName = className || '';
  
  if (props.type === 'default' || !props.type) {
    buttonClassName += ' ant-btn-secondary';
  }
  
  return (
    <StyledButton 
      className={buttonClassName}
      {...props}
    >
      {children}
    </StyledButton>
  );
};