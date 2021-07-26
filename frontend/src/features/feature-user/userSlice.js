import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  checkError: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    TEMP_SET_USER: (state, action) => {
      state.user = action.payload.user;
    },
    CHECK: (state) => {
      state.loading = true;
    },
    CHECK_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.checkError = null;
      state.loading = false;
    },
    CEHCK_FAILURE: (state, action) => {
      state.user = null;
      state.checkError = action.payload;
      state.loading = false;
    },
    LOGOUT: (state, action) => {
      state.user = null;
    },
  },
});

const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;
export default userReducer;
