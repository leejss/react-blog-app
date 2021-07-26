import { call, put, takeLatest } from '@redux-saga/core/effects';
import * as postsAPI from '../../lib/api/posts';
import { postsActions } from './postsSlice';

function* getPostsSaga(action) {
  try {
    const response = yield call(postsAPI.listPosts, action.payload);
    yield put(postsActions.LIST_POSTS_SUCCESS(response));
  } catch (error) {
    yield put(postsActions.LIST_POSTS_FAILURE(error));
  }
}

export default function* postsSaga() {
  yield takeLatest(postsActions.LIST_POSTS, getPostsSaga);
}
