import {
  ClassMemberIcon,
  MoreDetailIcon,
  PriceIcon,
  RegisterIcon,
  StudyTimeIcon,
  TutorIcon,
} from "@/assets/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";

import { ICourseP2 } from "@/interfaces/ICourse";
import toVND from "@/utils/currencyFormat";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  courseContent: ICourseP2;
}

const CourseCardP2 = ({ courseContent }: CourseCardProps) => {
  return (
    <Card className="">
      <CardHeader className="space-y-2">
        <img src="" alt="" className="aspect-video bg-slate-400 rounded-md" />
        <CardTitle className="truncate">
          {courseContent.courseName.toUpperCase()}
        </CardTitle>
        <CardDescription className="flex justify-between text-xs">
          <p>{courseContent.courseId}</p>

          <Badge className="bg-t_primary-500 hover:bg-t_primary-500 text-white text-xs">
            Phase 2
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm ">
        <div className="flex gap-2 items-center">
          <img src={TutorIcon} alt="tutor-icon" className="size-4" />
          <p className="text-sm">{courseContent.tutor}</p>
        </div>

        <div className="flex gap-2 items-center">
          <img
            src={ClassMemberIcon}
            alt="class-member-icon"
            className="size-5"
          />
          <p>{courseContent.classNumber}</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src={StudyTimeIcon} alt="study-time-icon" className="size-4" />
          <p>{courseContent.studyTime}</p>
        </div>

        <div className="flex items-center gap-2 mt-2 font-semibold">
          <img src={PriceIcon} alt="price" className="size-4" />
          <p className="text-base">{toVND(courseContent.price)}</p>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        {// Don't know why but adding padding to button make the width of CardFooter increase? 
        }
        <button type="button" className="animate-detail-btn flex items-center gap-1 px-2 py-2 bg-t_secondary-300 rounded-full overflow-hidden">
          <img src={MoreDetailIcon} alt="detail-icon" className="size-5" />
          <p className="text-sm font-medium">Detail</p>
        </button>
        <button type="button" className="animate-register-btn flex items-center gap-1 px-2 py-2 bg-green-400 rounded-full overflow-hidden">
          <img src={RegisterIcon} alt="register-icon" className="size-5" />
          <p className="text-sm font-medium">Register</p>
        </button>
      </CardFooter>
    </Card>
  );
};

export default CourseCardP2;
