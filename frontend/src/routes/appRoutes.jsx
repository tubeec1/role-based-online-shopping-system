import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import PublicProducts from "../pages/public/PublicProducts";
import ProductDetails from "../pages/public/ProductDetails";
import Cart from "../pages/public/Cart";
import Checkout from "../pages/public/Checkout";
import Signup from "../pages/public/Signup";
import Login from "../pages/public/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Categories from "../pages/dashboard/Categories";
import Users from "../pages/dashboard/Users";
import Permissions from "../pages/dashboard/Permissions";
import Payments from "../pages/dashboard/Payments";
import Orders from "../pages/dashboard/Orders";
import DashhboardProducts from "../pages/dashboard/DashboardProducts";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

let appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <PublicProducts />,
      },
      {
        path: "product-details",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <DashhboardProducts />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "permissions",
        element: <Permissions />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);

export default appRoutes;
