import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/main";
import FourOFour from "../pages/FourOFour";
import AuthLayout from "../layouts/auth";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SponsorPage from "../pages/Sponsor"
import ContractsPage from "../pages/Contracts";
import PlantPage from '../pages/Plant'

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
        element: <HomePage />
      },
      {
        path: 'sponsor',
        element: <SponsorPage />
      },
      {
        path: 'contracts',
        element: <ContractsPage />
      },
      {
        path: 'plant',
        element: <PlantPage />
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
