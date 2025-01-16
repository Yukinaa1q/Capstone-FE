import CourseCard from "@/components/CourseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppSelector } from "@/hooks/reduxHook";

const TestPage = () => {
  const courseList = useAppSelector((state) => state.courses.coursesP2);
  return (
    <div className="m-10">
      <h1>This is test page</h1>
      <Carousel>
        <CarouselContent>
          {courseList.map((course, index) => (
            <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4" key={index}>
              <CourseCard courseContent={course} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TestPage;
