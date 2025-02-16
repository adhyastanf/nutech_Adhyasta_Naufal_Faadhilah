import { getBanner } from '@/lib/service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBanners = createAsyncThunk('banner/fetchBanners', async (_, { rejectWithValue }) => {
  try {
    const response = await getBanner();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Gagal mengambil banner');
  }
});

const initialState = {
  banners: null,
  loading: false,
  error: null,
  message: null,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearBannerMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBannerMessage } = bannerSlice.actions;
export default bannerSlice.reducer;
