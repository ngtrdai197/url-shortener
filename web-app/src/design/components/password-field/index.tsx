import React, { useState } from 'react';

import { Control, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { Icon } from '../icon';
import { ErrorMessage } from '../error-message';

interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'autoComplete'> {
  label: string;
  errorMessage?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const PasswordField: React.FC<PasswordFieldProps> = React.forwardRef(
  ({ label, errorMessage, ...restProps }, ref) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    return (
      <div className="c-password-field mb-2">
        <label htmlFor={restProps.name} className="block text-sm font-semibold dark:text-white">
          {label}
        </label>
        <div className="c-password-field__input-container">
          <input
            {...restProps}
            id={restProps.name}
            ref={ref}
            className="c-password-field__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white text-black border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            type={isVisiblePassword ? 'text' : 'password'}
            autoComplete="off"
          />
          <span
            className="c-password-field__hidden-icon"
            onClick={() => {
              setIsVisiblePassword(!isVisiblePassword);
            }}
          >
            <Icon name={isVisiblePassword ? 'eye-splash-black' : 'eye-black'} />
          </span>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';

type PasswordFieldRHFProps<T extends FieldValues> = PasswordFieldProps &
  UseControllerProps<T> & {
    control: Control<T>;
    name: string;
  };

export const PasswordFieldRHF = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: PasswordFieldRHFProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control });
  const { name: fieldName, value: fieldValue, ...restFieldProps } = field;

  return (
    <PasswordField
      {...restProps}
      {...restFieldProps}
      errorMessage={error?.message}
      name={fieldName}
      value={fieldValue}
    />
  );
};
