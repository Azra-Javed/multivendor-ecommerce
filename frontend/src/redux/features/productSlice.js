import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { server } from "../../server";
import axios from "axios";

const initialState = {
  isLoading: true,
  adminProducts: [],
  product: null,
  products: [],
  allProducts: [],
  success: false,
  message: null,
  error: null,
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const productSlice = createSliceWithThunks({
  name: "products",
  initialState,

  reducers: (create) => ({
    // create product
    createProduct: create.asyncThunk(
      async (newForm, { rejectWithValue }) => {
        try {
          const config = { headers: { "Content-Type": "multipart/form-data" } };
          const { data } = await axios.post(
            `${server}/product/create-product`,
            newForm,
            config
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
          state.product = action.payload.product;
          state.success = true;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.success = false;
        },
      }
    ),

    // get all products of shop
    getAllProductsShop: create.asyncThunk(
      async (id, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(
            `${server}/product/get-all-products-shop/${id}`
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
          state.products = action.payload.products;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),

    // delete product
    deleteProduct: create.asyncThunk(
      async (id, { rejectWithValue }) => {
        try {
          const { data } = await axios.delete(
            `${server}/product/delete-shop-product/${id}`,
            { withCredentials: true }
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
          state.message = action.payload.message;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),

    // get all products

    getAllProducts: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(
            `${server}/product/get-all-products`
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
          state.allProducts = action.payload.products;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),
  }),
});

export const {
  createProduct,
  getAllProductsShop,
  deleteProduct,
  getAllProducts,
} = productSlice.actions;
export default productSlice.reducer;
