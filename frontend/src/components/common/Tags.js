import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  .tag {
    display: inline-block;
    color: ${palette.indigo[5]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:before {
      content: '#';
    }
    &:hover {
      color: ${palette.indigo[9]};
    }
  }
`;

const Tags = ({ tags }) => {
  return (
    <TagsBlock>
      {tags.map((tag) => (
        <Link className="tag" to={`/?tag=${tag}`} key={tag}>
          {tag}
        </Link>
      ))}
    </TagsBlock>
  );
};

export default Tags;
