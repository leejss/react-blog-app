import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updatePost, writePost } from '../../modules/write';
import WriteActionButtons from '../../components/write/WriteActionButtons';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  // store에서 post 데이터를 가져온다.
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
  );

  // 포스트를 등록하고 취소하는 함수
  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, tags, id: originalPostId }));
    } else {
      dispatch(writePost({ title, body, tags }));
    }
  };
  const onCancel = () => {
    history.goBack();
  };

  // 포스트 등록을 성공하거나 실패했을 시 동작
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`); // 방금작성한 포스트로 이동
    } else if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={originalPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
