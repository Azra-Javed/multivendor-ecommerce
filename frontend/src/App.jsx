import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/features/userSlice";

import { router } from "./routes/AppRoutes";
import { getAllEvents } from "./redux/actions/event.actions";
import { getAllProducts } from "./redux/actions/product.actions";
import { server } from "./server";
import { useState } from "react";
import axios from "axios";
import { loadSeller } from "./redux/features/sellerSlice";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeApikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <>
      <RouterProvider router={router(stripeApiKey)} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
