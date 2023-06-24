import React from 'react';
import { mapModifiers } from '../../libs/componens';

interface LoadingProps {
  open?: boolean;
}

export const LoadingSpinner: React.FC<LoadingProps> = ({ open }) => (
  <div className={mapModifiers('loading-spiner', open && 'opened')} />
);
