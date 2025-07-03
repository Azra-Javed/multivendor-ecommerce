import { createBrowserRouter } from "react-router-dom";
import { LoginPage, SignUpPage } from "./Routes";

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
]);

const App = () => {
  return <>App</>;
};

export default App;
