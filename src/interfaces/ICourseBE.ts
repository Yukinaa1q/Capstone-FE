import { CourseOutline } from "@/components/Input/CourseOutlineInput";

export default interface ICourseBE {
    courseCode: string;
    courseDescription: string;
    courseId: string;
    courseImage: string;
    courseLevel: string;
    courseOutline: CourseOutline[];
    duration: number;
    coursePrice: number;
    courseSubject: string;
    courseTitle: string;
    totalStudentNumber: number;
    totalClassNumber: number; 
}