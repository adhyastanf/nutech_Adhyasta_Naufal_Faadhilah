import { getTransactionHistory } from '@/lib/service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactionHistory = createAsyncThunk('transactions/fetchTransactionHistory', async ({ offset, limit }, { rejectWithValue }) => {
  try {
    const response = await getTransactionHistory(offset, limit);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Gagal mengambil riwayat transaksi');
  }
});

const initialState = {
  transactions: [],
  error: null,
  hasMore: true,
  offset:0,
  limit:5
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.concat(action.payload.data.records);
        state.offset += state.limit
        state.hasMore = action.payload.data.records.length > 0;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
