import { createBrowserRouter } from "react-router";

import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Singup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
