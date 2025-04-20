import { IClass } from "@/interfaces/IClass";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ClassroomIcon, TutorIcon } from "@/assets/icons";
import { Badge } from "@/components/ui/badge";

interface ClassCardProps {
  classInfo: IClass;
}

const ClassCard = ({ classInfo }: ClassCardProps) => {
  return (
    <Card className="p-2 md:p-1">
      <CardHeader>
        <img src={classInfo.courseImg} alt="" className="aspect-video bg-slate-200 rounded-sm"/>
        <CardTitle className="mt-2">{classInfo.courseName}</CardTitle>
        <CardDescription>{classInfo.courseCode}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <img src={TutorIcon} alt="tutor-icon" className="size-5"/>
          <p>{classInfo.tutor}</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={ClassroomIcon} alt="tutor-icon" className="size-5"/>
          <Badge className="">{classInfo.class}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
