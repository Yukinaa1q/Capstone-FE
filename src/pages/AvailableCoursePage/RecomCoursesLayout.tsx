import StudentClassCard from "@/components/CourseCard/StudentClassCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IClassCard } from "@/interfaces/ICourse";
import TucourApi from "@/utils/http";
import { useEffect, useState } from "react";

interface RecomCoursesLayoutProps {
  title: string;
}

const RecomCoursesLayout = ({ title }: RecomCoursesLayoutProps) => {
  const [cards, setCards] = useState<Array<IClassCard>>([])
  useEffect(() => {
    const getRandomCourses = async () => {
      try {
        const randomCourse = (await TucourApi.call(
          `/phase2_register/view-random-unregistered-classes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )) as IClassCard[];
        console.log(randomCourse);
        setCards(randomCourse);
      } catch (error) {
        console.error(error);
      }
    };

    getRandomCourses();
  }, []);

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
          {cards.map((cardContent, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xxl:basis-1/5"
            >
              <StudentClassCard courseContent={cardContent} />
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
