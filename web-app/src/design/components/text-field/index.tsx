import React from 'react';

import { ErrorMessage } from '../error-message';
import { FieldComponentProps } from '../../../brand/models/common/component';

interface TextFieldProps extends Omit<React.InsHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label: string;
  errorMessage?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const TextField: React.FC<TextFieldProps> = ({ errorMessage, ...restProps }) => (
  <div>
    <input className="c-text-field" type="text" {...restProps} />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </div>
);

interface Component extends React.FC<TextFieldProps> {
  RHF: FieldComponentProps<TextFieldProps>;
}
