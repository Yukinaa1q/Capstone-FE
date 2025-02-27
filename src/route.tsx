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
import RouteGuard from "./layouts/RouteGuard";
import StaffLogin from "./pages/Login/StaffLogin";
import StaffAccountPage from "./pages/StaffAccountPage/StaffAccountPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainSection />,
      },
      {
        path: "/registered-courses",
        element: (
          <RouteGuard>
            <RegisteredCoursesPage />
          </RouteGuard>
        ),
      },
      {
        path: "my-courses",
        element: (
          <RouteGuard>
            <MyCoursesPage />
          </RouteGuard>
        ),
      },
      {
        path: "schedule",
        element: (
          <RouteGuard>
            <SchedulePage />
          </RouteGuard>
        ),
      },
      {
        path: "payment",
        element: (
          <RouteGuard>
            <PaymentPage />
          </RouteGuard>
        ),
      },
      {
        path: "chat",
        element: (
          <RouteGuard>
            <ChatPage />
          </RouteGuard>
        ),
      },
      {
        path: "courses",
        element: (
          <RouteGuard>
            <CoursesPage />
          </RouteGuard>
        ),
      },
      {
        path: "courses/:id",
        element: (
          <RouteGuard>
            <CourseDetail />
          </RouteGuard>
        ),
      },
      {
        path: "courses/:id/edit",
        element: (
          <RouteGuard>
            <EditCoursePage />
          </RouteGuard>
        ),
      },
      {
        path: "courses/new",
        element: (
          <RouteGuard>
            <NewCoursePage />
          </RouteGuard>
        ),
      },
      {
        path: "classes",
        element: (
          <RouteGuard>
            <ClassesPage />
          </RouteGuard>
        ),
      },
      {
        path: "classes/new",
        element: (
          <RouteGuard>
            <NewClassPage />
          </RouteGuard>
        ),
      },
      {
        path: "classes/:id",
        element: (
          <RouteGuard>
            <ClassDetail />
          </RouteGuard>
        ),
      },
      {
        path: "classes/:id/edit",
        element: (
          <RouteGuard>
            <EditClassPage />
          </RouteGuard>
        ),
      },
      {
        path: "tutors",
        element: <TutorsPage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "staff/accounts",
        element: <StaffAccountPage />,
      }
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
  {
    path: "/staff/login",
    element: <StaffLogin />,
  },
]);

export default router;
