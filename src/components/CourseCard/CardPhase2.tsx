import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";

import { ICourseP2 } from "@/interfaces/ICourse";

interface CourseCardProps {
  courseContent: ICourseP2;
}

const CourseCardP2 = ({ courseContent }: CourseCardProps) => {
  return (
    <Card>
      <CardHeader>
        <img src="" alt="" className="aspect-video bg-slate-400 rounded-md" />
        <CardTitle className="">
          {courseContent.courseName.toUpperCase()}
        </CardTitle>
        <CardDescription className="flex justify-between">
          {courseContent.courseId}

          <Badge className="bg-t_primary-500 hover:bg-t_primary-500 text-white">
            Phase 2
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default CourseCardP2;
