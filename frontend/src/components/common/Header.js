import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from './Button';
import Responsive from './Responsive';
const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${palette.teal[0]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right {
    display: flex;
    align-items: center;
  }
`;

const Logo = styled(Link)`
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  font-family: 'Merriweather', serif;
  color: #4a4a4a;
`;

const UserInfo = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #4a4a4a;
  position: relative;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 5px;
  left: -10px;
`;

const Spacer = styled.div`
  height: 6rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Logo to="/">BASH</Logo>
          {user ? (
            <div className="right">
              <UserInfo>
                <StyledImg
                  src={`${process.env.PUBLIC_URL}/at-sign.svg`}
                  alt="at"
                />
                {user.username}
              </UserInfo>
              <Button to="/" onClick={onLogout} teal big>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login" teal big>
                로그인
              </Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
