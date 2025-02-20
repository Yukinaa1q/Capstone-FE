import { PriceIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import toVND from "@/utils/currencyFormat";
import { GraduationCap, Tags, Trash2 } from "lucide-react";

const CoursePayment = () => {
  return (
    <div className="flex gap-4 w-full bg-gray-100/30 p-4">
      <img src="#" alt="" className="aspect-video w-56 bg-slate-100" />
      <div className="flex justify-between w-full">
        <div className="">
          <div className="">
            <h4 className="font-semibold text-lg uppercase ">Course Name</h4>
            <p className="font-medium text-gray-700 text-sm">Course Code</p>
          </div>
          <div className="flex items-center mt-2 gap-2">
            <GraduationCap className=" stroke-gray-700" />
            <p className="text-sm">Tutor Name</p>
          </div>
          <div className="flex items-center mt-4 gap-2">
            <Tags className=" stroke-gray-700" />

            <p className="text-sm font-semibold">{toVND(12500000)}</p>
          </div>
        </div>
        <Button variant="ghost"><Trash2/>Delete</Button>
      </div>
    </div>
  );
};

export default CoursePayment;
