import IGrade from "@/interfaces/IGrade";
import StudentGrade from "@/pages/ClassroomPage/IStudentGrade";
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
    StudentGrade[]
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
      const mapStudent = studentListGrade.studentGrades.map((studentGrade) => ({
        studentName: studentGrade.name,
        studentId: studentGrade.id,
        studentCode: studentGrade.studentCode,
        classId: studentListGrade.studentGrades[0].id,
        grade: {
          midterm: studentGrade.grades[0].midtermScore,
          final: studentGrade.grades[0].finalScore,
          homework: studentGrade.grades[0].homeworkScore,
          assignment: studentGrade.grades[0].assignmentScore,
        },
      }));
      return mapStudent;
    } catch {
      console.log("Error occur");
      return [];
    }
  }

  public static async updateStudentGradesInClass(studentGradeList: StudentGrade[]) {
    try {
      const marshalJson = studentGradeList.map(student => ({
        classroomId: student.classId,
        studentId: student.studentId,
        assignmentScore: student.grade.assignment,
        midtermScore: student.grade.midterm,
        finalScore: student.grade.final,
        homeworkScore: student.grade.homework,
      }))

      console.log("The data to be updated is", marshalJson);

      await TucourApi.post("/grade/update", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(marshalJson),
      })
    }
    catch {
      console.log("Error");
    }
  }
}
