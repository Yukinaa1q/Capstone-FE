import { Button, buttonVariants } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toVND from "@/utils/currencyFormat";
import { Descendant } from "slate";
import { CourseOutline } from "@/components/Input/CourseOutlineInput";
import ICourseBE from "@/interfaces/ICourseBE";
import TucourApi, { StatusError } from "@/utils/http";
import HTMLConverter from "@/components/TextEditor/HTMLConverter";
import { useAppSelector } from "@/hooks/reduxHook";

interface ICourseDetail {
  courseTitle: string;
  courseCode: string;
  learningDuration: string;
  preregistrationDuration: string;
  preregistrationNumber: number;
  courseDescription: Descendant[];
  courseOutline: CourseOutline[];
  coursePrice: number;
  participantNumber: number;
  courseId: string;
  imgUrl: string;
}

const CourseDetail = () => {
  const params = useParams();
  const user = useAppSelector((state) => state.auths);
  const navigate = useNavigate();
  const [showFull, setShowFull] = useState(false);
  const [course, setCourse] = useState<ICourseDetail>();

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = (await TucourApi.call(`/course/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })) as ICourseBE;
        console.log(res);
        const courseDesc = JSON.parse(res.courseDescription) as Descendant[];
        setCourse({
          courseTitle: res.courseTitle,
          courseCode: res.courseCode,
          learningDuration: "23/8/2024 - 23/12/2024",
          preregistrationDuration: "23/8/2024 - 23/12/2024",
          preregistrationNumber: res.participantNumber,
          courseDescription: courseDesc,
          courseOutline: res.courseOutline,
          coursePrice: res.coursePrice,
          participantNumber: res.participantNumber,
          courseId: res.courseId,
          imgUrl: res.courseImage,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, []);

  return (
    <section
      className="text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${course?.imgUrl}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="p-10 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{course?.courseTitle}</h1>
          <h2>{course?.courseCode} | 2024 - 2025</h2>
          <div className="grid grid-cols-[240px_auto] mt-4 text-sm">
            <div>Learning Duration</div>
            <div className="font-semibold">23/8/2024 - 23/12/2024</div>
            <div>Pre-registraiton Duration</div>
            <div className="font-semibold">23/8/2024 - 23/12/2024</div>
            <div>Pre-registraiton Number</div>
            <div className="font-semibold">{course?.participantNumber}</div>
          </div>
        </div>
        {user.role === "academic" && (
          <div>
            <Link
              to={`/courses/${course?.courseCode}/edit`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-t_primary-600 hover:bg-t_primary-700 w-24"
              )}
            >
              <Edit />
              Edit
            </Link>
            <Button
              variant="destructive"
              className="w-24 ml-4"
              onClick={async () => {
                try {
                  const jwtToken = window.localStorage.getItem("token");
                  await TucourApi.call(`/course/delete/${course?.courseId}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: "Bearer " + jwtToken,
                    },
                  });
                  navigate("/courses");
                } catch (err) {
                  const returnState = err as StatusError;
                  console.log(
                    "Error Occur",
                    returnState.statusCode,
                    returnState.errorBody
                  );
                }
              }}
            >
              <Trash2 />
              Delete
            </Button>
          </div>
        )}
      </section>
      <section className="p-10 bg-white text-black flex gap-10 justify-between">
        <div className="grow">
          <CourseInfo title="Course Description">
            <div
              className={`relative ${
                !showFull &&
                "line-clamp-6 before:absolute before:w-full before:bottom-0 before:h-full before:bg-linear-to-b before:to-white"
              }`}
            >
              <HTMLConverter
                nodeList={
                  course?.courseDescription ? course.courseDescription : []
                }
              />
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
              {course?.courseOutline.map((outline, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="uppercase">
                    {outline.sectionTitle}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {course?.courseOutline[index].subsections.map(
                      (subsection, index) => (
                        <div key={index} className="border rounded-md p-4">
                          <h4>{subsection.subsectionTitle}</h4>
                        </div>
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CourseInfo>
        </div>
        <div className="border rounded-lg h-fit p-4 w-48 shrink-0">
          <h3 className="text-sm">Price</h3>
          <p className="font-bold text-xl text-right">
            {toVND(course?.coursePrice ? course.coursePrice : 0)}{" "}
          </p>
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

export default CourseDetail;
