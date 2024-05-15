import { createSlice } from "@reduxjs/toolkit";

const initialState = { progress: 0 };

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    updateLoader: (state, action) => {
      state.progress += action.payload;
    },
    resetLoader: (state) => {
      state.progress = 0;
    },
  },
});

export const { updateLoader, resetLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
