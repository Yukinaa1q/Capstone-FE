import { CourseOutline } from "@/components/CourseOutlineInput";

export default interface ICourseBE {
    courseCode: string;
    courseDescription: string;
    courseId: string;
    courseImage: string;
    courseLevel: string;
    courseOutline: CourseOutline[];
    coursePrice: number;
    courseSubject: string;
    courseTitle: string;
    participantNumber: number; 
}