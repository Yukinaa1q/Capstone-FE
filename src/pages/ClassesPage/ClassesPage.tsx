import { useAppSelector } from "@/hooks/reduxHook";
import AcademicView from "./AcademicView";
import StudentView from "./StudentView";

const ClassesPage = () => {
  const role = useAppSelector((state) => state.auths.role);
  if (role === "academic") {
    return <AcademicView />;
  } else {
    return <StudentView />;
  }
};

export default ClassesPage;
