export default interface ICourseBE {
  courseCode: string;
  courseDescription: string;
  courseId: string;
  courseImage: string;
  courseLevel: string;
  courseOutline: File | string;
  duration: number;
  coursePrice: number;
  courseSubject: string;
  courseTitle: string;
  totalStudentNumber: number;
  totalClassNumber: number;
}
