import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import ProductByCategory from "../components/product/ProductByCategory";
import CheckoutPage from "../pages/CheckoutPage";
import ProductManagementPage from "../pages/ProductManagementPage";
import AddProductPage from "../pages/AddProductPage";
import AddCategoryPage from "../pages/AddCategoryPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "productByCategory/:category",
        element: <ProductByCategory />,
      },
      {
        path: "checkout",
        element: <ProtectedRoute><CheckoutPage /></ProtectedRoute>,
      },
      {
        path: "add-product",
        element: <ProtectedRoute><AddProductPage /></ProtectedRoute>,
      },
      {
        path: "productManagement",
        element: <ProtectedRoute><ProductManagementPage /></ProtectedRoute>,
      },
      {
        path: "add-category",
        element: <ProtectedRoute><AddCategoryPage /></ProtectedRoute>
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
