import { ClassMemberIcon, PriceIcon, StudyTimeIcon, TutorIcon } from "@/assets/icons";
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
    <Card className="min-w-72">
      <CardHeader>
        <img src="" alt="" className="aspect-video bg-slate-400 rounded-md" />
        <CardTitle className="mt-1 text-lg">
          {courseContent.courseName.toUpperCase()}
        </CardTitle>
        <CardDescription className="flex justify-between">
          {courseContent.courseId}

          <Badge className="bg-t_primary-500 hover:bg-t_primary-500 text-white">
            Phase 2
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center">
          <img src={TutorIcon} alt="tutor-icon" className="size-5" />
          <p>{courseContent.tutor}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={ClassMemberIcon}
              alt="class-member-icon"
              className="size-5"
            />
            <p>{courseContent.classNumber}</p>
          </div>
          <div className="flex gap-2 items-center">
            <img
              src={StudyTimeIcon}
              alt="study-time-icon"
              className="size-5"
            />
            <p>{courseContent.studyTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 font-semibold text-lg">
          <img src={PriceIcon} alt="price" className="size-5" />
          <p className="text-lg">{toVND(courseContent.price)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          size="sm"
          className="bg-t_tertiary-200 hover:bg-t_tertiary-300 text-black"
        >
          View Detail
        </Button>
        <Button
          size="sm"
          className="bg-green-400 hover:bg-green-500 text-black"
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCardP2;
