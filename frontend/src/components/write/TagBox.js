import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const TagBoxBlock = styled.div`
  border-top: 1px solid #929292;
  padding-top: 2rem;

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #4a4a4a;
  }
`;

const Tag = styled.div`
  cursor: pointer;
  color: #4a4a4a;
  margin-right: 0.5rem;

  &::before {
    content: '#';
  }
  &:hover {
    opacity: 0.5;
  }
`;
const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const TagForm = styled.form`
  display: flex;
  width: max-content;

  input {
    border: none;
    border-bottom: 1px solid #929292;
    outline: none;
    font-size: 1rem;
    padding: 0.5rem;
    padding-left: 0;
    flex: 1;
    min-width: 0;
  }
`;

// React.memo: props가 바뀔때만 렌더링 한다.
const TagItem = React.memo(({ tag, onRemove }) => (
  // 클릭하면 onRemove를 호출하여 태그를 삭제한다.
  <Tag onClick={() => onRemove(tag)}>{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => {
  return (
    <TagListBlock>
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} onRemove={onRemove} />
      ))}
    </TagListBlock>
  );
});

const TagBox = ({ tags, onChangeTags }) => {
  // 태그를 추가하고 삭제하는 기능을 구현
  const [inputText, setInputText] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const placeholder = useRef('태그를 입력하세요.');

  const insertTag = useCallback(
    (tag) => {
      if (!tag) return;
      if (localTags.includes(tag)) {
        placeholder.current = '중복된 태그입니다.';
        return;
      }
      const nextTags = localTags.concat(tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
      placeholder.current = '태그를 입력하세요.';
    },
    [localTags, onChangeTags],
  );

  // filter를 이용한 tag 삭제
  const onRemove = useCallback(
    (tag) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(inputText.trim());
      setInputText('');
    },
    [inputText, insertTag],
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);
  return (
    <TagBoxBlock>
      <h3>Tags</h3>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder={placeholder.current}
          value={inputText}
          onChange={onChange}
        />
        <Button teal type="submit">
          태그 추가
        </Button>
      </TagForm>

      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
