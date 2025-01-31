import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "@/components/CourseCard";
import { useAppSelector } from "@/hooks/reduxHook";

interface RecomCoursesLayoutProps {
  title: string;
  // courseList:
}

const RecomCoursesLayout = ({ title }: RecomCoursesLayoutProps) => {
  const availableCourses = useAppSelector((state) => state.courses);
  return (
    <section className="mt-4 w-full">
      <h3 className="font-semibold text-xl mb-2 w-fit">{title}</h3>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="w-full">
          {availableCourses.coursesP1.map((courseContent, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xxl:basis-1/5"
            >
              <CourseCard courseContent={courseContent} />
             
            </CarouselItem>
          ))}
          
        </CarouselContent>

        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </section>
  );
};

export default RecomCoursesLayout;
