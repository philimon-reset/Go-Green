import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root";
import MainLayout from "../layouts/main";
import FourOFour from "../pages/FourOFour";

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
]);

export default router;
