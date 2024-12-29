import CourseCard from "@/components/CourseCard";
import { useAppSelector } from "@/hooks/reduxHook";

const RegisteredCoursesPage = () => {
  const registeredCourses = useAppSelector(
    (state) => state.courses.registeredCourse
  );
  return (
    <main className="mx-8 mt-4">
      <h3 className="font-semibold text-xl mb-2">Your Registered Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {registeredCourses.map((course, idx) => (
          <div className="max-w-full">
            <CourseCard key={idx} courseContent={course} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default RegisteredCoursesPage;
