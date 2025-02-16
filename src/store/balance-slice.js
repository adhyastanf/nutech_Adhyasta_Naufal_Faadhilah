import { getBalance, postTransaction, topupBalance } from '@/lib/service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBalance = createAsyncThunk('balance/fetchBalance', async (_, { rejectWithValue }) => {
  try {
    const response = await getBalance();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Gagal mengambil balance');
  }
});

export const topUpBalance = createAsyncThunk('balance/topUpBalance', async (amount, { rejectWithValue, dispatch }) => {
  try {
    const body = { top_up_amount: amount };
    const response = await topupBalance(body);
    dispatch(fetchBalance());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Gagal melakukan top-up');
  }
});

export const postTransactions = createAsyncThunk('balance/postTransaction', async (service_code, { rejectWithValue, dispatch }) => {
  try {
    const body = { service_code };
    const response = await postTransaction(body);
    dispatch(fetchBalance());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Gagal melakukan transaksi');
  }
});

const initialState = {
  balance: null,
  message: {
    fetchBalance: null,
    topUpBalance: null,
    postTransaction: null,
  },
  error: {
    fetchBalance: null,
    topUpBalance: null,
    postTransaction: null,
  },
  loading: {
    fetchBalance: false,
    topUpBalance: false,
    postTransaction: false,
  },
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    clearBalanceMessage: (state) => {
      state.message.fetchBalance = null;
      state.message.topUpBalance = null;
      state.message.postTransaction = null;
      state.error.fetchBalance = null;
      state.error.topUpBalance = null;
      state.error.postTransaction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading.fetchBalance = true;
        state.error.fetchBalance = null;
        state.message.fetchBalance = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading.fetchBalance = false;
        state.balance = action.payload?.data;
        state.message.fetchBalance = action.payload?.message;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading.fetchBalance = false;
        state.error.fetchBalance = action.payload;
      })

      .addCase(topUpBalance.pending, (state) => {
        state.loading.topUpBalance = true;
        state.error.topUpBalance = null;
        state.message.topUpBalance = null;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.loading.topUpBalance = false;
        state.message.topUpBalance = action.payload.message;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.loading.topUpBalance = false;
        state.error.topUpBalance = action.payload;
      })

      .addCase(postTransactions.pending, (state) => {
        state.loading.postTransaction = true;
        state.error.postTransaction = null;
        state.message.postTransaction = null;
      })
      .addCase(postTransactions.fulfilled, (state, action) => {
        state.loading.postTransaction = false;
        state.message.postTransaction = action.payload?.message;
      })
      .addCase(postTransactions.rejected, (state, action) => {
        state.loading.postTransaction = false;
        state.error.postTransaction = action.payload;
      });
  },
});

export const { clearBalanceMessage } = balanceSlice.actions;
export default balanceSlice.reducer;
