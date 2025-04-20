import { IClassDetail } from "@/interfaces/ICourseDetail";
import { StudentDetail, UserBrief } from "@/interfaces/UserProfile";
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
        headers: {
          "Content-Type": "application/json",
        },
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
      },
    ];
  }

  public static async updateProfile(
    studentId: string,
    name: string,
    email: string,
    dob: Date,
    phone: string
  ): Promise<boolean> {
    const sendingData = {
      name: name,
      email: email,
      dob: dob,
      phoneNumber: phone,
    };
    try {
      await TucourApi.post("/student/update-student-profile/" + studentId, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendingData),
      });
      return true;
    } catch {
      return false;
    }
    alert("update profile " + sendingData);
  }

  public static async getStudentBriefList(
    keyword: string
  ): Promise<UserBrief[]> {
    return [
      {
        avatarUrl: "https://example.com/avatar1.jpg",
        name: "Nguyen Van A",
        userId: "2157982",
        userCode: "ST27891",
      },
      {
        avatarUrl: "https://example.com/avatar2.jpg",
        name: "Nguyen Van B",
        userId: "2157983",
        userCode: "ST57983",
      },
      {
        avatarUrl: "https://example.com/avatar3.jpg",
        name: "Nguyen Van C",
        userId: "2157984",
        userCode: "ST57984",
      },
    ];
  }

  public static async payment() {
    try {
      await TucourApi.get("/student/class-payment");
    }
    catch {
      console.log("error when doing payment");
    }
  }
}
