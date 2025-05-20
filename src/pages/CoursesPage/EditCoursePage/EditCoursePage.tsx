import ICourseBE from "@/interfaces/ICourseBE";
import CourseForm, { ICourseForm } from "../CourseForm";
import { useEffect, useState } from "react";
import TucourApi from "@/utils/http";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const EditCoursePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [editCourse, setEditCourse] = useState<ICourseForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [courseId, setCourseId] = useState<string>("");

  useEffect(() => {
    async function fetchCourse() {
      setIsLoading(true);
      try {
        const courseDetail: ICourseBE = (await TucourApi.call(
          "/course/" + params.id,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          }
        )) as ICourseBE;

        const convertDataType: ICourseForm = {
          courseTitle: courseDetail.courseTitle,
          // courseCode: courseDetail.courseCode,
          courseSubject: courseDetail.courseSubject,
          courseLevel: courseDetail.courseLevel,
          coursePrice: courseDetail.coursePrice,
          duration: courseDetail.duration,
          courseDescription: JSON.parse(courseDetail.courseDescription),
          courseOutline: courseDetail.courseOutline,
          courseImage: new File([], "courseImage"),
          imgUrl: courseDetail.courseImage,
        };
        setEditCourse(convertDataType);
        setCourseId(courseDetail.courseId);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCourse();
  }, []);

  const onSubmit = async (data: ICourseForm) => {
    setIsSubmitting(true);
    console.log("Edit Data: ", data);
    try {
      const formdata = new FormData();
      // formdata.append("courseCode", data.courseCode);
      formdata.append("courseTitle", data.courseTitle);
      formdata.append("courseSubject", data.courseSubject);
      formdata.append("courseLevel", data.courseLevel);
      formdata.append("coursePrice", data.coursePrice.toString());
      formdata.append("duration", data.duration.toString());
      formdata.append(
        "courseDescription",
        JSON.stringify(data.courseDescription)
      );
      formdata.append("courseOutline", JSON.stringify(data.courseOutline));
      const imageFormData = new FormData();
      imageFormData.append("file", data.courseImage as Blob);

      const outlineFormData = new FormData();
      outlineFormData.append("file", data.courseOutline as Blob);

      const sendData = JSON.stringify({
        courseTitle: data.courseTitle,
        // courseCode: data.courseCode,
        courseSubject: data.courseSubject,
        courseLevel: data.courseLevel,
        coursePrice: data.coursePrice,
        duration: data.duration,
        courseDescription: JSON.stringify(data.courseDescription),
        courseOutline: data.courseOutline,
      });
      // Update textual data
      await TucourApi.call("course/update-course/" + courseId, {
        method: "POST",
        body: sendData,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });

      if (data.courseImage && data.courseImage.size > 0) {
        // Update image file only if the size is greater than 0
        await TucourApi.call("course/update-course-image/" + courseId, {
          method: "POST",
          body: imageFormData,
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        });
      }

      if (data.courseOutline && data.courseOutline.size > 0) {
        await TucourApi.call("course/update-course-outline/" + courseId, {
          method: "POST",
          body: outlineFormData,
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        });
      }
      setIsSubmitting(false);
      navigate("/courses");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {isSubmitting && (
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
        <h1 className="text-center font-bold text-2xl">EDIT COURSE</h1>
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
          <CourseForm initialData={editCourse} onSubmit={onSubmit}>
            <Button
              type="submit"
              className="bg-t_primary-400 hover:bg-t_primary-500"
            >
              Edit Course
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
        )}
      </section>
    </div>
  );
};

export default EditCoursePage;
