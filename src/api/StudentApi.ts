import TucourApi from "@/utils/http";

export default class StudentApi {
  public static async getStudents() {
    try {
      const students = await TucourApi.get("/student/all-student-table");
      return students;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getStudentDetail(studentId: string | undefined) {
    try {
      const studentDetail = await TucourApi.get(`/student/detail/${studentId}`);
      return studentDetail;
    }
    catch (err) {
      console.log(err);
    }
  }
}
