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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Descendant } from "slate";
import { CourseOutline } from "@/components/Input/CourseOutlineInput";
import TucourApi from "@/utils/http";
import HTMLConverter from "@/components/TextEditor/HTMLConverter";
import { useAppSelector } from "@/hooks/reduxHook";
import { shortName } from "@/utils/utils";

interface IClassDetail {
  courseTitle: string;
  courseCode: string;
  registrationStartDate: string;
  registrationEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
  tutor: string;
  tutorId: string;
  courseImage: string;
  courseDescription: Descendant[];
  courseOutline: CourseOutline[];
  coursePrice: number;
  classSession: string;
  classShift: string;
  learningType: boolean;
  classCode: string;
  classId: string;
  classStudents: number;
  classMaxStudents: number;
  studentList: StudentBrief[];
}

interface StudentBrief {
  studentName: string;
  studentId: string;
  studentCode: string;
  avatarLink: string;
}

const ClassDetail = () => {
  const params = useParams();
  const user = useAppSelector((state) => state.auths);
  const navigate = useNavigate();
  const [showFull, setShowFull] = useState(false);
  const [course, setCourse] = useState<IClassDetail>();
  useEffect(() => {
    const getClassDetail = async () => {
      try {
        const res = (await TucourApi.call(
          `/class/view-class-detail/${params.id}`,
          {
            method: "GET",
            headers: {
              "Contet-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )) as Omit<IClassDetail, "courseDescription"> & {
          courseDescription: string;
        };
        console.log(res);
        setCourse({
          ...res,
          courseDescription: JSON.parse(res.courseDescription),
        });
      } catch (err) {
        console.log(err);
      }
    };

    getClassDetail();
  }, [params.id]);
  return (
    <section
      className="text-white bg-fixed"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${course?.courseImage}')`,
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
            <div className="font-semibold">{course?.registrationStartDate} - {course?.registrationEndDate}</div>
            <div>Registration Duration</div>
            <div className="font-semibold">{course?.studyStartDate} - {course?.studyEndDate}</div>
            <div>Tutor</div>
            <Link
              to={`/tutors/${course?.tutorId}`}
              className="font-semibold hover:underline"
            >
              {course?.tutor}
            </Link>
          </div>
        </div>
        {user.role === "academic" && (
          <div>
            <Link
              to={`/classes/${course?.classCode}/edit`}
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
                  await TucourApi.call(
                    `/class/delete-class/${course?.classId}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  navigate("/classes");
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <Trash2 />
              Delete
            </Button>
          </div>
        )}
      </section>
      <section className="p-10 bg-white text-black flex gap-4 justify-between">
        <div className="grow">
          <CourseInfo title="Course Description">
            <div
              className={`relative ${
                !showFull &&
                "line-clamp-6 before:absolute before:w-full before:bottom-0 before:h-full before:bg-linear-to-b before:to-white"
              }`}
            >
              <HTMLConverter
                nodeList={course ? course?.courseDescription : []}
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
        <div className="shrink-0 space-y-4">
          <div className="border rounded-lg h-fit p-4">
            <h3 className="text-sm">Price</h3>
            <p className="font-bold text-xl">
              {toVND(course?.coursePrice ?? 0)}{" "}
            </p>
          </div>

          <div className="border rounded-lg h-fit p-4 grid grid-cols-2 gap-y-2 gap-x-4">
            <h3 className="text-sm">Session</h3>
            <p className="font-semibold text-sm">{course?.classSession}</p>
            <h3 className="text-sm">Study Shift</h3>
            <p className="font-semibold text-sm">{course?.classShift}</p>
            <h3 className="text-sm">Learning Type</h3>
            <p className="font-semibold text-sm">
              {course?.learningType ? "Online" : "Offline"}
            </p>
            <h3 className="text-sm">Class Code</h3>
            <p className="font-semibold text-sm">{course?.classCode}</p>
            <h3 className="text-sm">No. Students</h3>
            <p className="font-semibold text-sm">
              {course?.classStudents ?? 0}/{course?.classMaxStudents}
            </p>
          </div>

          <ScrollArea type="hover" className="p-4 border rounded-md h-[280px]">
            {course?.studentList.map((studentBrief) => (
              <Link
                key={studentBrief.studentId}
                to=""
                className="flex items-center text-sm gap-2 hover:bg-t_tertiary-100 p-2"
              >
                <Avatar>
                  <AvatarImage src={studentBrief.avatarLink} />
                  <AvatarFallback>
                    {shortName(studentBrief.studentName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{studentBrief.studentName}</p>
                  <p>{studentBrief.studentCode}</p>
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
