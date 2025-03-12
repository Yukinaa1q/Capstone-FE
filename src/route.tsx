import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/SingupPage/Signup";
import RegisteredCoursesPage from "@/pages/RegisteredCoursesPage/RegisteredCoursesPage";
import MyCoursesPage from "@/pages/MyCoursesPage/MyCoursesPage";
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
import AccountSettingPage from "./pages/AccountPage/AccountSettingPage";
import AccountProfilePage from "./pages/AccountPage/AccountProfilePage";
import ClassroomPage from "./pages/ClassroomPage/ClassroomPage";
import TutorPage from "./pages/TutorsPage/Tutor/TutorPage";

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
          <RouteGuard allowed={["student", "tutor"]}>
            <RegisteredCoursesPage />
          </RouteGuard>
        ),
      },
      {
        path: "my-courses",
        element: (
          <RouteGuard allowed={["student", "tutor"]}>
            <MyCoursesPage />
          </RouteGuard>
        ),
      },
      {
        path: "schedule",
        element: (
          <RouteGuard allowed={["student", "tutor"]}>
            <SchedulePage />
          </RouteGuard>
        ),
      },
      {
        path: "payment",
        element: (
          <RouteGuard allowed={["student"]}>
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
          <RouteGuard allowed={["academic", "tutor", "student"]}>
            <CoursesPage />
          </RouteGuard>
        ),
      },
      {
        path: "courses/:id",
        element: (
          <RouteGuard allowed={["academic", "tutor", "student"]}>
            <CourseDetail />
          </RouteGuard>
        ),
      },
      {
        path: "courses/:id/edit",
        element: (
          <RouteGuard allowed={["academic"]}>
            <EditCoursePage />
          </RouteGuard>
        ),
      },
      {
        path: "courses/new",
        element: (
          <RouteGuard allowed={["academic"]}>
            <NewCoursePage />
          </RouteGuard>
        ),
      },
      {
        path: "classes",
        element: (
          <RouteGuard allowed={["academic"]}>
            <ClassesPage />
          </RouteGuard>
        ),
      },
      {
        path: "classes/new",
        element: (
          <RouteGuard allowed={["academic"]}>
            <NewClassPage />
          </RouteGuard>
        ),
      },
      {
        path: "classes/:id",
        element: (
          <RouteGuard allowed={["academic", "tutor", "student"]}>
            <ClassDetail />
          </RouteGuard>
        ),
      },
      {
        path: "classes/:id/edit",
        element: (
          <RouteGuard allowed={["academic"]}>
            <EditClassPage />
          </RouteGuard>
        ),
      },
      {
        path: "tutors",
        element: (
          <RouteGuard allowed={["academic"]}>
            <TutorsPage />,
          </RouteGuard>
        )
      },
      {
        path: "tutor/:id",
        element: (
          <RouteGuard allowed={["academic"]}>
            <TutorPage />
          </RouteGuard>
        )
      },
      {
        path: "students",
        element: (
          <RouteGuard allowed={["academic"]}>
            <StudentsPage />,
          </RouteGuard>
        ),
      },
      {
        path: "staff/accounts",
        element: <StaffAccountPage />,
      },
      {
        path: "user",
        children: [
          {
            path: "account",
            element: <AccountSettingPage />,
          },
          {
            path: "profile",
            element: <AccountProfilePage />,
          },
          {
            path: "time-table",
            element: <div>Time Table Page</div>,
          },
        ],
      },
      {
        path: "classroom/:classId",
        element: <ClassroomPage />,
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
    path: "/staff/login",
    element: <StaffLogin />,
  },
]);

export default router;
