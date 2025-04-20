import FetchRegisteredApi from "@/api/FetchRegisteredApi";
import { Button } from "@/components/ui/button";
import { IClassCard } from "@/interfaces/ICourse";
import toVND from "@/utils/currencyFormat";
import { GraduationCap, KeyRound, Tags, Trash2 } from "lucide-react";

const CoursePayment = ({ item }: { item: IClassCard }) => {
  const handleUnregisterClass = async () => {
    const res = await FetchRegisteredApi.deleteStudentRegistration(
      item.classId
    );
    if (res) {
      window.location.reload();
    }
  };
  return (
    <div className="flex gap-4 w-full bg-gray-100/30 p-4">
      <img
        src={item.courseImage}
        alt=""
        className="aspect-video w-56 bg-slate-100"
      />
      <div className="flex justify-between w-full">
        <div className="">
          <div className="">
            <h4 className="font-semibold text-lg uppercase ">
              {item.courseTitle}
            </h4>
            <p className="font-medium text-gray-700 text-sm">
              {item.courseCode}
            </p>
          </div>
          {/* <div className="flex items-center mt-2 gap-2">
            <KeyRound size={20} className=" stroke-gray-700" />
            <p className="text-sm">{item.classCode}</p>
          </div> */}
          <div className="flex items-center mt-2 gap-2">
            <GraduationCap size={20} className=" stroke-gray-700" />
            <p className="text-sm">{item.tutor}</p>
          </div>
          <div className="flex items-center mt-4 gap-2">
            <Tags className=" stroke-gray-700" />

            <p className="font-semibold">{toVND(item.coursePrice)}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={handleUnregisterClass}>
          <Trash2 />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CoursePayment;
