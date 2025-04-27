import ClassApi from "@/api/ClassApi";
import { IClass } from "@/interfaces/IClass";
import { useParams } from "react-router";

export default async function getClassroom({params}: {params: {classId: string}}) {
  try {
    const classroomDetail = await ClassApi.getClassroomDetail(params.classId) as {
      courseTitle: string;
      courseCode: string;
      classCode: string;
      tutor: string;
      studyRoom: string;
    };
    return {
      ...classroomDetail
    }
  }
  catch {
    throw new Error("Error fetching classroom detail");
  }
}