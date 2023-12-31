import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import AddAProject from "../pages/AddAProject";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>
      },
      {
        path: "addAProject",
        element: <AddAProject></AddAProject>
      },
      {
        path: "addAProject",
        element: <AddAProject></AddAProject>
      },
    ],
  },
]);

export default MainRoutes;
