import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import TucourApi from "@/utils/http";
import CourseForm, { ICourseForm } from "../CourseForm";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const NewCoursePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: ICourseForm) => {
    console.log("Send data", data);
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("courseCode", data.courseCode);
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
      console.log(err);
    }
  };

  return (
    <section className="relative px-8 py-4">
      {isLoading && (
        <div className="absolute w-full h-full top-0 left-0 bg-gray-100/40">
          <LoaderCircle
            size={80}
            className="animate-spin stroke-t_primary-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}
      <h1 className="text-center font-bold text-2xl">ADD NEW COURSE</h1>
      <CourseForm onSubmit={onSubmit}>
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
  );
};

export default NewCoursePage;
