import { ICourse, ICourseP2, isCourseP1 } from "@/interfaces/ICourse";
import CourseCardP1 from "./CardPhase1";
import CourseCardP2 from "./CardPhase2";

interface CourseCardProps {
  courseContent: ICourse;
}

const CourseCard = ({ courseContent }: CourseCardProps) => {
  return isCourseP1(courseContent) ? (
      <CourseCardP1 courseContent={courseContent}/>
    ) : (
      <CourseCardP2 courseContent={courseContent as ICourseP2}/>
    )
};

export default CourseCard;
