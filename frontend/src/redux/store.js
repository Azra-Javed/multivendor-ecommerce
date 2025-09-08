import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import sellerReducer from "./features/sellerSlice";
import productReducer from "./features/productSlice";
import eventReducer from "./features/eventSlice";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";
import orderReducer from "./features/orderSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default Store;
