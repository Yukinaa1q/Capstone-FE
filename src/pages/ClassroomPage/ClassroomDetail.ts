import ClassApi from "@/api/ClassApi";
import { Params } from "react-router";

export default async function getClassroom({params}: {params: Params<"classId">}) {
  try {
    // Fetch class details
    const classroomDetail = await ClassApi.getClassroomDetail(params.classId!) as {
      courseTitle: string;
      courseCode: string;
      classCode: string;
      classId: string;
      tutor: string;
      studyRoom: string;
    };
    // Fetch list of grade by students in the class
    const studentListGrade = await ClassApi.getStudentGradeList(params.classId!)
    return {
      classroomDetail,
      studentListGrade,
    }
  }
  catch {
    throw new Error("Error fetching classroom detail");
  }
}