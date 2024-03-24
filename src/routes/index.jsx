import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import HomePage from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};

export default RoutesProvider;
