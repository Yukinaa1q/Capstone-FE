import IGrade from "@/interfaces/IGrade";

export default interface StudentGrade {
  studentName: string;
  studentId: string;
  studentCode: string;
  classId: string;
  grade: IGrade;
}
