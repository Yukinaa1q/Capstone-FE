import { useAppSelector } from "@/hooks/reduxHook";
import StudentViewAvailableClass from "./StudentViewAvailableClass";
import TutorViewAvailableCourse from "./TutorViewAvailableCourse";

const AvailableCourses = () => {
  const userRole = useAppSelector((state) => state.auths.role);
  return (
    <main className="px-8 pt-4 w-full">
      {userRole === "student" ? (
        <StudentViewAvailableClass />
      ) : (
        <TutorViewAvailableCourse />
      )}
    </main>
  );
};

export default AvailableCourses;
