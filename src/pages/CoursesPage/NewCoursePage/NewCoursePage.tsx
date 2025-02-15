import { Button } from "@/components/ui/button";
import CourseForm, { ICourseForm } from "./CourseForm";
import { useNavigate } from "react-router";
import TucourApi, { ENV } from "@/utils/http";

const NewCoursePage = () => {
  const navigate = useNavigate();
  const tucourApi = new TucourApi(ENV.DEV);
  const onSubmit = async (data: ICourseForm) => {
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
  };

  
  return (
    <section className="px-8 py-4">
      <h1 className="text-center font-bold text-2xl">ADD NEW COURSE</h1>
      <CourseForm
        className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
        onSubmit={onSubmit}
      >
        <Button
          type="submit"
          className="bg-t_primary-400 hover:bg-t_primary-500"
        >
          Create Course
        </Button>
        <Button
          variant="destructive"
          type="submit"
          className="ml-4"
          onClick={() => navigate("/courses")}
        >
          Cancel
        </Button>
      </CourseForm>
    </section>
  );
};

export default NewCoursePage;
