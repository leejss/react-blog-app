import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import authReducer from '../features/feature-auth/authSlice';
import userReducer from '../features/feature-user/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  loading,
  user: userReducer,
  write,
  post,
  posts,
});

// rootsaga
export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}

export default rootReducer;
