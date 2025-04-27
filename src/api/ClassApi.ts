import IGrade from "@/interfaces/IGrade";
import TucourApi from "@/utils/http";

export default class ClassApi {
  public static async deleteClass(classId: string) {
    try {
      await TucourApi.delete("/phase2_register/delete-class/" + classId);
      return true;
    } catch {
      return false;
    }
  }

  public static async getClassroomDetail(classId: string) {
    const res = await TucourApi.get("/class/view-class-detail/" + classId);
    console.log(res);
    return res;
  }

  public static async getStudentGradeList(classId: string): Promise<{
    studentName: string;
    studentId: string;
    studentCode: string;
    grade: IGrade;
  }[]> {
    return [
      {
        studentName: "Nguyen Van A",
        studentId: "2157982",
        studentCode: "2157982",
        grade: {
          midterm: 8,
          final: 9,
          homework: 7,
          assignment: 8,
        },
      },
      {
        studentName: "Nguyen Van B",
        studentId: "2157983",
        studentCode: "2157983",
        grade: {
          midterm: 6,
          final: 7,
          homework: 8,
          assignment: 9,
        },
      },
      {
        studentName: "Nguyen Van C",
        studentId: "2157984",
        studentCode: "2157984",
        grade: {
          midterm: 5,
          final: 6,
          homework: 7,
          assignment: 8,
        },
      },
    ];
  }
}
