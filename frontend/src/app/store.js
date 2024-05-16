import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../features/api/apiSlice";

import loaderReducer from "../features/loader/loaderSlice";
import authReducer from "../features/authenticate/authSlice";
import logoutModalReducer from "../features/logoutModal/logoutModalSlice";
import transactionViewAndUpdateModalReducer from "../features/TransactionModals/viewAndUpdateModal";
import deleteTransactionModalReducer from "../features/TransactionModals/deleteModal";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    loader: loaderReducer,
    auth: authReducer,
    logoutModal: logoutModalReducer,
    transactionViewAndUpdateModal: transactionViewAndUpdateModalReducer,
    deleteTransactionModal: deleteTransactionModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export default store;
