import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const SubInfoBlock = styled.div`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}

  color: #4a4a4a;

  span + span:before {
    color: #4a4a4a;
    content: '\\B7';
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;
