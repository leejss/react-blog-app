import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const EditorBlock = styled.div`
  padding-top: 5rem;
  padding-bottom: 2.5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #929292;
  width: 100%;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

// Quill
const toolbarOptions = [
  [{ header: '1' }, { header: '2' }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block', 'link', 'image'],
];

const QuillEditorBlock = styled.div`
  .ql-editor {
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
    padding: 8px;
  }

  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

const QuillEditor = ({ onChangeField, body }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    });
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false); // 마운

  // body의 값이 바뀔 때마다 useEffect가 호출된다.
  // 하지만 마운트 되고나서 한번만 실행하도록 하기 위해 mounted라는 변수를 설정했다.
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  return (
    <QuillEditorBlock>
      <div ref={quillElement} />
    </QuillEditorBlock>
  );
};

const Editor = ({ title, body, onChangeField }) => {
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };
  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요."
        onChange={onChangeTitle}
        value={title}
      />
      <QuillEditor onChangeField={onChangeField} body={body} />
    </EditorBlock>
  );
};

export default Editor;
