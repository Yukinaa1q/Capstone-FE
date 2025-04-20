import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Login/Login";
import MyCoursesPage from "@/pages/MyCoursesPage/MyCoursesPage";
import RegisteredClassesPage from "@/pages/RegisteredClassesPage/RegisteredClassesPage";
import Signup from "@/pages/SingupPage/Signup";
import { createBrowserRouter } from "react-router";
import MainSection from "./layouts/MainSection";
import RouteGuard from "./layouts/RouteGuard";
import AccountProfilePage from "./pages/AccountPage/AccountProfilePage";
import AccountSettingPage from "./pages/AccountPage/AccountSettingPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import ClassDetail from "./pages/ClassesPage/ClassDetailPage/ClassDetailPage";
import ClassesPage from "./pages/ClassesPage/ClassesPage";
import EditClassPage from "./pages/ClassesPage/EditClassPage/EditClassPage";
import NewClassPage from "./pages/ClassesPage/NewClassPage/NewClassPage";
import ClassroomPage from "./pages/ClassroomPage/ClassroomPage";
import CourseDetail from "./pages/CoursesPage/CourseDetail/CourseDetail";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import EditCoursePage from "./pages/CoursesPage/EditCoursePage/EditCoursePage";
import NewCoursePage from "./pages/CoursesPage/NewCoursePage/NewCoursePage";
import StaffLogin from "./pages/Login/StaffLogin";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import SchedulePage from "./pages/SchedulePage.tsx/SchedulePage";
import StaffAccountPage from "./pages/StaffAccountPage/StaffAccountPage";
import initStaffData from "./pages/StaffAccountPage/StaffAction";
import getStudentInit from "./pages/StudentsPage/StudentPage/StudentLoader";
import StudentPage from "./pages/StudentsPage/StudentPage/StudentPage";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import TutorEdit from "./pages/TutorsPage/Tutor/Edit/TutorEdit";
import getTutorInitContent from "./pages/TutorsPage/Tutor/TutorLoader";
import TutorLayout from "./pages/TutorsPage/Tutor/TutorLayout";
import TutorPage from "./pages/TutorsPage/Tutor/TutorPage";
import TutorsPage from "./pages/TutorsPage/TutorsPage";
import getAllRegisteredClasses from "./pages/RegisteredClassesPage/RegisteredClassesLoader";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import StudentEdit from "./pages/StudentsPage/StudentPage/EditStudent/StudentEditPage";
import ScorePage from "./pages/ScorePage/ScorePage";
import getInCartClassesLoader from "./pages/PaymentPage/paymentLoader";

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
        path: "/registered-classes",
        element: (
          <RouteGuard allowed={["student", "tutor"]}>
            <RegisteredClassesPage />
          </RouteGuard>
        ),
        loader: getAllRegisteredClasses,
      },
      {
        path: "my-classes",
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
        loader: getInCartClassesLoader,
        element: (
          <RouteGuard allowed={["student"]}>
            <PaymentPage />
          </RouteGuard>
        ),
      },
      {
        path: "chat",
        element: (
          <RouteGuard allowed={["student", "tutor"]}>
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
          <RouteGuard allowed={["academic", "student"]}>
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
        path: "rooms",
        element: (
          <RouteGuard allowed={["academic"]}>
            <RoomsPage />
          </RouteGuard>
        ),
      },
      {
        path: "tutors",
        element: (
          <RouteGuard allowed={["academic"]}>
            <TutorsPage />,
          </RouteGuard>
        ),
      },
      {
        path: "tutors/:id",
        element: (
          <RouteGuard allowed={["academic"]}>
            <TutorLayout />
          </RouteGuard>
        ),
        loader: getTutorInitContent,
        id: "tutor",
        children: [
          {
            index: true,
            element: <TutorPage />,
          },
          {
            path: "edit",
            element: <TutorEdit />,
            loader: getTutorInitContent,
          },
        ],
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
        path: "students/:id",
        element: (
          <RouteGuard allowed={["academic"]}>
            <StudentPage />,
          </RouteGuard>
        ),
        loader: getStudentInit,
      },
      {
        path: "students/:id/edit",
        element: <StudentEdit />,
        loader: getStudentInit,
      },
      {
        path: "staff/accounts",
        element: <StaffAccountPage />,
        loader: initStaffData,
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
      {
        path: "timetables",
        element: <TimetablePage />,
      },
      {
        path: "scores",
        element: <ScorePage />,
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
