import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./Routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcom to my website</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
