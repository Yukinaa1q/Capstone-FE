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
  const phase = useAppSelector((state) => state.phases.phase);
  let courseList = phase === 1 ? availableCourses.coursesP1 : availableCourses.coursesP2;
  return (
    <section className="mt-10 w-full">
      <h3 className="font-semibold text-xl mb-2">{title} Registered Course Count: {availableCourses.registeredCourse.length}</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mx-auto w-[1000px]"
      >
        <CarouselContent>
          {courseList.map((courseContent, index) => (
            <CarouselItem
              key={index}
              className="lg:basis-1/4 scale-90 hover:scale-100 hover:transition-transform transition-transform"
            >
              <CourseCard courseContent={courseContent} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default RecomCoursesLayout;
