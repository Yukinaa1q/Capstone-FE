import CourseCard from "@/components/CourseCard"
import { useAppSelector } from "@/hooks/reduxHook"

const RegisteredCoursesPage = () => {
  const registeredCourses = useAppSelector(state => state.courses.registeredCourse)
  return (
    <main className="mx-8 mt-4">
      <h3 className="font-semibold text-xl mb-2">Your Registered Courses</h3>
      <div className="flex flex-wrap justify-between gap-4">
        {
          registeredCourses.map((course, idx) => (
            <CourseCard key={idx} courseContent={course}/>
          ))  
        }
      </div>
    </main>
  )
}

export default RegisteredCoursesPage