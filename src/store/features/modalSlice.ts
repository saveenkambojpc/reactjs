// modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ModalState {
  type: string; // Type of the modal
  data?: any; // Data to be displayed in the modal (optional)
  visible: boolean;
}

interface ModalStateOpenModalTypes {
  type: string;
  data?: any;
}

const initialState: ModalState = {
  type: "",
  data: undefined,
  visible: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalStateOpenModalTypes>) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
      state.visible = true;
    },
    closeModal: (state) => {
      state.type = "";
      state.data = undefined;
      state.visible = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = (state: RootState) => state.modal;

export default modalSlice.reducer;
