import React from 'react';

export interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <p className="text-sm text-red-500 mt-1">{children}</p>
);
