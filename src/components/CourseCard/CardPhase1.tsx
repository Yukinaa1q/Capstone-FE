import {
  PriceIcon,
  RegistrationDateIcon,
  RegistrationTotalIcon,
} from "@/assets/icons";

import { ICourseP1 } from "@/interfaces/ICourse";
import toVND from "@/utils/currencyFormat";

interface CourseCardProps {
  courseContent: ICourseP1;
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
      <div className="flex items-center gap-2 mt-4 font-semibold text-lg">
        <img src={PriceIcon} alt="price" className="size-5" />
        <p className="text-base">{toVND(courseContent.price)}</p>
      </div>
    </>
  );
};

export default CourseCardP1;
