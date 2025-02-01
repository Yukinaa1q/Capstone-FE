import { MoreDetailIcon, RegisterIcon } from "@/assets/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";

import { ICourse, ICourseP1, ICourseP2 } from "@/interfaces/ICourse";
import CourseCardP1 from "./CardPhase1";
import CourseCardP2 from "./CardPhase2";
import { useAppSelector } from "@/hooks/reduxHook";

interface CourseCardProps {
  courseContent: ICourse;
}

const CourseCard = ({ courseContent }: CourseCardProps) => {
  const phase = useAppSelector((state) => state.phases.phase);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 w-full">
        <img
          src=""
          alt=""
          className="aspect-video bg-slate-400 rounded-md object-cover"
        />
        <CardTitle className="flex justify-between items-center gap-4">
          <p className="truncate">{courseContent.courseName.toUpperCase()}</p>
          {phase === 1 ? (
            <Badge className="bg-t_secondary-500 hover:bg-t_secondary-500 text-white text-xs shrink-0 w-fit">
              Phase 1
            </Badge>
          ) : (
            <Badge className="bg-t_primary-500 hover:bg-t_primary-500 text-white text-xs shrink-0 w-fit h-fit">
              Phase 2
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="flex justify-between text-xs">
          <p>{courseContent.courseId}</p>
          
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm w-full">
        {phase === 1 ? (
          <CourseCardP1 courseContent={courseContent as ICourseP1} />
        ) : (
          <CourseCardP2 courseContent={courseContent as ICourseP2} />
        )}
      </CardContent>

      <CardFooter className="justify-between w-full">
        <button
          type="button"
          className="animate-detail-btn flex items-center gap-1 px-2 py-2 bg-t_secondary-300 rounded-full overflow-hidden"
        >
          <img src={MoreDetailIcon} alt="detail-icon" className="size-5" />
          <p className="text-sm font-medium">Detail</p>
        </button>
        <button
          type="button"
          className="animate-register-btn flex items-center gap-1 px-2 py-2 bg-green-400 rounded-full overflow-hidden"
        >
          <img src={RegisterIcon} alt="register-icon" className="size-5" />
          <p className="text-sm font-medium">Register</p>
        </button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
