import SearchInput from "@/components/SearchInput";
import RecomCoursesLayout from "./RecomCoursesLayout";

const AvailableCourses = () => {
  return (
    <main className="px-8 pt-4 w-full">
      <SearchInput />
      <RecomCoursesLayout title="Upcoming Courses"/>
    </main>
  );
};

export default AvailableCourses;
