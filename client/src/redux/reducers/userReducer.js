import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  errors: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.errors = null;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.errors = null;
    },
    registerFail: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.errors = action.payload;
    },
    loginFail: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.errors = action.payload;
    },
    loadUserFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    clearErrors: (state) => {
      state.errors = null;
    },
  },
});

export const load_user = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get("/users/user");
    dispatch(loadUser(res.data));
  } catch (err) {
    dispatch(loadUserFail(err));
  }
};

export const register_user = ({ email, username, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ email, username, password });
    const res = await axios.post("/users/register", body, config);
    dispatch(registerSuccess(res.data));
    dispatch(load_user());
  } catch (err) {
    dispatch(registerFail(err.response.data));
  }
};

export const login_user = ({ email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    const res = await axios.post("/users/login", body, config);
    dispatch(loginSuccess(res.data));
    dispatch(load_user());
  } catch (err) {
    dispatch(loginFail(err.response.data));
  }
};

export const {
  loadUser,
  loadUserFail,
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  logout,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
