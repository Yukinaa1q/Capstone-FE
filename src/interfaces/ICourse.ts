import { StudyShift, StudyWeek } from "./common";


interface ICourseCard {
  courseTitle: string;
  courseCode: string;
  coursePrice: number;
  courseImage: string;
  isRegistered: boolean;
}

interface ICourseCardP1 extends ICourseCard{
  registrationDate: string;
  totalRegistration: number;
}

interface ICourseCardP2 extends ICourseCard {
  tutor: string;
  currentStudents: number;
  maxStudents: number;
  studyWeek: StudyWeek;
  studyShift: StudyShift;
  isOnline: boolean;
}


export type { ICourseCardP1, ICourseCardP2, ICourseCard };