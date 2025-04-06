import SearchInput from "@/components/Input/SearchInput";
import { useNavigate } from "react-router";
import RecomCoursesLayout from "./RecomCoursesLayout";

const StudentViewAvailableClass = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const searchValue = (e.currentTarget[0] as HTMLInputElement).value;
          console.log(searchValue);
          navigate(
            "/classes?" + new URLSearchParams({ q: searchValue }).toString()
          ); // make searchValue compatible with base64Url
        }}
      >
        <SearchInput />
      </form>
      <RecomCoursesLayout title="Upcoming Courses" />
    </div>
  );
};

export default StudentViewAvailableClass;
