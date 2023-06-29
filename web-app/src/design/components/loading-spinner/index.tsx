import React from 'react';
import { mapModifiers } from '../../libs/components';

interface LoadingProps {
  open?: boolean;
}

export const LoadingSpinner: React.FC<LoadingProps> = ({ open }) => (
  <div className={mapModifiers('loading-spinner', open && 'opened')} />
);
