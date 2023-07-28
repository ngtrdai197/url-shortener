import React from 'react';
import { DataAttributeObj, toDataAttrs } from '../../../brand/utils/utils';

export interface ButtonProps {
  children: React.ReactNode;
  dataAttr?: DataAttributeObj;
}

export const Button: React.FC<ButtonProps> = ({ children, dataAttr }) => (
  <div className="c-button" {...toDataAttrs(dataAttr)}>
    {children}
  </div>
);
