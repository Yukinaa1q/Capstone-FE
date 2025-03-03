import { MoreDetailIcon, PriceIcon, RegisterIcon } from "@/assets/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";

import {
  ICourseCard,
  ICourseCardP1,
  ICourseCardP2,
} from "@/interfaces/ICourse";
import CourseCardP1 from "./CardPhase1";
import CourseCardP2 from "./CardPhase2";
import { useAppSelector } from "@/hooks/reduxHook";
import { JSX, useId } from "react";
import TutorRegistrationButton from "./TutorRegistration";
import StudenRegistration from "./StudenRegistration";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import toVND from "@/utils/currencyFormat";

interface CourseCardProps {
  courseContent: ICourseCard;
}

const UnregisteredCard = ({ courseContent }: CourseCardProps) => {
  const phase = useAppSelector((state) => state.phases.phase);
  const role = useAppSelector((state) => state.auths.role);

  let registrationButton: JSX.Element = <></>;
  if (role === "student") {
    if (phase === 1) {
      registrationButton = (
        <StudenRegistration key={Math.random()} courseInfo={courseContent}>
          <button
            type="button"
            className="group flex items-center gap-0 px-2 py-2 bg-green-300 rounded-full overflow-hidden"
          >
            <img src={RegisterIcon} alt="register-icon" className="size-5" />
            <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-16 group-hover:transition-all transition-all">
              Register
            </p>
          </button>
        </StudenRegistration>
      );
    } else {
      registrationButton = (
        <button
          type="button"
          className="group flex items-center gap-0 px-2 py-2 bg-green-300 rounded-full overflow-hidden"
        >
          <img src={RegisterIcon} alt="register-icon" className="size-5" />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-16 group-hover:transition-all transition-all">
            Register
          </p>
        </button>
      );
    }
  } else if (role === "tutor" && phase === 1) {
    registrationButton = (
      <TutorRegistrationButton
        courseContent={courseContent as ICourseCardP1}
        key={useId()}
      />
    );
  } else throw new Error("Role not found");

  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 w-full">
        <img
          src="#"
          alt="subject illustation"
          className="aspect-video bg-slate-200 rounded-md object-cover"
        />
        <CardTitle className="flex justify-between items-center gap-4">
          <p className="truncate">{courseContent.courseTitle.toUpperCase()}</p>
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
          <p>{courseContent.courseCode}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm w-full">
        {phase === 1 ? (
          <CourseCardP1 courseContent={courseContent as ICourseCardP1} />
        ) : (
          <CourseCardP2 courseContent={courseContent as ICourseCardP2} />
        )}
        <div className="flex items-center gap-2 mt-4 font-semibold text-lg">
          <img src={PriceIcon} alt="price" className="size-5" />
          <p className="text-base">{toVND(courseContent.coursePrice)}</p>
        </div>
      </CardContent>

      <CardFooter className="justify-between w-full">
        <Link
          to={`/courses/${courseContent.courseCode}`}
          className={cn(
            "group flex items-center justify-between px-2 py-2 bg-t_secondary-300 rounded-full overflow-hidden"
          )}
        >
          <img src={MoreDetailIcon} alt="detail-icon" className="size-5" />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-11 group-hover:transition-all transition-all">
            Detail
          </p>
        </Link>
        {registrationButton}
      </CardFooter>
    </Card>
  );
};

export default UnregisteredCard;
