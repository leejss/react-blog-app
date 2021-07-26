import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { authActions } from '../features/feature-auth/authSlice';
import { userActions } from '../features/feature-user/userSlice';
import { check } from '../modules/user';

const RegisterContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const form = useSelector((state) => state.auth.register);
  const auth = useSelector((state) => state.auth.auth);
  const authError = useSelector((state) => state.auth.authError);
  const user = useSelector((state) => state.user.user);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      authActions.CHANGE_FIELD({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      // Empty field
      // dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      // dispatch(
      //   changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      // );

      dispatch(
        authActions.CHANGE_FIELD({
          form: 'register',
          key: 'password',
          value: '',
        }),
      );
      dispatch(
        authActions.CHANGE_FIELD({
          form: 'register',
          key: 'passwordConfirm',
          value: '',
        }),
      );
      return;
    }
    // dispatch register
    // dispatch(register({ username, password }));
    dispatch(authActions.REGISTER({ username, password }));
  };

  useEffect(() => {
    // dispatch(initForm('register'));
    dispatch(authActions.INIT_FORM('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정입니다.');
        return;
      }
      setError('회원가입 실패');
    }
    if (auth) {
      console.log('회원가입 성공', auth);
      dispatch(userActions.CHECK());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        console.error(err);
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
    />
  );
};

export default withRouter(RegisterContainer);
