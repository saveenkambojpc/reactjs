// @ts-ignore
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../..";

// Define a type for the slice state
interface GlobalState {
  isNavOpen: boolean;
}

// Define the initial state using that type
const initialState: GlobalState = {
  isNavOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    navOpen: (state) => {
      state.isNavOpen = true;
    },
    navClose: (state) => {
      state.isNavOpen = false;
    },
  },
});

export const { navOpen, navClose } = globalSlice.actions;
export default globalSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.global.value;
