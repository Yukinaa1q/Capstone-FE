import { IClassDetail } from "@/interfaces/ICourseDetail";
import { StudentDetail, UserBrief } from "@/interfaces/UserProfile";
import { IScoreSheet } from "@/pages/ScorePage/scoreInterface";
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
    try {
      const classHistory = (await TucourApi.get(
        "/student/view-student-class-history/" + studentId
      )) as Pick<
        IClassDetail,
        | "courseTitle"
        | "courseCode"
        | "classCode"
        | "classSession"
        | "classShift"
        | "studyRoom"
      >[];
      return classHistory;
    } catch {
      return [];
    }
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
    try {
      const studentList = (await TucourApi.get(
        `/grade/search?search=${encodeURIComponent(keyword)}`
      )) as UserBrief[];
      return studentList;
    } catch {
      return [];
    }
  }

  public static async payment() {
    try {
      await TucourApi.get("/student/class-payment");
    } catch {
      console.log("error when doing payment");
    }
  }

  public static async getStudentGradeList(
    studentId: string
  ): Promise<IScoreSheet[]> {
    try {
      const studentGradeList = (await TucourApi.get(
        "/grade/student/" + studentId
      )) as {
        classroom: {
          courseTitle: string;
          courseCode: string;
          courseId: string;
        };
        midtermScore: number;
        finalScore: number;
        homeworkScore: number;
        assignmentScore: number;
      }[];
      console.log(studentGradeList);
      const mapStudentGrades: IScoreSheet[] = studentGradeList!.map(
        (studentGrade) => ({
          courseTitle: studentGrade.classroom.courseTitle,
          courseCode: studentGrade.classroom.courseCode,
          courseId: studentGrade.classroom.courseId,
          grade: {
            midterm: studentGrade.midtermScore,
            final: studentGrade.finalScore,
            homework: studentGrade.homeworkScore,
            assignment: studentGrade.assignmentScore,
          },
        })
      );
      return mapStudentGrades;
    } catch {
      return [];
    }
  }
}
