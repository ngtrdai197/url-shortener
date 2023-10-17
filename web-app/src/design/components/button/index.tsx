import React, { ButtonHTMLAttributes } from 'react';
import { DataAttributeObj, toDataAttrs } from '../../../brand/utils/utils';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: React.ReactNode;
  dataAttr?: DataAttributeObj;
}

export const Button: React.FC<ButtonProps> = ({ children, dataAttr, ...restProps }) => (
  <button {...restProps} className="c-button" {...toDataAttrs(dataAttr)}>
    {children}
  </button>
);
