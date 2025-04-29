import StudentApi from "@/api/StudentApi";
import { IClassDetail } from "@/interfaces/ICourseDetail";
import { StudentDetail } from "@/interfaces/UserProfile";
import { Params } from "react-router";

export default async function getStudentInit({
  params,
}: {
  params: Params<"id">;
}) {
  const res = {} as {
    studentDetail: StudentDetail;
    classHistory: Pick<
      IClassDetail,
      | "courseTitle"
      | "courseCode"
      | "classCode"
      | "classSession"
      | "classShift"
      | "studyRoom"
    >[];
  };
  try {
    const studentDetail = await StudentApi.getStudentDetail(params.id);
    const studentClassHistory = await StudentApi.getStudentClassHistory(
      params.id!
    );
    res.studentDetail = studentDetail;
    res.classHistory = studentClassHistory;
  } catch (err) {
    console.log(err);
  }
  return res;
}
