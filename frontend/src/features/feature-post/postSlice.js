import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: null,
  error: null,
  loading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    READ_POST: (state) => {
      state.loading = true;
    },
    READ_POST_SUCCESS: (state, action) => {
      state.post = action.payload;
      state.error = null;
      state.loading = false;
    },
    READ_POST_FAILURE: (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
    },
    UNLOAD_POST: (state) => {
      state = initialState;
    },
  },
});

const postReducer = postSlice.reducer;

export const postActions = postSlice.actions;

export default postReducer;
