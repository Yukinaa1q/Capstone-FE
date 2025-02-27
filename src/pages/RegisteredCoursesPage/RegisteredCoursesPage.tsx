import RegisteredCard from "@/components/CourseCard/RegisteredCard";
import { useAppSelector } from "@/hooks/reduxHook";
import IRegisteredCard from "@/interfaces/IRegisteredCard";
import { coursesPhase1, coursesPhase2 } from "@/utils/fakeData";


const RegisteredCoursesPage = () => {
  const phase = useAppSelector((state) => state.phases.phase);
  const myRegisteredCourses: IRegisteredCard[] = (phase === 1 ? coursesPhase1 : coursesPhase2).map(course => ({
    ...course, 
    isOnline: Math.random() > 0.5,
  }));
  return (
    <main className="mx-8 mt-4">
      <h3 className="font-semibold text-xl mb-2">Your Registered Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {myRegisteredCourses.map(course => (
          <RegisteredCard key={course.courseCode} cardInfo={course}/>
        ))}
      </div>
    </main>
  );
};

export default RegisteredCoursesPage;
