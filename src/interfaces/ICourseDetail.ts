import { CourseOutline } from "@/components/Input/CourseOutlineInput";
import { Descendant } from "slate";

export interface ICourseDetail {
  courseTitle: string;
  courseCode: string;
  learningDuration: number;
  courseDescription: Descendant[];
  courseOutline: CourseOutline[];
  coursePrice: number;
  participantNumber: number;
  courseId: string;
  imgUrl: string;
}

export interface IClassDetail {
  courseTitle: string;
  courseCode: string;
  registrationStartDate: string;
  registrationEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
  studyRoom: string; // New field
  tutor: string;
  tutorId: string;
  courseImage: string;
  courseDescription: Descendant[];
  courseOutline: CourseOutline[];
  coursePrice: number;
  classSession: string;
  classShift: string;
  learningType: boolean;
  classCode: string;
  classId: string;
  classStudents: number;
  classMaxStudents: number;
  studentList: StudentBrief[];
}

export interface StudentBrief {
  studentName: string;
  studentId: string;
  studentCode: string;
  avatarLink: string;
}
