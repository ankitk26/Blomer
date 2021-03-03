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
    registerUser: (state, action) => {
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
    loadUserFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      // state.errors = action.payload;
    },
  },
});

export const load_user = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
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
    console.log(res.data);
    dispatch(registerUser(res.data));
    dispatch(load_user());
  } catch (err) {
    // console.log(err.response.data);
    dispatch(registerFail(err.response.data));
  }
};

export const { loadUser, loadUserFail, registerUser, registerFail } = userSlice.actions;

export default userSlice.reducer;
