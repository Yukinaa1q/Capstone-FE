import SearchInput from "@/components/Input/SearchInput";
import RecomCoursesLayout from "./RecomCoursesLayout";
import { useNavigate } from "react-router";

const AvailableCourses = () => {
  const navigate = useNavigate();
  return (
    <main className="px-8 pt-4 w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const searchValue = (e.currentTarget[0] as HTMLInputElement).value;
          console.log(searchValue);
          navigate(
            "/courses?" + new URLSearchParams({ q: searchValue }).toString()
          ); // make searchValue compatible with base64Url
        }}
      >
        <SearchInput />
      </form>
      <RecomCoursesLayout title="Upcoming Courses" />
      {/* <RecomCoursesLayout title="Upcoming Courses" />
      <RecomCoursesLayout title="Upcoming Courses" /> */}
    </main>
  );
};

export default AvailableCourses;
