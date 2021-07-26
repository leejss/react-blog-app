import { call, put, takeLatest } from '@redux-saga/core/effects';
import { writeActions } from './writeSlice';
import * as postsAPI from '../../lib/api/posts';

function* writePostSaga(action) {
  try {
    const response = yield call(postsAPI.writePost, action.payload);
    yield put(writeActions.WRITE_POST_SUCCESS(response.data));
  } catch (error) {
    yield put(writeActions.WRITE_POST_FAILURE(error));
  }
}

function* updatePostSaga(action) {
  try {
    const response = yield call(postsAPI.updatePost, action.payload);
    yield put(writeActions.UPDATE_POST_SUCCESS(response.data));
  } catch (error) {
    yield put(writeActions.UPDATE_POST_FAILRUE(error));
  }
}

export default function* writeSaga() {
  yield takeLatest(writeActions.WRITE_POST, writePostSaga);
  yield takeLatest(writeActions.UPDATE_POST, updatePostSaga);
}
