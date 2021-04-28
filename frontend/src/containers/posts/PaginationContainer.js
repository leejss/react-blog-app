import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = ({ location, match }) => {
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));
  if (!posts || loading) return null;
  // username은 parameter, tag와 page는 query에서 추출.
  const { username } = match.params;
  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      username={username}
      tag={tag}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PaginationContainer);
