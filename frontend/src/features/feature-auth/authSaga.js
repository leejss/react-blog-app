import { call, put, takeLatest } from '@redux-saga/core/effects';
import * as authAPI from '../../lib/api/auth';
import { authActions } from './authSlice';

function* registerSaga(action) {
  try {
    const response = yield call(authAPI.register, action.payload);
    yield put(authActions.REGISTER_SUCCESS(response.data));
  } catch (error) {
    console.log('registerError', error);
    yield put(authActions.REGISTER_FAILURE(error));
  }
}

function* loginSaga(action) {
  try {
    const response = yield call(authAPI.login, action.paylod);
    yield put(authActions.LOGIN_SUCCESS(response.data));
  } catch (error) {
    yield put(authActions.LOGIN_FAILURE(error));
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.REGISTER, registerSaga);
  yield takeLatest(authActions.LOGIN, loginSaga);
}
