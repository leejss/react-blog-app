import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

/*
  Button을 Link처럼 사용하기
*/

const buttonStyle = css`
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: ${palette.white};
  cursor: pointer;
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      width: 100%;
      font-size: 1.1rem;
    `}

  ${(props) =>
    props.teal &&
    css`
      transition: 0.1s;
      background: ${palette.teal[5]};
      &:hover {
        background: ${palette.teal[3]};
      }
    `}

    ${(props) =>
    props.indigo &&
    css`
      transition: 0.1s;
      background: ${palette.indigo[5]};
      &:hover {
        background: ${palette.indigo[3]};
      }
    `}

    ${(props) =>
    props.big &&
    css`
      font-size: 1.2rem;
    `}

    &:disabled {
    background-color: #929292;
    color: #fff;
    cursor: initial;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} teal={props.teal ? 1 : 0} big={props.big ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
