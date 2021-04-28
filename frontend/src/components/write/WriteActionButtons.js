import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  padding-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  height: 2.125rem;

  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ onPublish, onCancel, isEdit }) => {
  return (
    <WriteActionButtonsBlock>
      <StyledButton teal onClick={onPublish}>
        포스트 {isEdit ? '수정' : '등록'}
      </StyledButton>
      <StyledButton indigo onClick={onCancel}>
        취소
      </StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
