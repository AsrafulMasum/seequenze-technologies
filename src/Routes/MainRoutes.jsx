import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import AddAProject from "../pages/AddAProject";
import ProjectDetails from "../pages/ProjectDetails";
import UpdateProject from "../pages/UpdateProject";

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
        path: "projectDetails/:id",
        element: <ProjectDetails></ProjectDetails>
      },
      {
        path: "updateProject/:id",
        element: <UpdateProject></UpdateProject>
      },
    ],
  },
]);

export default MainRoutes;
