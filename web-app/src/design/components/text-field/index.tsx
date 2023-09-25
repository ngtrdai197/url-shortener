import React from 'react';

import { ErrorMessage } from '../error-message';

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
