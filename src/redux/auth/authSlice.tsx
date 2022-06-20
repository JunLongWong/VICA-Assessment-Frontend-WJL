import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { authApi } from "./authApi";
import { IUser } from "../Api/model/types";


type AuthState = {
  userid: string;
  token: string;
  user?: IUser;
};

const slice = createSlice({
  name: "auth",
  initialState: {
    userid: localStorage.getItem("userid") || "",
    token: localStorage.getItem("token") || "",
    user: undefined,
  } as AuthState,
  reducers: {
    logout(state) {
      state.user = undefined;
      state.token = "";
      state.userid = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token;
        state.userid = action.payload.userid;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
      }
    );
  },
});

export default slice.reducer;

// for use selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserId = (state: RootState) => state.auth.userid;
export const selectToken = (state: RootState) => state.auth.token;

// for dispatch
export const { logout } = slice.actions;