import { getBanner, getServices } from "@/lib/service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getServices()
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil services");
    }
  }
);

const initialState = {
  services: null,
  loading: false,
  error: null,
  message: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearServicesMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServicesMessage } = servicesSlice.actions;
export default servicesSlice.reducer;
