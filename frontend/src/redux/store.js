import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller.reducers";
import { productReducer } from "./reducers/product.reducers";
import { eventReducer } from "./reducers/event.reducers";
import cartReducer from "./cartSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
  },
});

export default Store;
