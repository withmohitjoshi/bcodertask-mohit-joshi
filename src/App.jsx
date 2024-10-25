import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
