import { IClassDetail } from "@/interfaces/ICourseDetail";
import { StudentDetail } from "@/interfaces/UserProfile";
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

  public static async getStudentDetail(
    studentId: string | undefined
  ): Promise<StudentDetail> {
    const studentDetail = await TucourApi.get(`/student/detail/${studentId}`);
    return studentDetail as StudentDetail;
  }

  public static async registerClass(classId: string) {
    try {
      await TucourApi.post("/student/register-class", {
        body: JSON.stringify({
          classId: classId,
        }),
      });
    } catch {
      console.log("error");
    }
  }

  public static async getStudentClassHistory(
    studentId: string
  ): Promise<
    Pick<
      IClassDetail,
      | "courseTitle"
      | "courseCode"
      | "classCode"
      | "classSession"
      | "classShift"
      | "studyRoom"
    >[]
  > {
    return [
      {
        courseTitle: "Introduction to Computer Science",
        courseCode: "CS101",
        classCode: "CS101-01",
        classSession: "2023-2024",
        classShift: "Morning",
        studyRoom: "Room 101",
      },
      {
        courseTitle: "Data Structures and Algorithms",
        courseCode: "CS102",
        classCode: "CS102-01",
        classSession: "2023-2024",
        classShift: "Afternoon",
        studyRoom: "Room 102",
      }
    ]
  }

  public static async updateProfile(
    name: string,
    email: string,
    dob: Date,
    phone: string,
  ) {
    const sendingData = {
      name: name,
      email: email,
      DOB: dob,
      phone: phone,
    }
    alert("update profile " + sendingData);
  }
}
