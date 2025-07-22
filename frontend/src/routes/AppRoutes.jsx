import { createBrowserRouter } from "react-router-dom";
import {
  ActivationPage,
  HomePage,
  LoginPage,
  SignUpPage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
} from "./Routes";
import ProtectedRoute from "../protectedRoute";
import { useSelector } from "react-redux";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "/sign-up", element: <SignUpPage /> },
  { path: "/activation/:activation_token", element: <ActivationPage /> },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/best-selling",
    element: <BestSellingPage />,
  },
  { path: "/events", element: <EventsPage /> },
  { path: "faq", element: <FAQPage /> },
  { path: "/product/:name", element: <ProductDetailsPage /> },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
]);
