import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { loadSeller } from "./redux/actions/seller.actions";
import { router } from "./routes/AppRoutes";
import { useSelector } from "react-redux";
import { getAllEvents } from "./redux/actions/event.actions";
import { getAllProducts } from "./redux/actions/product.actions";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);

  const { allEvents } = useSelector((state) => state.events);
  console.log("products:", allEvents);
  const { allProducts } = useSelector((state) => state.products);
  console.log(allProducts);

  return (
    <>
      <RouterProvider router={router} />
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
