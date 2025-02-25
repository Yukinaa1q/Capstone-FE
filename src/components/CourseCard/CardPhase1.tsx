import { RegistrationDateIcon, RegistrationTotalIcon } from "@/assets/icons";

import { ICourseCardP1 } from "@/interfaces/ICourse";

interface CourseCardProps {
  courseContent: ICourseCardP1;
}

const CourseCardP1 = ({ courseContent }: CourseCardProps) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <img
          src={RegistrationDateIcon}
          alt="registration-deadline"
          className="size-4"
        />
        <p>{courseContent.registrationDate}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          src={RegistrationTotalIcon}
          alt="registration-total"
          className="size-4"
        />
        <p>{courseContent.totalRegistration}</p>
      </div>
    </>
  );
};

export default CourseCardP1;
