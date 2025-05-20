import { MoreDetailIcon, RegisterIcon } from "@/assets/icons";
import { ICourseCard } from "@/interfaces/ICourse";
import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import TutorRegistration from "./TutorRegistration";
import { Book, SignalHigh } from "lucide-react";
import { capitalizeFirstLetter, levelToString } from "@/utils/utils";

const TutorCourseCard = ({ cardInfo }: { cardInfo: ICourseCard }) => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 w-full">
        <img
          src={cardInfo.courseImage}
          alt="subject illustation"
          className="bg-slate-200 rounded-md w-full h-40"
        />
        <div className="w-full overflow-hidden">
          <CardTitle className="flex justify-between items-center gap-4 w-full overflow-hidden">
            <p className="truncate">{cardInfo.courseTitle.toUpperCase()}</p>
          </CardTitle>
          <CardDescription className="flex justify-between text-sm">
            <p>{cardInfo.courseCode}</p>
          </CardDescription>
        </div>
        <div>
          <div className="flex gap-2 items-center text-sm">
            <Book size={20} className="stroke-amber-500" />
            <p className="text-amber-500">
              {capitalizeFirstLetter(cardInfo.courseSubject)}
            </p>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <SignalHigh size={20} className="stroke-blue-800" />
            <p className="text-blue-700">
              {levelToString(cardInfo.courseLevel)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="justify-between w-full">
        <Link
          to={`/courses/${cardInfo.courseCode}`}
          type="button"
          className="group flex items-center justify-between px-2 py-2 bg-t_secondary-300 rounded-full overflow-hidden"
        >
          <img src={MoreDetailIcon} alt="detail-icon" className="size-5" />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-11 group-hover:transition-all transition-all">
            Detail
          </p>
        </Link>
        <TutorRegistration courseContent={cardInfo}>
          <button
            type="button"
            className="group flex items-center gap-0 px-2 py-2 bg-green-300 rounded-full overflow-hidden"
          >
            <img src={RegisterIcon} alt="register-icon" className="size-5" />
            <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-16 group-hover:transition-all transition-all">
              Register
            </p>
          </button>
        </TutorRegistration>
      </CardFooter>
    </Card>
  );
};

export default TutorCourseCard;
