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
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./Routes";
import ProtectedRoute from "../protectedRoute";
import ShopHomePage from "../pages/ShopHomePage";
import SellerProtectedRoute from "../sellerProtectedRoute";
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

  // shop Routes
  {
    path: "/shop-create",
    element: <ShopCreatePage />,
  },
  {
    path: "/seller/activation/:activation_token",
    element: <SellerActivationPage />,
  },
  {
    path: "/shop-login",
    element: <ShopLoginPage />,
  },
  {
    path: "shop/:id",
    element: (
      <SellerProtectedRoute>
        <ShopHomePage />,
      </SellerProtectedRoute>
    ),
  },
]);
