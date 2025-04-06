import RegisteredCard from "@/components/CourseCard/RegisteredCard";
import { IClassCard } from "@/interfaces/ICourse";
import { useState } from "react";


const RegisteredClassesPage = () => {
  const [myRegisteredCourses, setMyRegisteredCourses] = useState<IClassCard[]>([]); 

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

export default RegisteredClassesPage;
