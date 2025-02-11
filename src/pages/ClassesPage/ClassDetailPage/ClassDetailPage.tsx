import { Button, buttonVariants } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { Link, useParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toVND from "@/utils/currencyFormat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Descendant } from "slate";
import { CourseOutline } from "@/components/CourseOutlineInput";

interface IClassDetail {
  courseTitle: string;
  courseCode: string;
  learningDuration: string;
  registrationDuration: string;
  tutor: string;
  tutorId: string;
  courseDescription: Descendant[];
  courseOutline: CourseOutline[];
  coursePrice: number;
  classSession: string;
  classShift: string;
  learningType: string;
  classCode: string;
  classStudents: number;
  classMaxStudents: number;
  studentList: StudentBrief[];
}

interface StudentBrief {
  studentName: string;
  studentId: string;
  avatarLink: string;
}

const ClassDetail = () => {
  const params = useParams();
  const [showFull, setShowFull] = useState(false);
  return (
    <section
      className="text-white bg-fixed"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.pexels.com/photos/5184957/pexels-photo-5184957.jpeg?auto=compress&cs=tinysrgb&w=600')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="p-10 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Calculus 1</h1>
          <h2>MT1002 | 2024 - 2025</h2>
          <div className="grid grid-cols-[240px_auto] mt-4 text-sm">
            <div>Learning Duration</div>
            <div className="font-semibold">23/8/2024 - 23/12/2024</div>
            <div>Registration Duration</div>
            <div className="font-semibold">23/8/2024 - 23/12/2024</div>
            <div>Tutor</div>
            <Link to="" className="font-semibold hover:underline">Tran Van Ba</Link>
          </div>
        </div>
        <div>
          <Link
            to={"/classes/MT1003/edit"}
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-t_primary-600 hover:bg-t_primary-700 w-24"
            )}
          >
            <Edit />
            Edit
          </Link>
          <Button variant="destructive" className="w-24 ml-4">
            <Trash2 />
            Delete
          </Button>
        </div>
      </section>
      <section className="p-10 bg-white text-black flex gap-4">
        <div>
          <CourseInfo title="Course Description">
            <div
              className={`relative ${
                !showFull &&
                "line-clamp-6 before:absolute before:w-full before:bottom-0 before:h-full before:bg-linear-to-b before:to-white"
              }`}
            >
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aperiam labore unde quia officiis maiores sit natus vitae eos.
                Atque aliquid quo neque laudantium quod cupiditate labore, quam
                hic commodi quos. Placeat dicta error quos assumenda voluptates,
                aut autem ea dolores ut? Ab doloremque quas ea voluptatem totam
                impedit quibusdam magni accusamus qui quo debitis illo, minima
                id blanditiis. Similique, minus? Sunt, maiores provident.
                Obcaecati dolor quis ipsum explicabo ipsam! Dignissimos deleniti
                aliquid maiores repellat quod, quaerat, atque veritatis rem
                similique dicta totam provident necessitatibus laborum ut
                molestiae nisi blanditiis natus? Ad nesciunt harum ut quod.
                Quaerat inventore veniam facere illum aliquam animi sit ut,
                odit, aperiam saepe, minima quasi! Ab libero ut commodi dolorem
                vero adipisci officiis error hic fuga! Perferendis repellendus
                asperiores aspernatur officia! Consectetur illum est
                necessitatibus, odio ullam error nobis, provident mollitia
                recusandae, eligendi pariatur magni. Omnis nisi ullam voluptatum
                ipsam nesciunt vero corrupti reiciendis quidem quo. Iste facere
                repudiandae laborum dolore, corporis quod voluptatem aspernatur
                nesciunt nihil tempora quae nostrum dolorem, ipsam deleniti nam
                harum, eaque earum. Sit laboriosam sunt eaque praesentium
                corrupti consequuntur asperiores nemo? Ea vitae eos natus,
                deserunt nesciunt minima voluptate error maiores porro culpa
                aperiam est sunt veniam commodi. Sequi suscipit pariatur
                obcaecati. Nihil, quaerat harum. Exercitationem, temporibus
                amet. Placeat, quis sunt. Voluptate asperiores hic sapiente eum
                nobis vel, rem laboriosam, quae, numquam praesentium excepturi.
                Doloribus iste officiis architecto accusantium ipsum eius
                recusandae autem illum vero ex! Error reiciendis nemo dolorum
                at. Repellat vero ex excepturi sint qui animi quo, beatae
                provident labore adipisci fugit inventore sapiente hic possimus
                nobis totam veritatis nulla blanditiis cum, alias nihil nesciunt
                autem. Ducimus, quia earum. Nesciunt temporibus nisi nostrum
                harum nihil suscipit autem vel alias aut aliquam. Cumque
                accusantium reprehenderit iusto hic officia odio vitae nihil
                amet ex, expedita, accusamus, et atque at sit fugit.
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
        </div>
        <div className="shrink-0 space-y-4">
          <div className="border rounded-lg h-fit p-4">
            <h3 className="text-sm">Price</h3>
            <p className="font-bold text-xl">{toVND(1300000)} </p>
          </div>

          <div className="border rounded-lg h-fit p-4 grid grid-cols-2 gap-y-2 gap-x-4">
            <h3 className="text-sm">Session</h3>
            <p className="font-semibold text-sm">2-4-6</p>
            <h3 className="text-sm">Study Shift</h3>
            <p className="font-semibold text-sm">19h45 - 21h00</p>
            <h3 className="text-sm">Learning Type</h3>
            <p className="font-semibold text-sm">Offline</p>
            <h3 className="text-sm">Class Code</h3>
            <p className="font-semibold text-sm">CC15</p>
            <h3 className="text-sm">No. Students</h3>
            <p className="font-semibold text-sm">30/50</p>
          </div>

          <ScrollArea type="hover" className="p-4 border rounded-md h-[280px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Link
                key={i}
                to=""
                className="flex items-center text-sm gap-2 hover:bg-t_tertiary-100 p-2"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p>Student Name</p>
                  <p>2153718</p>
                </div>
              </Link>
            ))}
          </ScrollArea>
        </div>
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

export default ClassDetail;
