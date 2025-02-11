import { useAppSelector } from "@/hooks/reduxHook";
import AvailableCourses from "@/pages/AvailableCoursePage/AvailableCourses";
import CoursesPage from "@/pages/CoursesPage/CoursesPage";

const MainSection = () => {
  const role = useAppSelector((state) => state.auths.role);
  if (role === "academic") {
    return <CoursesPage />;
  } else {
    return <AvailableCourses />;
  }
};

export default MainSection;
