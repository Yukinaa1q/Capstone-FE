import { createBrowserRouter } from "react-router";

import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/SingupPage/Signup";
import AvailableCourses from "@/pages/AvailableCoursePage/AvailableCourses";
import RegisteredCoursesPage from "@/pages/RegisteredCoursesPage/RegisteredCoursesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <AvailableCourses />
<<<<<<< Updated upstream
=======
      },
      {
        path: "/registered-courses",
        element: <RegisteredCoursesPage/>
>>>>>>> Stashed changes
      }
    ]
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
