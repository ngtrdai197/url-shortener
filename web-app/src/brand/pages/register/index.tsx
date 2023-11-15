import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { AuthForm } from '../../../design/templates/auth-form';
import { RegisterRequestDto } from '../../models/auth.dto';
import { useRegisterMutation } from '../../services/users.service';
import { TextFieldRHF } from '../../../design/components/text-field';
import AuthPage from '../../../design/templates/auth-page';

const schema = yup.object().shape({
  username: yup.string().required('User name is required').min(6, 'Username must be at least 6 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  fullName: yup.string().required('Full name is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
});

interface FormValues extends RegisterRequestDto {
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const [register] = useRegisterMutation();
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  // const { VITE_BASE_ENDPOINT } = environment;

  const onSubmit = (data: FormValues) => {
    const req = new RegisterRequestDto();
    req.fullName = data.fullName;
    req.password = data.password;
    req.username = data.username;

    // TODO: Need to be refactored to be more clean!!!
    register(req)
      .unwrap()
      .then()
      .catch(() => {});
  };

  return (
    <AuthPage>
      <AuthForm type="sign-up" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldRHF control={control} name="username" label="User name" />
        <TextFieldRHF control={control} name="fullName" label="Full name" />
        <TextFieldRHF control={control} name="password" label="Password" />
        <TextFieldRHF control={control} name="confirmPassword" label="Confirm password" />
      </AuthForm>
    </AuthPage>
  );
};

export default Registration;
