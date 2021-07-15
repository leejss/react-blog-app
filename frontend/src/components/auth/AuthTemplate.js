import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const AuthTemplateBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${palette.teal[0]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`;

const WhiteBox = styled.div`
  .logo {
    display: block;
    padding-bottom: 1rem;
    text-align: center;
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 1.5rem;
  }
  background: ${palette.white};
  padding: 2rem;
  width: 30vw;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo">
          <Link to="/">Zlog</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
