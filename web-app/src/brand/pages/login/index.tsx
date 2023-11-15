import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginRequestDto } from '../../models/auth.dto';
import { useLoginMutation } from '../../services/auth.service';
import { TextFieldRHF } from '../../../design/components/text-field';
import { AuthForm } from '../../../design/templates/auth-form';
import { PasswordFieldRHF } from '../../../design/components/password-field';
import PATHES from '../../constants/pathes';
import AuthPage from '../../../design/templates/auth-page';

const schema = yup.object().shape({
  username: yup.string().required('User name is required').min(6, 'Username must be at least 6 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { control, handleSubmit } = useForm<LoginRequestDto>({
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const onSubmit = (data: LoginRequestDto) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate(PATHES.HOME_PAGE, { replace: true });
      })
      .catch(() => {});
  };

  return (
    <AuthPage>
      <AuthForm type="sign-in" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldRHF control={control} name="username" label="User name" />
        <PasswordFieldRHF control={control} name="password" label="Password" />
      </AuthForm>
    </AuthPage>
  );
};

export default Login;
