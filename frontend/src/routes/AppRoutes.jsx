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
  OrderDetailsPage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  CheckoutPage,
  OrderSuccessPage,
  PaymentPage,
  TrackOrderPage,
  UserInbox,
} from "./userRoutes";

import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopAllOrders,
  ShopOrderDetails,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllCoupons,
  ShopPreviewPage,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./shopRoutes";

import { AdminDashboardPage, AdminUsersPage } from "./adminRoutes";

import {
  UserProtectedRoute,
  SellerProtectedRoute,
  AdminProtectedRoute,
} from "./protectedRoutes/protectedRoutes";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export const router = (stripeApiKey) =>
  createBrowserRouter([
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
      element: (
        <UserProtectedRoute>
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <PaymentPage />
            </Elements>
          )}
        </UserProtectedRoute>
      ),
    },
    {
      path: "/order/success",
      element: <OrderSuccessPage />,
    },
    { path: "/product/:id", element: <ProductDetailsPage /> },

    {
      path: "/profile",
      element: (
        <UserProtectedRoute>
          <ProfilePage />
        </UserProtectedRoute>
      ),
    },

    {
      path: "/inbox",
      element: (
        <UserProtectedRoute>
          <UserInbox />
        </UserProtectedRoute>
      ),
    },

    {
      path: "/user/order/:id",
      element: (
        <UserProtectedRoute>
          <OrderDetailsPage />
        </UserProtectedRoute>
      ),
    },

    {
      path: "/user/order/track/:id",
      element: (
        <SellerProtectedRoute>
          <TrackOrderPage />
        </SellerProtectedRoute>
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
      path: "/settings",
      element: (
        <SellerProtectedRoute>
          <ShopSettingsPage />
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
      path: "/dashboard-orders",
      element: (
        <SellerProtectedRoute>
          <ShopAllOrders />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-refunds",
      element: (
        <SellerProtectedRoute>
          <ShopAllRefunds />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/order/:id",
      element: (
        <SellerProtectedRoute>
          <ShopOrderDetails />
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
    {
      path: "/dashboard-withdraw-money",
      element: (
        <SellerProtectedRoute>
          <ShopWithDrawMoneyPage />
        </SellerProtectedRoute>
      ),
    },
    {
      path: "/dashboard-messages",
      element: (
        <SellerProtectedRoute>
          <ShopInboxPage />
        </SellerProtectedRoute>
      ),
    },

    // Admin Routes
    {
      path: "/admin/dashboard",
      element: (
        <AdminProtectedRoute>
          <AdminDashboardPage />
        </AdminProtectedRoute>
      ),
    },
    {
      path: "/admin/users",
      element: (
        <AdminProtectedRoute>
          <AdminUsersPage />
        </AdminProtectedRoute>
      ),
    },
  ]);
