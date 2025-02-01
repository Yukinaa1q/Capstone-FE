import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { useParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseDetail = () => {
  const params = useParams();
  console.log(params);
  const [showFull, setShowFull] = useState(false);
  return (
    <>
      <section
        className="p-10 text-white bg-fixed"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.pexels.com/photos/5184957/pexels-photo-5184957.jpeg?auto=compress&cs=tinysrgb&w=600')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
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
      </section>
      <section className="p-4">
        <CourseInfo title="Course Description">
          <div
            className={`relative ${
              !showFull &&
              "line-clamp-5 before:absolute before:w-full before:bottom-0 before:h-full before:bg-linear-to-b before:to-white"
            }`}
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
              nobis, provident mollitia recusandae, eligendi pariatur magni.
              Omnis nisi ullam voluptatum ipsam nesciunt vero corrupti
              reiciendis quidem quo. Iste facere repudiandae laborum dolore,
              corporis quod voluptatem aspernatur nesciunt nihil tempora quae
              nostrum dolorem, ipsam deleniti nam harum, eaque earum. Sit
              laboriosam sunt eaque praesentium corrupti consequuntur asperiores
              nemo? Ea vitae eos natus, deserunt nesciunt minima voluptate error
              maiores porro culpa aperiam est sunt veniam commodi. Sequi
              suscipit pariatur obcaecati. Nihil, quaerat harum. Exercitationem,
              temporibus amet. Placeat, quis sunt. Voluptate asperiores hic
              sapiente eum nobis vel, rem laboriosam, quae, numquam praesentium
              excepturi. Doloribus iste officiis architecto accusantium ipsum
              eius recusandae autem illum vero ex! Error reiciendis nemo dolorum
              at. Repellat vero ex excepturi sint qui animi quo, beatae
              provident labore adipisci fugit inventore sapiente hic possimus
              nobis totam veritatis nulla blanditiis cum, alias nihil nesciunt
              autem. Ducimus, quia earum. Nesciunt temporibus nisi nostrum harum
              nihil suscipit autem vel alias aut aliquam. Cumque accusantium
              reprehenderit iusto hic officia odio vitae nihil amet ex,
              expedita, accusamus, et atque at sit fugit.
            </p>
          </div>
          <Button
            variant="link"
            className="p-0 text-t_primary-400"
            onClick={() => setShowFull((old) => !old)}
          >
            {!showFull ? "See More" : "See Less"}
          </Button>
        </CourseInfo>
        <CourseInfo title="Course Outline">
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CourseInfo>
      </section>
    </>
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

export default CourseDetail;
