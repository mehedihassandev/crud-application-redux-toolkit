import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  editTransaction,
  addTransaction,
  deleteTransaction,
} from "./transactionsAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await getTransactions();
    return response.data;
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data) => {
    const response = await addTransaction(data);
    return response.data;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, data }) => {
    const response = await editTransaction(id, data);
    return response.data;
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id) => {
    const response = await deleteTransaction(id);
    return response.data;
  }
);

// slice

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.transactions = [];
      })
      .addCase(createTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const indexTransactionId = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
        state.transactions[indexTransactionId] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
