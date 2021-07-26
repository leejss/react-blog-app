import { call, put, takeLatest } from '@redux-saga/core/effects';
import { postActions } from './postSlice';
import * as postsAPI from '../../lib/api/posts';

function* getPostSaga(action) {
  try {
    const response = yield call(postsAPI.readPost, action.payload);
    yield put(postActions.READ_POST_SUCCESS(response.data));
  } catch (error) {
    yield put(postActions.READ_POST_FAILURE(error));
  }
}

export default function* postSaga() {
  yield takeLatest(postActions.READ_POST, getPostSaga);
}
