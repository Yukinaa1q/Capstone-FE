import IGrade from "@/interfaces/IGrade";

export interface IScoreSheet {
  courseTitle: string;
  courseCode: string;
  courseId: string;
  grade: IGrade;
}