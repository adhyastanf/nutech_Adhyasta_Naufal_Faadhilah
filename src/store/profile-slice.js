import { getProfile, updatedImage, updatedProfile,  } from "@/lib/service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile()
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil profil");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ email, first_name, last_name }, { rejectWithValue }) => {
    try {
      const body = { email, first_name, last_name };
      const response = await updatedProfile(body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memperbarui profil");
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "profile/updateProfileImage",
  async (file, { rejectWithValue }) => {
    try {
      const response = await updatedImage(file)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memperbarui gambar profil");
    }
  }
);

const initialState = {
  profile: null,
  loading: {
    fetchProfile: false,
    updateProfile: false,
    updateImage: false,
  },
  error: {
    fetchProfile: null,
    updateProfile: null,
    updateImage: null,
  },
  message: {
    fetchProfile: null,
    updateProfile: null,
    updateImage: null,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileMessage: (state) => {
      state.message.fetchProfile = null;
      state.message.updateProfile = null;
      state.message.updateImage = null;
      state.error.fetchProfile = null;
      state.error.updateProfile = null;
      state.error.updateImage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading.fetchProfile = true;
        state.error.fetchProfile = null;
        state.message.fetchProfile = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading.fetchProfile = false;
        state.profile = action.payload.data;
        state.message.fetchProfile = action.payload.message;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading.fetchProfile = false;
        state.error.fetchProfile = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading.updateProfile = true;
        state.error.updateProfile = null;
        state.message.updateProfile = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading.updateProfile = false;
        state.profile = action.payload.data;
        state.message.updateProfile = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading.updateProfile = false;
        state.error.updateProfile = action.payload;
      })

      .addCase(updateProfileImage.pending, (state) => {
        state.loading.updateImage = true;
        state.error.updateImage = null;
        state.message.updateImage = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading.updateImage = false;
        state.profile.profile_image = action.payload.data.profile_image;
        state.message.updateImage = action.payload.message;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading.updateImage = false;
        state.error.updateImage = action.payload;
      });
  },
});

export const { clearProfileMessage } = profileSlice.actions;
export default profileSlice.reducer;
