import { Button, buttonVariants } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import HTMLConverter from "@/components/TextEditor/HTMLConverter";
import { useAppSelector } from "@/hooks/reduxHook";
import ICourseBE from "@/interfaces/ICourseBE";
import { cn } from "@/lib/utils";
import toVND from "@/utils/currencyFormat";
import TucourApi, { StatusError } from "@/utils/http";
import { capitalizeFirstLetter, levelToString } from "@/utils/utils";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Edit, LoaderCircle, Trash2 } from "lucide-react";
import { Descendant } from "slate";

interface ICourseDetail {
  courseTitle: string;
  courseCode: string;
  learningDuration: number;
  courseSubject: string;
  courseLevel: string;
  courseDescription: Descendant[];
  courseOutline: string;
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
  const currentYear = new Date().getFullYear();
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = (await TucourApi.call(`/course/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })) as ICourseBE;

        const courseDesc = JSON.parse(res.courseDescription) as Descendant[];
        setCourse({
          courseTitle: res.courseTitle,
          courseCode: res.courseCode,
          learningDuration: res.duration,
          courseDescription: courseDesc,
          courseOutline: res.courseOutline as string,
          coursePrice: res.coursePrice,
          participantNumber: res.totalStudentNumber,
          courseId: res.courseId,
          imgUrl: res.courseImage,
          courseLevel: res.courseLevel,
          courseSubject: res.courseSubject,
        });
        console.log("Course", res);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, [params.id]);

  return (
    <div className="relative h-[calc(100vh - 3.35rem)]">
      {loadingDelete && (
        <div className="absolute bg-gray-300/50 left-0 right-0 h-full z-50">
          <LoaderCircle
            size={80}
            className="animate-spin stroke-t_primary-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}
      <section
        className="text-white relative overflow-y-scroll"
        style={{ height: "calc(100vh - 3.35rem)" }}
      >
        <section
          className="p-10 flex justify-between bg-transparent"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${course?.imgUrl}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <h1 className="text-2xl font-semibold">{course?.courseTitle}</h1>
            <h2>
              {course?.courseCode} | {currentYear} - {currentYear + 1}
            </h2>
            <div className="grid grid-cols-[160px_auto] mt-4 text-sm">
              <div>Learning Duration</div>
              <div className="font-semibold">
                {course?.learningDuration}{" "}
                {course?.learningDuration && course?.learningDuration > 1
                  ? "months"
                  : "month"}
              </div>
              <div>Subject</div>
              <div className="font-semibold">
                {capitalizeFirstLetter(course?.courseSubject ?? "")}
              </div>
              <div>Difficulty</div>
              <div className="font-semibold">
                {levelToString(course?.courseLevel ?? "")}
              </div>
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
                  setLoadingDelete(true);
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
        <section className="p-10 text-black flex gap-10 justify-between">
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
            {course?.courseOutline && (
              <CourseInfo title="Course Outline">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <div className="w-full h-[800px] mt-4">
                    <Viewer fileUrl={course.courseOutline}></Viewer>
                  </div>
                </Worker>
              </CourseInfo>
            )}
          </div>
          <div className="border rounded-lg h-fit p-4 w-48 shrink-0">
            <h3 className="text-sm">Price</h3>
            <p className="font-bold text-xl text-right">
              {toVND(course?.coursePrice ? course.coursePrice : 0)}{" "}
            </p>
          </div>
        </section>
      </section>
    </div>
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
