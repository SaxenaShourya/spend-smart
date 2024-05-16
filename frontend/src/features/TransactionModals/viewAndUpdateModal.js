import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: "",
  isDisabled: false,
  _id: "",
  transaction: {
    title: "",
    amount: 0,
    category: "",
    description: "",
    date: "",
  },
  refetch: false,
};

const transactionViewAndUpdateModal = createSlice({
  name: "transactionViewAndUpdateModal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      const { type, isDisabled, transaction, _id } = action.payload;
      state.type = type;
      state.isDisabled = isDisabled;
      state._id = _id;
      state.transaction = { ...state.transaction, ...transaction };
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
  transactionViewAndUpdateModal.actions;

export default transactionViewAndUpdateModal.reducer;
