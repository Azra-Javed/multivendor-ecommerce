import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { sellerReducer } from "./reducers/seller.reducers";
import { productReducer } from "./reducers/product.reducers";
import { eventReducer } from "./reducers/event.reducers";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default Store;
