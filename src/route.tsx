import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/SingupPage/Signup";
import RegisteredCoursesPage from "@/pages/RegisteredCoursesPage/RegisteredCoursesPage";
import MyCoursesPage from "@/pages/MyCoursesPage/MyCoursesPage";
import TestPage from "./pages/TestPage/TestPage";
import SchedulePage from "./pages/SchedulePage.tsx/SchedulePage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import ClassesPage from "./pages/ClassesPage/ClassesPage";
import TutorsPage from "./pages/TutorsPage/TutorsPage";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import NewCoursePage from "./pages/CoursesPage/NewCoursePage/NewCoursePage";
import CourseDetail from "./pages/CoursesPage/CourseDetail/CourseDetail";
import MainSection from "./layouts/MainSection";
import EditCoursePage from "./pages/CoursesPage/EditCoursePage/EditCoursePage";
import ClassDetail from "./pages/ClassesPage/ClassDetailPage/ClassDetailPage";
import NewClassPage from "./pages/ClassesPage/NewClassPage/NewClassPage";
import EditClassPage from "./pages/ClassesPage/EditClassPage/EditClassPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element:  <MainSection />,
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
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "courses/:id",
        element: <CourseDetail />,
      },
      {
        path: "courses/:id/edit",
        element: <EditCoursePage />,
      },
      {
        path: "courses/new",
        element: <NewCoursePage />,
      },
      {
        path: "classes",
        element: <ClassesPage />,
      },
      {
        path: "classes/new",
        element: <NewClassPage />,
      },
      {
        path: "classes/:id",
        element: <ClassDetail />,
      },
      {
        path: "classes/:id/edit",
        element: <EditClassPage />,
      },
      {
        path: "tutors",
        element: <TutorsPage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
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
