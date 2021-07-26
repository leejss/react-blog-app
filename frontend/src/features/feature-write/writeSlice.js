import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
  loading: false,
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    INIT: (state) => {
      state = initialState;
    },
    WRITE_POST: (state) => {
      state = initialState;
      state.loading = true;
    },
    WRITE_POST_SUCCESS: (state, action) => {
      state = initialState;
      state.post = action.payload;
    },
    WRITE_POST_FAILURE: (state, action) => {
      state = initialState;
      state.postError = action.payload;
    },
    STORE_POST: (state, action) => {
      state = initialState;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.tags = action.payload.tags;
      state.originalPostId = action.payload._id;
    },
    UPDATE_POST: (state) => {
      state = initialState;
      state.loading = true;
    },
    UPDATE_POST_SUCCESS: (state, action) => {
      state = initialState;
      state.post = action.payload;
    },
    UPDATE_POST_FAILRUE: (state, action) => {
      state = initialState;
      state.postError = action.payload;
    },
  },
});

const writeReducer = writeSlice.reducer;

export const writeActions = writeSlice.actions;
export default writeReducer;
