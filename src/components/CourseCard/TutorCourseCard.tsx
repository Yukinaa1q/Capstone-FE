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

const TutorCourseCard = ({ cardInfo }: { cardInfo: ICourseCard }) => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2 w-full">
        <img
          src={cardInfo.courseImage}
          alt="subject illustation"
          className="aspect-video bg-slate-200 rounded-md object-cover"
        />
        <CardTitle className="flex justify-between items-center gap-4">
          <p className="truncate">{cardInfo.courseTitle.toUpperCase()}</p>
        </CardTitle>
        <CardDescription className="flex justify-between text-xs">
          <p>{cardInfo.courseCode}</p>
        </CardDescription>
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
