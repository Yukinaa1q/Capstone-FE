import SearchInput from "@/components/Input/SearchInput";
import RecomCoursesLayout from "./RecomCoursesLayout";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/hooks/reduxHook";
import TutorViewAvailableCourse from "./TutorViewAvailableCourse";

const AvailableCourses = () => {
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.auths.role);
  return (
    <main className="px-8 pt-4 w-full">
      {userRole === "student" ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const searchValue = (e.currentTarget[0] as HTMLInputElement)
                .value;
              console.log(searchValue);
              navigate(
                "/courses?" + new URLSearchParams({ q: searchValue }).toString()
              ); // make searchValue compatible with base64Url
            }}
          >
            <SearchInput />
          </form>
          <RecomCoursesLayout title="Upcoming Courses" />
        </>
      ) : (
        <TutorViewAvailableCourse />
      )}
    </main>
  );
};

export default AvailableCourses;
