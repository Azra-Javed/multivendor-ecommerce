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
  CheckoutPage,
  OrderSuccessPage,
  PaymentPage,
} from "./userRoutes";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllCoupons,
  ShopPreviewPage,
} from "./shopRoutes";
import {
  UserProtectedRoute,
  SellerProtectedRoute,
} from "./protectedRoutes/protectedRoutes";

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
  {
    path: "/checkout",
    element: (
      <UserProtectedRoute>
        <CheckoutPage />
      </UserProtectedRoute>
    ),
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/order/success/:id",
    element: <OrderSuccessPage />,
  },
  { path: "/product/:name", element: <ProductDetailsPage /> },

  {
    path: "/profile",
    element: (
      <UserProtectedRoute>
        <ProfilePage />
      </UserProtectedRoute>
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
        <ShopHomePage />
      </SellerProtectedRoute>
    ),
  },

  {
    path: "/shop/preview/:id",
    element: <ShopPreviewPage />,
  },

  {
    path: "/dashboard",
    element: (
      <SellerProtectedRoute>
        <ShopDashboardPage />
      </SellerProtectedRoute>
    ),
  },

  {
    path: "/dashboard-create-product",
    element: (
      <SellerProtectedRoute>
        <ShopCreateProduct />
      </SellerProtectedRoute>
    ),
  },
  {
    path: "/dashboard-products",
    element: (
      <SellerProtectedRoute>
        <ShopAllProducts />
      </SellerProtectedRoute>
    ),
  },
  {
    path: "/dashboard-create-event",
    element: (
      <SellerProtectedRoute>
        <ShopCreateEvent />
      </SellerProtectedRoute>
    ),
  },

  {
    path: "/dashboard-events",
    element: (
      <SellerProtectedRoute>
        <ShopAllEvents />
      </SellerProtectedRoute>
    ),
  },
  {
    path: "/dashboard-coupons",
    element: (
      <SellerProtectedRoute>
        <ShopAllCoupons />
      </SellerProtectedRoute>
    ),
  },
]);
