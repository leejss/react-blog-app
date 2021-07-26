import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import qs from 'qs';
import { postsActions } from '../../features/feature-posts/postsSlice';

// /@username?tag=&page=
const PostListContainer = ({ match, location }) => {
  const dispatch = useDispatch();
  // const { loading, error, posts, user } = useSelector(
  //   ({ posts, loading, user }) => ({
  //     loading: loading['posts/LIST_POST'],
  //     posts: posts.posts,
  //     error: posts.error,
  //     user: user.user,
  //   }),
  // );

  const posts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  const loading = useSelector((state) => state.posts.loading);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const { username } = match.params;
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    // dispatch(listPosts({ tag, username, page }));
    dispatch(postsActions.LIST_POSTS({ tag, username, page }));
  }, [dispatch, location.search, match.params]);
  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default withRouter(PostListContainer);
