import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../components/write/Editor';
import { changeField, init } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.write.title);
  const body = useSelector((state) => state.write.body);

  const onChangeField = useCallback(
    (payload) => {
      dispatch(changeField(payload));
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(init());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
