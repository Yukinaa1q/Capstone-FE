import SearchInput from "@/components/SearchInput";
import RecomCoursesLayout from "./RecomCoursesLayout";

const AvailableCourses = () => {
  return (
    <main className="mx-8 mt-4">
      <SearchInput />
      <RecomCoursesLayout title="Upcoming Courses"/>
      <RecomCoursesLayout title="Registered Courses"/>
      <RecomCoursesLayout title="A01 Courses"/>
      {/* <RecomCoursesLayout title="Previously Registered Courses"/> */}
    </main>
  );
};

export default AvailableCourses;
