import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./redux/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});
