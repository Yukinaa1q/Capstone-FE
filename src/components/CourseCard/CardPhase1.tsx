import { PriceIcon, RegistrationDateIcon, RegistrationTotalIcon } from "@/assets/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";

import { ICourseP1 } from "@/interfaces/ICourse";
import { Button } from "../ui/button";
import toVND from "@/utils/currencyFormat";

interface CourseCardProps {
  courseContent: ICourseP1;
}

const CourseCardP1 = ({ courseContent }: CourseCardProps) => {
  return (
    <Card className="w-72">
      <CardHeader>
        <img src="" alt="" className="aspect-video bg-slate-400 rounded-md" />
        <CardTitle className="mt-1 text-lg">
          {courseContent.courseName.toUpperCase()}
        </CardTitle>
        <CardDescription className="flex justify-between">
          {courseContent.courseId}
          <Badge className="bg-t_primary-300 text-black hover:bg-t_primary-300">
            Phase 1
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center">
          <img src={RegistrationDateIcon} alt="registration-deadline" className="size-5"/>
          <p>{courseContent.registrationDate}</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src={RegistrationTotalIcon} alt="registration-total" className="size-5"/>
          <p>{courseContent.totalRegistration}</p>
        </div>
        <div className="flex items-center gap-2 mt-4 font-semibold text-lg">
          <img src={PriceIcon} alt="price" className="size-5"/>
          <p className="text-lg">{toVND(courseContent.price)}</p>
        </div>

      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button size="sm" className="bg-t_tertiary-200 hover:bg-t_tertiary-300 text-black">View Detail</Button>
        <Button size="sm" className="bg-green-400 hover:bg-green-500 text-black">Pre-register</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCardP1;
