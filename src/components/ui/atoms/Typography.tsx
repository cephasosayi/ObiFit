import React from 'react';
import { Text, TextProps } from 'react-native';

export interface ITypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant = 'body',
  className = '',
  children,
  ...rest
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'h1':
        return 'text-heading-xl font-bold text-text-primary tracking-tight';
      case 'h2':
        return 'text-heading-lg font-semibold text-text-primary';
      case 'h3':
        return 'text-heading-md font-medium text-text-primary';
      case 'caption':
        return 'text-caption-sm text-text-secondary';
      default:
        return 'text-body-md text-text-primary';
    }
  };

  return (
    <Text
      accessibilityRole={variant.startsWith('h') ? 'header' : 'text'}
      {...rest}
    >
      {children}
    </Text>
  );
};
