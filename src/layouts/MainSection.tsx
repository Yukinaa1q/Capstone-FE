import { useAppSelector } from "@/hooks/reduxHook";
import AvailableCourses from "@/pages/AvailableCoursePage/AvailableCourses";
import { Navigate } from "react-router";

const MainSection = () => {
  const role = useAppSelector((state) => state.auths.role);
  if (role === "academic") {
    // return <CoursesPage />;
    return <Navigate to="/courses" replace={true} />;
  } else if (role === "student" || role === "tutor"){
    return <AvailableCourses />;
  } else if (role === "admin")
    return <Navigate to="/staff/accounts" replace={true} />;
  return <Navigate to="/login" replace={true} />;
};

export default MainSection;
