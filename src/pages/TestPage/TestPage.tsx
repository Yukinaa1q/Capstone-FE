import CourseCard from "@/components/CourseCard/UnregisterCard";
import PriceInput from "@/components/PriceInput";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppSelector } from "@/hooks/reduxHook";
import { GraduationCapIcon } from "lucide-react";

const TestPage = () => {
  return (
    <div className="m-10">
      <PriceInput name="price" onChange={(e) => console.log("Change value")} />
    </div>
  );
};

export default TestPage;
