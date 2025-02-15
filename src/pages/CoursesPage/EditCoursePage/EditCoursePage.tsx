import ICourseBE from "@/interfaces/ICourseBE";
import CourseForm, { ICourseForm } from "../NewCoursePage/CourseForm";
import { useEffect, useState } from "react";
import TucourApi, { ENV } from "@/utils/http";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
          imgUrl: courseDetail.courseImage,
        };
        setEditCourse(convertDataType);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }

    fetchCourse();
  }, []);

  const onSubmit = async (data: ICourseForm) => {
    console.log("UPDATE DATA");
    console.log(data);
  };

  return (
    <section className="px-8 py-4">
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
