import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  errors: null,
  profile: null,
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
    loadProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    authSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.errors = null;
    },
    authFail: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.errors = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
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
    dispatch(logout(err.response.data));
  }
};

export const register_user = ({ email, username, name, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ email, username, name, password });
    const res = await axios.post("/users/register", body, config);
    dispatch(authSuccess(res.data));
    dispatch(load_user());
  } catch (err) {
    dispatch(authFail(err.response.data));
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
    dispatch(authSuccess(res.data));
    dispatch(load_user());
  } catch (err) {
    dispatch(authFail(err.response.data));
  }
};

export const get_user_profile = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/users/profile/${username}`);
    dispatch(loadProfile(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const update_user_profile = ({ email, name, bio }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ email, name, bio });
    const res = await axios.post("/users/update", body, config);
    dispatch(updateUser(res.data));
    dispatch(load_user());
  } catch (err) {
    dispatch(authFail(err.response.data));
  }
};

export const { loadUser, authSuccess, authFail, logout, clearErrors, loadProfile, updateUser } = userSlice.actions;

export default userSlice.reducer;
