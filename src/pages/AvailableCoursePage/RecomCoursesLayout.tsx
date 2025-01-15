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
  // const [api, setApi] = React.useState<CarouselApi>();
  const availableCourses = useAppSelector((state) => state.courses);
  // const sectionRef = useRef<HTMLElement>(null);
  // const carouselWidth = {width: `${sectionRef.current!.clientWidth - 1}px`}
  return (
    <section className="mt-10">
      <h3 className="font-semibold text-xl mb-2 w-fit">{title}</h3>

      <Carousel
        opts={{
          align: "start",
        }}
        className="max-width-full"
      >
        <CarouselContent>
          {availableCourses.coursesP2.map((courseContent, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
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
