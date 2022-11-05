import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root";
import MainLayout from "../layouts/main";
import FourOFour from "../pages/FourOFour";
import AuthLayout from "../layouts/auth";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "*",
    element: <FourOFour />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Root />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
