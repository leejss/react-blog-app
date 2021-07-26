import { call, put, takeLatest } from '@redux-saga/core/effects';
import * as authAPI from '../../lib/api/auth';
import { userActions } from './userSlice';

function* checkSaga() {
  try {
    const response = yield call(authAPI.check);
    console.log(response);
    yield put(userActions.CHECK_SUCCESS(response.data));
  } catch (error) {
    console.log(error);
    yield put(userActions.CEHCK_FAILURE(error));
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.CHECK, checkSaga);
}
