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
  console.log("ClassCard", classInfo);
  return (
    <Card className="">
      <CardHeader>
        <img
          src={classInfo.courseImg}
          alt=""
          className="w-full bg-slate-200 rounded-sm aspect-video object-cover"
        />
        <CardTitle className="mt-2">{classInfo.courseName}</CardTitle>
        <CardDescription>{classInfo.courseCode}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <img src={TutorIcon} alt="tutor-icon" className="size-5" />
          <p>{classInfo.tutor}</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={ClassroomIcon} alt="tutor-icon" className="size-5" />
          <Badge className="">
            {classInfo.classUrl === "None" ? (
              classInfo.class
            ) : (
              <a
                href={classInfo.classUrl}
              >
                Online Link
              </a>
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
