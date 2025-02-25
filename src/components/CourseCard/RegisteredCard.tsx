import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/hooks/reduxHook";
import {
  ICourseCardP1,
  ICourseCardP2,
} from "@/interfaces/ICourse";
import CourseCardP1 from "./CardPhase1";
import CourseCardP2 from "./CardPhase2";
import { Info, X } from "lucide-react";
import { MoreDetailIcon, PriceIcon } from "@/assets/icons";
import toVND from "@/utils/currencyFormat";
import IRegisteredCard from "@/interfaces/IRegisteredCard";



const RegisteredCard = ({ courseContent }: { courseContent: IRegisteredCard }) => {
  const course = courseContent.courseContent;
  const phase = useAppSelector((state) => state.phases.phase);
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 w-full">
        <img
          src="#"
          alt="subject illustation"
          className="aspect-video bg-slate-200 rounded-md object-cover"
        />
        <CardTitle className="flex justify-between items-center gap-4">
          <p className="truncate">{course.courseTitle.toUpperCase()}</p>
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
          <p>{course.courseCode}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm w-full">
        {phase === 1 ? (
          <CourseCardP1 courseContent={course as ICourseCardP1} />
        ) : (
          <CourseCardP2 courseContent={course as ICourseCardP2} />
        )}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2 font-semibold">
            <img src={PriceIcon} alt="price" className="size-5" />
            <p className="text-base">{toVND(course.coursePrice)}</p>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="stroke-blue-700"/>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-100/10 border border-t_primary-700/20 text-black backdrop-blur-2xl">
                <h4 className="text-base font-semibold">Your Registration Information</h4>
                <div className="grid grid-cols-2 gap-2 gap-x-4 mt-4">
                  <p className="text-sm">Course Name</p>
                  <p className="text-sm font-medium">{course.courseTitle}</p>
                  <p className="text-sm ">Course Code</p>
                  <p className="text-sm font-medium">{course.courseCode}</p>
                  <p className="text-sm">Desire learning type</p>
                  <p className="text-sm font-medium">{courseContent.isOnline ? "Online" : "Offline"}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
        <button
          type="button"
          className="group flex items-center gap-0 px-2 py-2 bg-red-300 rounded-full overflow-hidden"
        >
          <X size={20} strokeWidth={2} />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-12 group-hover:transition-all transition-all">
            Cancel
          </p>
        </button>
      </CardFooter>
    </Card>
  );
};

export default RegisteredCard;
