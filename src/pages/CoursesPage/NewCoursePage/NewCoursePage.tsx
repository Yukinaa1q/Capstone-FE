import { Button } from "@/components/ui/button";
import CourseForm, { ICourseForm } from "./CourseForm";
import { useNavigate } from "react-router";
import TucourApi, { ENV } from "@/utils/http";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateCourseForm from "./CreateCourseForm";

const tucourApi = new TucourApi(ENV.DEV);

const NewCoursePage = () => {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: ICourseForm) => {
    // setIsLoading(true);
    console.log("creating courses...");
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
      formdata.append("courseOutline", JSON.stringify(data.courseOutline));
      formdata.append("courseImage", data.courseImage as Blob);
      console.log(formdata.get("courseImage"));

      await tucourApi.call({
        url: "course/create-course",
        method: "POST",
        body: formdata,
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      navigate("/courses");
    } catch (err) {
      console.log(err);
    }
    // setIsLoading(false);
  };

  return (
    <section className="relative px-8 py-4">
      {/* {isLoading && (
        <div className="absolute w-full h-full top-0 left-0 bg-gray-100 opacity-10">
          <LoaderCircle size={120} className="animate-spin stroke-t_primary-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"  />
        </div>
      )} */}
      <h1 className="text-center font-bold text-2xl">ADD NEW COURSE</h1>
      <CreateCourseForm
        className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
        onSubmit={onSubmit}
        // isLoading={isLoading}
        isEdit={false}
      />
        {/* <Button
          form="course-form"
          type="submit"
          className="bg-t_primary-400 hover:bg-t_primary-500"
          // onClick={() => {console.log("Butotn click")}}
        >
          Create Course
        </Button>
        <Button
          variant="destructive"
          className="ml-4"
          onClick={() => navigate("/courses")}
          // disabled={isLoading}
        >
          Cancel
        </Button>
      </CreateCourseForm> */}
    </section>
  );
};

export default NewCoursePage;
