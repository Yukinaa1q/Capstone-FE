import { ClassMemberIcon, StudyTimeIcon, TutorIcon } from "@/assets/icons";

import { ICourseCardP2 } from "@/interfaces/ICourse";

interface CourseCardProps {
  courseContent: ICourseCardP2;
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
        <p>
          {courseContent.currentStudents}/{courseContent.maxStudents}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <img src={StudyTimeIcon} alt="study-time-icon" className="size-5" />
        <p>
          {courseContent.studyWeek} | {courseContent.studyShift}
        </p>
      </div>
    </>
  );
};

export default CourseCardP2;
