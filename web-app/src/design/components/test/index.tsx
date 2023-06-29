import React from 'react';
import { mapModifiers } from '../../libs/components';

export interface TestProps {
  children: React.ReactNode;
  modifiers?: 'red' | 'blue' | 'green';
}

export const Test: React.FC<TestProps> = props => (
  <div className={mapModifiers('test', props.modifiers)}>{props.children}</div>
);
