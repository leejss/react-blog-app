import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from '../../modules/post';
import { withRouter } from 'react-router-dom';
import PostActionButtons from '../../components/post/PostActionButtons';
import { storePost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';
import { postActions } from '../../features/feature-post/postSlice';

const PostViewerContainer = ({ match, history }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  // const { post, error, loading, user } = useSelector(
  //   ({ post, loading, user }) => ({
  //     post: post.post,
  //     error: post.error,
  //     loading: loading['post/READ_POST'],
  //     user: user.user,
  //   }),
  // );

  const post = useSelector((state) => state.post.post);
  const error = useSelector((state) => state.post.error);
  const loading = useSelector((state) => state.post.loading);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // dispatch(readPost(postId));
    // return () => {
    //   dispatch(unloadPost());
    // };
    dispatch(postActions.READ_POST(postId));
    return () => {
      dispatch(postActions.UNLOAD_POST());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(storePost(post)); // store의 write 상태에 post를 저장한다.
    history.push('/write'); // 수정 화면으로 넘어간다.
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/');
    } catch (err) {
      console.error(error);
    }
  };
  return (
    <PostViewer
      post={post}
      error={error}
      loading={loading}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default withRouter(PostViewerContainer);
