import { useAppSelector } from "@/hooks/reduxHook";
import AvailableCourses from "@/pages/AvailableCoursePage/AvailableCourses";
import { Navigate } from "react-router";

const MainSection = () => {
  const role = useAppSelector((state) => state.auths.role);
  if (role === "academic") {
    // return <CoursesPage />;
    return <Navigate to="/courses" replace={true} />;
  } else {
    return <AvailableCourses />;
  }
};

export default MainSection;
