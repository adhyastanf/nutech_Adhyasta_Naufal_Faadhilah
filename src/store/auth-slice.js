import { fetchLogin, fetchRegistration } from '@/lib/service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk('auth/registerUser', async ({ email, password, first_name, last_name }, { rejectWithValue }) => {
  try {
    const body = { email, password, first_name, last_name };
    const response = await fetchRegistration(body);
    return { message: response.data.message };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Registrasi gagal');
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const body = { email, password };
    const response = await fetchLogin(body);
    localStorage.setItem('token', response.data.data.token);
    return { token: response.data.data.token, message: response.data.message };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login gagal');
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('token');
  window.location.href = '/auth/login';
  return { message: 'Logout berhasil!' };
});

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.token = null;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      });
  },
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;
