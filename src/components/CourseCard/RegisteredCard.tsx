import FetchRegisteredApi from "@/api/FetchRegisteredApi";
import { MoreDetailIcon, PriceIcon } from "@/assets/icons";
import { useAppSelector } from "@/hooks/reduxHook";
import { IClassCard } from "@/interfaces/ICourse";
import toVND from "@/utils/currencyFormat";
import { ClipboardPen, GraduationCap, Users, X } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const RegisteredCard = ({ cardInfo }: { cardInfo: IClassCard }) => {
  const user = useAppSelector((state) => state.auths);

  const handleUnregister = async () => {
    try {
      await FetchRegisteredApi.deleteStudentRegistration(cardInfo.classId);
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

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
      <CardContent className="w-full space-y-2">
        <div className="flex gap-2 items-center text-sm">
          <ClipboardPen size={20} className="stroke-gray-500" />
          <div className="flex">
            <p className="p-1 bg-t_primary-100 rounded-md">
              {cardInfo.registrationStartDate}
            </p>
            <p>&nbsp;-&nbsp;</p>
            <p className="p-1 bg-t_tertiary-100 rounded-md">
              {cardInfo.registrationEndDate}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center text-sm">
          <GraduationCap size={20} className="stroke-gray-500" />
          <p className="p-1 bg-t_secondary-200/80 rounded-md">
            {cardInfo.tutor}
          </p>
        </div>
        <div className="flex gap-2 items-center text-sm">
          <Users size={20} className="stroke-gray-500" />
          <p className="p-1 bg-t_secondary-400/50 rounded-md">
            {cardInfo.currentStudents}/{cardInfo.maxStudents}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 font-semibold text-lg">
          <img src={PriceIcon} alt="price" className="size-5" />
          <p className="text-base">{toVND(cardInfo.coursePrice)}</p>
        </div>
      </CardContent>

      <CardFooter className="justify-between w-full">
        <Link
          to={`/classes/${cardInfo.classCode}`}
          type="button"
          className="group flex items-center justify-between px-2 py-2 bg-t_secondary-300 rounded-full overflow-hidden"
        >
          <img src={MoreDetailIcon} alt="detail-icon" className="size-5" />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-11 group-hover:transition-all transition-all">
            Detail
          </p>
        </Link>
        {user.role === "student" && (
          <button
            type="button"
            className="group flex items-center gap-0 px-2 py-2 bg-red-300 rounded-full overflow-hidden"
            onClick={handleUnregister}
          >
            <X size={20} strokeWidth={2} />
            <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-12 group-hover:transition-all transition-all">
              Cancel
            </p>
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RegisteredCard;
