import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller.reducers";
import { productReducer } from "./reducers/product.reducers";
import { eventReducer } from "./reducers/event.reducers";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
  },
});

export default Store;
