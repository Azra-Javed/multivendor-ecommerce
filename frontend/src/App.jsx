import { createBrowserRouter } from "react-router-dom";
import { LoginPage, SignUpPage, ActivationPage } from "./Routes";
import { RouterProvider } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcom to my website</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "/sign-up", element: <SignUpPage /> },
  { path: "/activation/:activation_token", element: <ActivationPage /> },
]);

<ToastContainer postiton="bottom-center" autoClose={5000}></ToastContainer>;

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
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
