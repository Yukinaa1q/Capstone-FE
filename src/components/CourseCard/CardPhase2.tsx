import {
  ClassMemberIcon,
  PriceIcon,
  StudyTimeIcon,
  TutorIcon,
} from "@/assets/icons";


import { ICourseP2 } from "@/interfaces/ICourse";
import toVND from "@/utils/currencyFormat";

interface CourseCardProps {
  courseContent: ICourseP2;
}

const CourseCardP2 = ({ courseContent }: CourseCardProps) => {
  return (
    <>
      <div className="flex gap-2 items-center w-full">
        <img src={TutorIcon} alt="tutor-icon" className="size-5" />
        <p className="text-sm">{courseContent.tutor}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img src={ClassMemberIcon} alt="class-member-icon" className="size-5" />
        <p>{courseContent.classNumber}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img src={StudyTimeIcon} alt="study-time-icon" className="size-5" />
        <p>{courseContent.studyTime}</p>
      </div>

      <div className="flex items-center gap-2 mt-2 font-semibold">
        <img src={PriceIcon} alt="price" className="size-5" />
        <p className="text-base">{toVND(courseContent.coursePrice)}</p>
      </div>
    </>
  );
};

export default CourseCardP2;
