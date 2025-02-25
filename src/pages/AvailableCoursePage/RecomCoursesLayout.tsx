import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "@/components/CourseCard";
import { ICourseCardP1, ICourseCardP2 } from "@/interfaces/ICourse";
import { useState } from "react";
import { coursesPhase1, coursesPhase2 } from "@/utils/fakeData";

interface RecomCoursesLayoutProps {
  title: string;
  // courseList:
}

const RecomCoursesLayout = ({ title }: RecomCoursesLayoutProps) => {
  const [cards, setCards] =
    useState<Array<ICourseCardP1 | ICourseCardP2>>(coursesPhase1);
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
              <CourseCard courseContent={cardContent} />
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
