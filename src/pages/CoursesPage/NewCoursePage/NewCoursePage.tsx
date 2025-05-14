import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import TucourApi from "@/utils/http";
import CourseForm, { ICourseForm } from "../CourseForm";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const NewCoursePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: ICourseForm) => {
    console.log("Send data", data);
    setIsLoading(true);
    try {
      const formdata = new FormData();
      // formdata.append("courseCode", data.courseCode);
      formdata.append("courseTitle", data.courseTitle);
      formdata.append("courseSubject", data.courseSubject);
      formdata.append("courseLevel", data.courseLevel);
      formdata.append("coursePrice", data.coursePrice.toString());
      formdata.append(
        "courseDescription",
        JSON.stringify(data.courseDescription)
      );
      formdata.append("duration", data.duration.toString());
      formdata.append("courseOutline", JSON.stringify(data.courseOutline));
      formdata.append("courseImage", data.courseImage as Blob);

      await TucourApi.call("course/create-course", {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      setIsLoading(false);
      navigate("/courses");
    } catch (err) {
      toast.error((err as { message: string }).message, {
        style: {
          backgroundColor: "#d14960",
          color: "#fff"
        },
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div className="absolute h-full bg-gray-300/50 z-50 w-full">
          <LoaderCircle
            size={80}
            className="animate-spin stroke-t_primary-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}

      <section
        className="px-8 py-4 overflow-y-scroll"
        style={{ height: "calc(100vh - 3.35rem)" }}
      >
        <h1 className="text-center font-bold text-2xl">ADD NEW COURSE</h1>
        <CourseForm initialData={undefined} onSubmit={onSubmit}>
          <Button
            className="bg-t_primary-400 hover:bg-t_primary-500"
            type="submit"
            disabled={isLoading}
          >
            Create Course
          </Button>
          <Link
            to={"/courses"}
            className={buttonVariants({ variant: "destructive" })}
          >
            Cancel
          </Link>
        </CourseForm>
      </section>
    </div>
  );
};

export default NewCoursePage;
