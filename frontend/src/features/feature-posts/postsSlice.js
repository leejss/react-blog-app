import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    LIST_POSTS: (state) => {
      state.loading = true;
    },
    LIST_POSTS_SUCCESS: (state, action) => {
      state.posts = action.payload.data;
      state.lastPage = parseInt(action.payload.headers['last-page'], 10);
      state.loading = false;
    },
    LIST_POSTS_FAILURE: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const postsReducer = postsSlice.reducer;

export const postsActions = postsSlice.actions;

export default postsReducer;
