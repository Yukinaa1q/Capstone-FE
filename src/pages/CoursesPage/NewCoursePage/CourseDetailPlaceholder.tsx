import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseDetailPlaceholder = ({ url }: { url: string }) => {
  return (
    <section
      className="h-96 overflow-y-scroll w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="p-10 text-white w-full bg-transparent">
        <h1 className="text-2xl font-semibold">Calculus 1</h1>
        <h2>MT1002 | 2024 - 2025</h2>
        <div className="grid grid-cols-[240px_auto] mt-4 text-sm">
          <div>Learning Duration</div>
          <div className="font-semibold">23/8/2024 - 23/12/2024</div>
          <div>Pre-registraiton Duration</div>
          <div className="font-semibold">23/8/2024 - 23/12/2024</div>
          <div>Pre-registraiton Number</div>
          <div className="font-semibold">200</div>
        </div>
      </div>
      <section className="p-4 bg-white">
        <CourseInfo title="Course Description">
          <div
            className={
              "relative line-clamp-5 before:absolute before:w-full before:bottom-0 before:h-full before:bg-linear-to-b before:to-white"
            }
          >
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
              labore unde quia officiis maiores sit natus vitae eos. Atque
              aliquid quo neque laudantium quod cupiditate labore, quam hic
              commodi quos. Placeat dicta error quos assumenda voluptates, aut
              autem ea dolores ut? Ab doloremque quas ea voluptatem totam
              impedit quibusdam magni accusamus qui quo debitis illo, minima id
              blanditiis. Similique, minus? Sunt, maiores provident. Obcaecati
              dolor quis ipsum explicabo ipsam! Dignissimos deleniti aliquid
              maiores repellat quod, quaerat, atque veritatis rem similique
              dicta totam provident necessitatibus laborum ut molestiae nisi
              blanditiis natus? Ad nesciunt harum ut quod. Quaerat inventore
              veniam facere illum aliquam animi sit ut, odit, aperiam saepe,
              minima quasi! Ab libero ut commodi dolorem vero adipisci officiis
              error hic fuga! Perferendis repellendus asperiores aspernatur
              officia! Consectetur illum est necessitatibus, odio ullam error
            </p>
          </div>
          <Button
            type="button"
            variant="link"
            className="p-0 text-t_primary-400"
          >
            See More
          </Button>
        </CourseInfo>
        <CourseInfo title="Course Outline">
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Chapter 1: Lorem Ipsum dolomit
              </AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
                sint inventore? Hic optio perspiciatis officiis, ipsam,
                sapiente, ipsum quas officia consectetur voluptatibus magnam
                harum in beatae aspernatur adipisci amet veritatis!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CourseInfo>
      </section>
    </section>
  );
};

const CourseInfo = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
};

export default CourseDetailPlaceholder;
