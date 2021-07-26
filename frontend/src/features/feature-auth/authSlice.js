import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
  loading: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    INIT_FORM: (state, action) => {
      state[action.payload] = initialState[action.payload];
    },
    CHANGE_FIELD: (state, action) => {
      state[action.payload.form] = {
        ...state[action.payload.form],
        [action.payload.key]: action.payload.value,
      };
    },
    REGISTER: (state) => {
      state.loading = true;
    },
    REGISTER_SUCCESS: (state, action) => {
      state.auth = action.payload;
      state.authError = null;
      state.loading = false;
    },
    REGISTER_FAILURE: (state, action) => {
      state.auth = null;
      state.authError = action.payload;
      state.loading = false;
    },
    LOGIN: (state) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.auth = action.payload;
      state.authError = null;
      state.loading = false;
    },
    LOGIN_FAILURE: (state, action) => {
      state.auth = null;
      state.authError = action.payload;
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
