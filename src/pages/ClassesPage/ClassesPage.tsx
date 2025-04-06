import { useAppSelector } from "@/hooks/reduxHook";
import AcademicView from "./AcademicView";
import StudentView from "./StudentView";
// import StudentView from "./StudentView";

const ClassesPage = () => {
  const role = useAppSelector((state) => state.auths.role);
  if (role === "academic" || role === "admin") {
    return <AcademicView />;
  } else if (role === "student") {
    return <StudentView />;
  }
};

export default ClassesPage;
