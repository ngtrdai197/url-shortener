import React from 'react';
import { mapModifiers } from '../../libs/components';

export const ICON_SHAPES = [
  'check',
  'eye-black',
  'eye-splash-black',
  'eye-white',
  'moon',
  'notification',
  'sun',
] as const;

export type IconShape = (typeof ICON_SHAPES)[number];

export interface IconProps {
  name: IconShape;
}

export const Icon: React.FC<IconProps> = ({ name }) => <i className={mapModifiers('c-icon', name)} />;
