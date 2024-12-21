import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    userData: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    pushArticleId: (state, action) => {
      state.userData.articles.push(action.payload);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
