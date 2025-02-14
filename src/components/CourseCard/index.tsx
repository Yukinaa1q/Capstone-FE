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
import { JSX, useState } from "react";
import { X } from "lucide-react";
import TutorRegistrationButton from "./TutorRegistration";


interface CourseCardProps {
  courseContent: ICourse;
}

const CourseCard = ({ courseContent }: CourseCardProps) => {
  const phase = useAppSelector((state) => state.phases.phase);
  const role = useAppSelector((state) => state.auths.role);
  const [isRegistered, setIsRegistered] = useState(false);

  let registrationButton: JSX.Element;
  if (role === "student") {
    registrationButton = (
      <button
        type="button"
        onClick={() => setIsRegistered((oldState) => !oldState)}
        className="group flex items-center gap-0 px-2 py-2 bg-green-300 rounded-full overflow-hidden"
      >
        <img src={RegisterIcon} alt="register-icon" className="size-5" />
        <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-16 group-hover:transition-all transition-all">
          Register
        </p>
      </button>
    );
  } else if (role === "tutor") {
    registrationButton = <TutorRegistrationButton courseContent={courseContent as ICourseP1}/>;
  } else throw new Error("Role not found");

  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 w-full">
        <img
          src="#"
          alt="subject illustation"
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
          className="group flex items-center justify-between px-2 py-2 bg-t_secondary-300 rounded-full overflow-hidden"
        >
          <img src={MoreDetailIcon} alt="detail-icon" className="size-5" />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-11 group-hover:transition-all transition-all">
            Detail
          </p>
        </button>
        {isRegistered ? (
          <button
            type="button"
            onClick={() => setIsRegistered((oldState) => !oldState)}
            className="group flex items-center gap-0 px-2 py-2 bg-red-300 rounded-full overflow-hidden"
          >
            <X size={20} strokeWidth={2} />
            <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-12 group-hover:transition-all transition-all">
              Cancel
            </p>
          </button>
        ) : (
          registrationButton
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
