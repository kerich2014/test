import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import styled from 'styled-components';

export interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
  customVariant?: 'secondary' | 'danger';
}

const StyledButton = styled(AntButton)<ButtonProps>`
  ${({ customVariant, type }) =>
    customVariant === 'secondary' &&
    `
    && {
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
  `}
  
  ${({ customVariant, type }) =>
    customVariant === 'danger' &&
    type === 'primary' &&
    `
    && {
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
  `}
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  customVariant,
  ...props 
}) => {
  return (
    <StyledButton 
      customVariant={customVariant}
      {...props}
    >
      {children}
    </StyledButton>
  );
};