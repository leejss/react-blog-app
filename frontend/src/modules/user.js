import { createAction, handleActions } from 'redux-actions';
import createRequestActionTypes from '../lib/createRequestActionTypes';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { call, takeLatest } from '@redux-saga/core/effects';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CEHCK, CEHCK_SUCCESS, CEHCK_FAILURE] = createRequestActionTypes(
  'user/CEHCK',
);
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CEHCK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CEHCK, authAPI.check);

// check에 실패했을 경우
const checkFailureSaga = () => {
  try {
    localStorage.removeItem('user');
  } catch (err) {
    console.error(err);
  }
};

// logout saga
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    // localstorage를 비운다.
    localStorage.removeItem('user');
  } catch (err) {
    console.error(err);
  }
}

export function* userSaga() {
  yield takeLatest(CEHCK, checkSaga);
  yield takeLatest(CEHCK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

const user = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CEHCK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CEHCK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
export default user;
