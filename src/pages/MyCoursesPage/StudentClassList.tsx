import FetchRegisteredApi from "@/api/FetchRegisteredApi";
import ClassCard from "@/components/ClassCard";
import { IClass } from "@/interfaces/IClass";
import React, { useEffect } from "react";
import { Link } from "react-router";

const StudentClassList = () => {
  const [myCoursesList, setMyCoursesList] = React.useState<IClass[]>([]);

  useEffect(() => {
    const getTutorTeachingClasses = async () => {
      const classes =
        await FetchRegisteredApi.getPaidAndDoneClassesFromStudent();
      console.log("Class list from student ", classes);
      setMyCoursesList(classes);
    };

    getTutorTeachingClasses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      {myCoursesList.map((course, index) => (
        <Link
          className="max-w-full cursor-pointer"
          key={index}
          to={
            course.status === "open" || course.status === "payment"
              ? `/classroom/${course.classCode}`
              : "#"
          }
        >
          <ClassCard key={index} classInfo={course} />
        </Link>
      ))}
    </div>
  );
};

export default StudentClassList;
