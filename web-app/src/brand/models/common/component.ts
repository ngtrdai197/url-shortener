import type { Control, FieldValues, ControllerProps } from 'react-hook-form';

export type FieldComponentProps<T extends FieldValues> = ControllerProps<T> & {
  control: Control<T>;
};
