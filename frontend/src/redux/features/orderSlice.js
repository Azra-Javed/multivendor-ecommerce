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
  }),
});

export const { getAllOrders } = orderSlice.actions;
export default orderSlice.reducer;
