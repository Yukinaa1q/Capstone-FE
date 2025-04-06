import { MoreDetailIcon, PriceIcon, RegisterIcon } from "@/assets/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import StudentApi from "@/api/StudentApi";
import { IClassCard } from "@/interfaces/ICourse";
import { cn } from "@/lib/utils";
import toVND from "@/utils/currencyFormat";
import { ClipboardPen, GraduationCap, Users } from "lucide-react";
import { Link, useNavigate } from "react-router";

interface CourseCardProps {
  courseContent: IClassCard;
}

const StudentClassCard = ({ courseContent }: CourseCardProps) => {
  const navigate = useNavigate();

  const onRegisterClass = async () => {
    try {
      await StudentApi.registerClass(courseContent.classId);
      navigate(0)
    }
    catch {
      console.log("Register class failed");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 w-full">
        <img
          src={courseContent.courseImage}
          alt="subject illustation"
          className="aspect-video bg-slate-200 rounded-md object-cover"
        />
        <CardTitle className="flex justify-between items-center gap-4">
          <p className="truncate">{courseContent.courseTitle.toUpperCase()}</p>
        </CardTitle>
        <CardDescription className="flex justify-between text-xs">
          <p>{courseContent.courseCode}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full space-y-1">
        <div className="flex gap-2 items-center text-sm">
          <ClipboardPen size={20} className="stroke-gray-500" />
          <div className="flex items-center">
            <p className="p-0.5 bg-t_primary-100 rounded-md">
              {courseContent.registrationStartDate}
            </p>
            <p>&nbsp;-&nbsp;</p>
            <p className="p-0.5 bg-t_tertiary-100 rounded-md">
              {courseContent.registrationEndDate}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center text-sm">
          <GraduationCap size={20} className="stroke-gray-500" />
          <p className="p-0.5 bg-t_secondary-200/80 rounded-md">
            {courseContent.tutor}
          </p>
        </div>
        <div className="flex gap-2 items-center text-sm">
          <Users size={20} className="stroke-gray-500" />
          <p className="p-0.5 bg-t_secondary-400/50 rounded-md">
            {courseContent.currentStudents}/{courseContent.maxStudents}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 font-semibold text-lg">
          <img src={PriceIcon} alt="price" className="size-5" />
          <p className="text-base">{toVND(courseContent.coursePrice)}</p>
        </div>
      </CardContent>

      <CardFooter className="justify-between w-full">
        <Link
          to={`/classes/${courseContent.classCode}`}
          className={cn(
            "group flex items-center justify-between px-2 py-2 bg-t_secondary-300 rounded-full overflow-hidden"
          )}
        >
          <img src={MoreDetailIcon} alt="detail-icon" className="size-5" />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-11 group-hover:transition-all transition-all">
            Detail
          </p>
        </Link>
        <button
          type="button"
          className="group flex items-center gap-0 px-2 py-2 bg-green-300 rounded-full overflow-hidden"
          onClick={onRegisterClass}
        >
          <img src={RegisterIcon} alt="register-icon" className="size-5" />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-16 group-hover:transition-all transition-all">
            Register
          </p>
        </button>
      </CardFooter>
    </Card>
  );
};

export default StudentClassCard;
