import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { server } from "../../server";
import axios from "axios";

const initialState = {
  isLoading: true,
  adminSellers: [],
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const sellerSlice = createSliceWithThunks({
  name: "seller",
  initialState,

  reducers: (create) => ({
    // load user
    loadSeller: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(`${server}/shop/getSeller`, {
            withCredentials: true,
          });

          return data;
        } catch (error) {
          return rejectWithValue(
            error.response?.data?.message || error.message
          );
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },

        fulfilled: (state, action) => {
          state.isLoading = false;
          state.seller = action.payload.seller;
          state.isSellerAuthenticated = true;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.isSellerAuthenticated = false;
        },
      }
    ),
    // get all sellers for admin
    getAdminSellers: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(`${server}/shop/admin-sellers`, {
            withCredentials: true,
          });
          return data;
        } catch (error) {
          return rejectWithValue(
            error.response?.data?.message || error.message
          );
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },

        fulfilled: (state, action) => {
          state.isLoading = false;
          state.adminSellers = action.payload.sellers;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),
  }),
});

export const { loadSeller, getAdminSellers } = sellerSlice.actions;
export default sellerSlice.reducer;
