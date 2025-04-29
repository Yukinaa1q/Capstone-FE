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

  public static async getStudentGradeList(classId: string): Promise<
    {
      studentName: string;
      studentId: string;
      studentCode: string;
      grade: IGrade;
    }[]
  > {
    try {
      const studentListGrade = (await TucourApi.get(
        "/grade/class/" + classId
      )) as {
        studentGrades: {
          name: string;
          id: string;
          studentCode: string;
          grades: {
            midtermScore: number;
            finalScore: number;
            homeworkScore: number;
            assignmentScore: number;
          }[];
        }[];
      };
      console.log(studentListGrade);
      const mapStudent = studentListGrade.studentGrades.map((studentGrade) => ({
        studentName: studentGrade.name,
        studentId: studentGrade.id,
        studentCode: studentGrade.studentCode,
        grade: {
          midterm: studentGrade.grades[0].midtermScore,
          final: studentGrade.grades[0].finalScore,
          homework: studentGrade.grades[0].homeworkScore,
          assignment: studentGrade.grades[0].assignmentScore,
        },
      }));
      console.log(mapStudent);
      return mapStudent;
    } catch {
      console.log("Error occur");
      return [];
    }
  }
}
