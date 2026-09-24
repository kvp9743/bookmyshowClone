import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    toggleLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
