import ICourseBE from "@/interfaces/ICourseBE";
import CourseForm, { ICourseForm } from "../NewCoursePage/CourseForm";
import { useEffect, useState } from "react";
import TucourApi, { ENV } from "@/utils/http";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const tucourApi = new TucourApi(ENV.DEV);

// const testInitValue: ICourseForm = {
//   courseTitle: "default title",
//   courseCode: "default code",
//   courseSubject: "chemistry",
//   courseLevel: "2",
//   coursePrice: 1200000,
//   courseDescription: [
//     { type: "p", children: [{ text: "this is a text file" }] },
//   ],
//   courseOutline: [],
// };

const EditCoursePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [editCourse, setEditCourse] = useState<ICourseForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(true);
  const [courseId, setCourseId] = useState<string>("");

  console.log("Is sending", isSending);

  useEffect(() => {
    async function fetchCourse() {
      setIsLoading(true);
      try {
        const courseDetail: ICourseBE = await tucourApi.call({
          url: "/course/" + params.id,
          method: "GET",
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        });

        console.log("courseDetail", courseDetail);
        const convertDataType: ICourseForm = {
          courseTitle: courseDetail.courseTitle,
          courseCode: courseDetail.courseCode,
          courseSubject: courseDetail.courseSubject,
          courseLevel: courseDetail.courseLevel,
          coursePrice: courseDetail.coursePrice,
          courseDescription: JSON.parse(courseDetail.courseDescription),
          courseOutline: courseDetail.courseOutline,
          courseImage: new File(
            [await fetch(courseDetail.courseImage).then((res) => res.blob())],
            "courseImage"
          ),
          imgUrl: courseDetail.courseImage,
        };
        setEditCourse(convertDataType);
        setCourseId(courseDetail.courseId);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }

    fetchCourse();
  }, []);

  const onSubmit = async (data: ICourseForm) => {
    
    console.log("Submit edit course");
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
      const imageFormData = new FormData();
      imageFormData.append("file", data.courseImage as Blob);
      
      const sendData = JSON.stringify({
        courseTitle: data.courseTitle,
        courseCode: data.courseCode,
        courseSubject: data.courseSubject,
        courseLevel: data.courseLevel,
        coursePrice: data.coursePrice,
        courseDescription: JSON.stringify(data.courseDescription),
        courseOutline: data.courseOutline,
      });
      console.log(sendData);
      // Update textual data
      await tucourApi.call({
        url: "course/update-course/" + courseId,
        method: "POST",
        body: sendData,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });

      // Update image file
      await tucourApi.call({
        url: "course/update-course-image/" + courseId,
        method: "POST",
        body: imageFormData,
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
    <section className="relative px-8 py-4">
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
        <CourseForm
          className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
          initialData={editCourse}
          onSubmit={onSubmit}
          isEdit={true}
        >
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
  );
};

export default EditCoursePage;
