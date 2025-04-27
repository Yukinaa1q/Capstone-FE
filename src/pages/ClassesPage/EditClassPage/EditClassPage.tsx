import { Button, buttonVariants } from "@/components/ui/button";
import ClassForm, { IClassForm } from "../ClassForm";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import TucourApi from "@/utils/http";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseOutline } from "@/components/Input/CourseOutlineInput";
import { StudyShift, StudyWeek } from "@/interfaces/common";

interface ViewClassDetailDTO {
  courseTitle: string;

  courseCode: string;

  learningDuration: string;

  registrationDuration: string;

  tutor: string;

  courseDescription: string;

  courseOutline: CourseOutline[];

  coursePrice: number;

  classSession: StudyWeek;

  classShift: StudyShift;

  learningType: boolean;

  classCode: string;

  classStudents: number;

  classMaxStudents: number;

  tutorId: string;

  classId: string;

  studentList?: {
    studentName: string;

    studentId: string;

    avatarLink?: string;
  }[];
}

const EditClassPage = () => {
  const params = useParams();
  const [classDetail, setClassDetail] = useState<IClassForm | undefined>(
    undefined
  );

  const [classId, setClassId] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
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
        )) as ViewClassDetailDTO;
        setClassId(res.classId);
        setClassDetail({
          courseTitle: res.courseTitle,
          courseCode: res.courseCode,
          maxStudents: res.classMaxStudents,
          isOnline: res.learningType,
          studentIdList: res.studentList?.map((student) => student.studentId) ?? [],
          studyShift: res.classShift,
          studyWeek: res.classSession,
          tutorCode: res.tutorId,
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getClassDetail();
  }, []);

  const onSubmit = async (data: IClassForm) => {
    try {
      await TucourApi.call(`/class/update-class/${classId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      navigate("/classes");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="px-8 py-4">
      <h1 className="text-center font-bold text-2xl">EDIT CLASS</h1>
      {isLoading ? (
        <div className="h-full mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2 space-y-4">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-32" />
        </div>
      ) : (
        <ClassForm
          onSubmit={onSubmit}
          className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
          defaultValues={classDetail}
        >
          <Button className="bg-t_tertiary-500 hover:bg-t_tertiary-600">
            Update Class
          </Button>
          <Link
            to="/classes"
            className={buttonVariants({ variant: "destructive" })}
          >
            Cancel
          </Link>
        </ClassForm>
      )}
    </section>
  );
};

export default EditClassPage;
