import { put, call } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../modules/loading';
export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response, // header에 접근하기 위한 데이터
      });
    } catch (err) {
      yield put({
        type: FAILURE,
        payload: err,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
