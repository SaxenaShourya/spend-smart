import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  _id: "",
  title: "",
  type: "",
  refetch: false,
};

const deleteTransactionModalSlice = createSlice({
  name: "deleteTransactionModal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      const { _id, title, type } = action.payload;
      state._id = _id;
      state.title = title;
      state.type = type;
    },
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal, setRefetch } =
  deleteTransactionModalSlice.actions;

export default deleteTransactionModalSlice.reducer;
