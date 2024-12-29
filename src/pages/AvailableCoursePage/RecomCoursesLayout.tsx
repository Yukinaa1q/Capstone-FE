import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "@/components/CourseCard";
<<<<<<< Updated upstream
import { ICourse } from "@/interfaces/ICourse";
=======
import { ICourse, ICourseP2 } from "@/interfaces/ICourse";
import { useAppSelector } from "@/hooks/reduxHook";
>>>>>>> Stashed changes

interface RecomCoursesLayoutProps {
  title: string;
  // courseList:
}

const courseList: ICourse[] = [
  {
    courseName: "Course 1",
    courseId: "1",
    price: 100,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 100,
  },
  {
    courseName: "Course 2",
    courseId: "2",
    price: 200,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 200,
  },
  {
    courseName: "Course 3",
    courseId: "3",
    price: 300,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 50,
  },
  {
    courseName: "Course 4",
    courseId: "4",
    price: 300,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 250,
  },
  {
    courseName: "Course 5",
    courseId: "5",
    price: 300,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 250,
  },
  {
    courseName: "Course 6",
    courseId: "6",
    price: 300,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 250,
  },
];

const RecomCoursesLayout = ({ title }: RecomCoursesLayoutProps) => {
  // const [api, setApi] = React.useState<CarouselApi>();
  const availableCourses = useAppSelector(state => state.courses)
  return (
    <section className="mt-10 w-full">
      <h3 className="font-semibold text-xl mb-4">{title}</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mx-auto w-[1000px]"
      >
        <CarouselContent>
<<<<<<< Updated upstream
          {courseList.map((courseContent, index) => (
            <CarouselItem key={index} className="lg:basis-64">
=======
          {availableCourses.coursesP2.map((courseContent, index) => (
            <CarouselItem key={index} className="lg:basis-1/4 scale-90 hover:scale-100 hover:transition-transform transition-transform">
>>>>>>> Stashed changes
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
