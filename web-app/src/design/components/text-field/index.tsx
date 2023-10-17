import React from 'react';

import { Control, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ErrorMessage } from '../error-message';

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'autoComplete'> {
  label: string;
  errorMessage?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const TextField: React.FC<TextFieldProps> = React.forwardRef(({ label, errorMessage, ...restProps }, ref) => (
  <div className="mb-2">
    <label htmlFor={restProps.name} className="block text-sm font-semibold dark:text-white">
      {label}
    </label>

    <input
      {...restProps}
      id={restProps.name}
      ref={ref}
      className="c-text-field block w-full px-4 py-2 mt-2 text-purple-700 bg-white text-black border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      type="text"
      autoComplete="off"
    />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </div>
));

TextField.displayName = 'TextField';

type TextfieldRHFProps<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    control: Control<T>;
    name: string;
  };

export const TextFieldRHF = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: TextfieldRHFProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control });
  const { name: fieldName, value: fieldValue, ...restFieldProps } = field;

  return (
    <TextField {...restProps} {...restFieldProps} errorMessage={error?.message} name={fieldName} value={fieldValue} />
  );
};
