import { createBrowserRouter } from "react-router";

import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/SingupPage/Signup";
import AvailableCourses from "@/pages/AvailableCoursePage/AvailableCourses";
import RegisteredCoursesPage from "@/pages/RegisteredCoursesPage/RegisteredCoursesPage";
import MyCoursesPage from "@/pages/MyCoursesPage/MyCoursesPage";
import TestPage from "./pages/TestPage/TestPage";
import SchedulePage from "./pages/SchedulePage.tsx/SchedulePage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ChatPage from "./pages/ChatPage/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AvailableCourses />,
      },
      {
        path: "/registered-courses",
        element: <RegisteredCoursesPage />,
      },
      {
        path: "my-courses",
        element: <MyCoursesPage />,
      },
      {
        path: "schedule",
        element: <SchedulePage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

export default router;
