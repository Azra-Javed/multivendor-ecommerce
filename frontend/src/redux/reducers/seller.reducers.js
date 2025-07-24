// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isSellerAuthenticated: false,
//   isLoading: true,
// };

// export const sellerReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase("LoadSellerRequest", (state) => {
//       state.isLoading = true;
//     })
//     .addCase("LoadSellerSuccess", (state, action) => {
//       state.isSellerAuthenticated = true;
//       state.isLoading = false;
//       state.seller = action.payload;
//     })
//     .addCase("LoadSellerFail", (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload;
//       state.isSellerAuthenticated = false;
//     })
//     .addCase("clearErrors", (state) => {
//       state.isSellerAuthenticated = null;
//     });
// });

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
  isLoading: true,
  seller: null,
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSellerAuthenticated = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSellerAuthenticated = false;
      state.seller = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
