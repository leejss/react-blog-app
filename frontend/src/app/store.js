import rootReducer from '../modules/index';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, call } from '@redux-saga/core/effects';
import authSaga from '../features/feature-auth/authSaga';
import userSaga from '../features/feature-user/userSaga';
import authReducer from '../features/feature-auth/authSlice';
import userReducer from '../features/feature-user/userSlice';
import postsReducer from '../features/feature-posts/postsSlice';
import postsSaga from '../features/feature-posts/postsSaga';
import postReducer from '../features/feature-post/postSlice';
import postSaga from '../features/feature-post/postSaga';
import writeReducer from '../features/feature-write/writeSlice';
import writeSaga from '../features/feature-write/writeSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([authSaga(), userSaga(), postsSaga(), postSaga(), writeSaga()]);
}

const createStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      posts: postsReducer,
      post: postReducer,
      write: writeReducer,
    },
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

const store = createStore();

export default store;
