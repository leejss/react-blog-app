import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.indigo[9]};
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.indigo[2]};
  padding-bottom: 0.5rem;
  width: 100%;
  transition: 0.2s;
  &:focus {
    color: ${palette.indigo[5]};
    border-bottom: 1px solid ${palette.indigo[5]};
    background: ${palette.indigo[0]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.teal[7]};

    &:hover {
      color: ${palette.teal[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const ErrorMessage = styled.div`
  color: ${palette.orange[8]};
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: 1rem;
    `}
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={form.password}
          onChange={onChange}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            value={form.passwordConfirm}
            onChange={onChange}
          />
        )}
        {error && <ErrorMessage marginTop>{error}</ErrorMessage>}
        <ButtonWithMarginTop fullWidth teal>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
