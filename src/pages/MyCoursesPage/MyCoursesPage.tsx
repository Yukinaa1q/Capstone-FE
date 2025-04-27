import { useAppSelector } from "@/hooks/reduxHook";
import StudentClassList from "./StudentClassList";
import TutorClassList from "./TutorClassList";

const MyCoursesPage = () => {
  const user = useAppSelector((state) => state.auths);
  return (
    <main className="px-8 pt-4">
      <div className="flex items-center gap-4">
        <h3 className="font-semibold text-xl">Your Classes</h3>
      </div>
      {user.role === "student" && <StudentClassList />}
      {user.role === "tutor" && <TutorClassList />}
    </main>
  );
};

export default MyCoursesPage;
