import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "@/components/CourseCard";
import { ICourse } from "@/interfaces/ICourse";

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
          {courseList.map((courseContent, index) => (
            <CarouselItem key={index} className="lg:basis-64">
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
