import React from 'react';
import { mapModifiers } from '../../libs/components';

export const ICON_SHAPES = [
  'check',
  'clear-black',
  'clear-white',
  'eye-black',
  'eye-splash-black',
  'eye-white',
  'moon',
  'notification',
  'search-black',
  'search-white',
  'sun',
] as const;

export type IconShape = (typeof ICON_SHAPES)[number];

export interface IconProps {
  name: IconShape;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => (
  <i className={`${mapModifiers('c-icon', name)}${className ? ` ${className}` : ''}`} />
);
