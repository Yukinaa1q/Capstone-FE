import { Button, buttonVariants } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import ClassApi from "@/api/ClassApi";
import HTMLConverter from "@/components/TextEditor/HTMLConverter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/hooks/reduxHook";
import { IClassDetail } from "@/interfaces/ICourseDetail";
import { cn } from "@/lib/utils";
import toVND from "@/utils/currencyFormat";
import TucourApi from "@/utils/http";
import { formatDate, shortName } from "@/utils/utils";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Edit, LoaderCircle, Trash2 } from "lucide-react";

const ClassDetail = () => {
  const params = useParams();
  const user = useAppSelector((state) => state.auths);
  const navigate = useNavigate();
  const [showFull, setShowFull] = useState(false);
  const [course, setCourse] = useState<IClassDetail>();
  const [loadingDelete, setLoadingDelete] = useState(false);
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
        className="text-white bg-fixed relative overflow-y-scroll"
        style={{ height: "calc(100vh - 3.35rem)" }}
      >
        <section
          className="p-10 flex justify-between"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${course?.courseImage}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            // backgroundAttachment: "scroll, local",
          }}
        >
          <div>
            <h1 className="text-2xl font-semibold">{course?.courseTitle}</h1>
            <h2>{course?.courseCode} | 2024 - 2025</h2>
            <div className="grid grid-cols-[240px_auto] mt-4 text-sm">
              <div>Registration Duration</div>
              <div className="font-semibold">
                {formatDate(course?.registrationStartDate)} -{" "}
                {formatDate(course?.registrationEndDate)}
              </div>
              <div>Learning Duration</div>
              <div className="font-semibold">
                {course?.studyStartDate} - {course?.studyEndDate}
              </div>
              <div>Tutor</div>
              <p>{course?.tutor}</p>
            </div>
          </div>
          {user.role === "academic" && course?.status && (
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
                  setLoadingDelete(true);
                  try {
                    const res = await ClassApi.deleteClass(
                      course?.classId ?? ""
                    );
                    if (res) {
                      navigate("/classes");
                    }
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
              <h3 className="text-sm">Study Room</h3>
              <p className="font-semibold text-sm">
                {course?.studyRoom ?? "Cái Nịt"}
              </p>
              <h3 className="text-sm">No. Students</h3>
              <p className="font-semibold text-sm">
                {course?.classStudents ?? 0}/{course?.classMaxStudents}
              </p>
            </div>
            {user.role === "academic" && (
              <ScrollArea
                type="hover"
                className="p-4 border rounded-md h-[280px]"
              >
                {course?.studentList?.map((studentBrief) => (
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
            )}
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

export default ClassDetail;
