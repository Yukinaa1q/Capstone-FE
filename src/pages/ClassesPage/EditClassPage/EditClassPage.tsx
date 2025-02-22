import { Button, buttonVariants } from "@/components/ui/button";
import ClassForm, { IClassForm } from "../ClassForm";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import TucourApi, { ENV } from "@/utils/http";
import { Skeleton } from "@/components/ui/skeleton";

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
        const res = await new TucourApi(ENV.DEV).call({
          url: `/class/view-class-detail/${params.id}`,
          method: "GET",
          headers: {
            "Contet-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClassId(res.classId);
        setClassDetail({
          courseTitle: res.courseTitle,
          courseCode: res.courseCode,
          classCode: res.classCode,
          maxStudents: res.classStudents,
          isOnline: res.learningType,
          studentIdList: [],
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
    console.log(data);
    try {
      await new TucourApi(ENV.DEV).call({
        url: `/class/update-class/${classId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      navigate("/classes");
    }
    catch (err) {
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
