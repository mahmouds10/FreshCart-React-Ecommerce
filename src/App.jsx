import "./App.css";
import Layout from "./Component/Layout/Layout";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Products from "./Component/Products/Products";
import NotFound from "./Component/NotFound/NotFound";
import Home from "./Component/Home/Home";
import { AuthenticationContextProvider } from "./Contexts/Authentication";

import Cart from "./Component/Cart/Cart";
import Brands from "./Component/Brands/Brands";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import PasswordLayout from "./Component/PasswordLayout/PasswordLayout";
import EnterMail from "./Component/EnterMail/EnterMail";
import EnterSubmitCode from "./Component/EnterSubmitCode/EnterSubmitCode";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import CartContextProvider from "./Contexts/CartContext";
import { Toaster } from "react-hot-toast";

import Payment from "./Component/Payment/Payment";
import AllOrders from "./Component/AllOrders/AllOrders";

const myRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: localStorage.getItem("tkn") ? <Home /> : <Register />,
      },
      {
        path: "FreshCart-React-Ecommerce/",
        element: localStorage.getItem("tkn") ? <Home /> : <Register />,
      },
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
      {
        path: "Home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductsDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetpassword",
        element: <PasswordLayout />,
        children: [
          { path: "entermail", element: <EnterMail /> },
          { path: "entersubmitcode", element: <EnterSubmitCode /> },
          { path: "resetpassword", element: <ResetPassword /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthenticationContextProvider>
          <CartContextProvider>
            <RouterProvider router={myRouter} />
          </CartContextProvider>
        </AuthenticationContextProvider>
      </QueryClientProvider>

      <Toaster />
    </>
  );
}

export default App;
