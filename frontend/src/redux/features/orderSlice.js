import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { server } from "../../server";
import axios from "axios";

const initialState = {
  isLoading: true,
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const orderSlice = createSliceWithThunks({
  name: "order",
  initialState,

  reducers: (create) => ({
    // get all orders of user
    getAllOrders: create.asyncThunk(
      async (userId, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(
            `${server}/order/get-all-orders/${userId}`
          );

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
          state.orders = action.payload.orders;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),
    // get all orders of shop
    getShopAllOrders: create.asyncThunk(
      async (shopId, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(
            `${server}/order/get-shop-all-orders/${shopId}`
          );

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
          state.shopOrders = action.payload.orders;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),
  }),
});

export const { getAllOrders, getShopAllOrders } = orderSlice.actions;
export default orderSlice.reducer;
