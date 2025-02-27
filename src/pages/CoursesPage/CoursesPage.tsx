// Self-reminder: Is there any way to change the actor view page without using if else?

import { useAppSelector } from "@/hooks/reduxHook";
import AcademicView from "./AcademicView";
import StudentView from "./StudentView";

const CoursesPage = () => {
  const role = useAppSelector((state) => state.auths.role);
  return role === "academic" || role === "admin" ? <AcademicView /> : <StudentView />;
};

export default CoursesPage;
