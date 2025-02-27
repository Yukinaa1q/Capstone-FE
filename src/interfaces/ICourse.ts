import { StudyShift, StudyWeek } from "./common";
import IRegisteredCard from "./IRegisteredCard";


interface ICourseCard {
  courseTitle: string;
  courseCode: string;
  courseId: string;
  coursePrice: number;
  courseImage: string;
}

interface ICourseCardP1 extends ICourseCard, IRegisteredCard{
  registrationDate: string;
  totalRegistration: number;
}

interface ICourseCardP2 extends ICourseCard, IRegisteredCard {
  tutor: string;
  currentStudents: number;
  maxStudents: number;
  studyWeek: StudyWeek;
  studyShift: StudyShift;
  isOnline: boolean;
}



export type { ICourseCardP1, ICourseCardP2, ICourseCard };